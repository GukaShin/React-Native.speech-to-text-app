import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * UI-only shell for speech-to-text. Wire styles and layout to your Figma file.
 * Transcript and "listening" state are static placeholders for now.
 */
export function SpeechToTextScreen() {
  const settingsSlideX = useRef(new Animated.Value(0)).current;
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecordedOnce, setHasRecordedOnce] = useState(false);
  const [isMiniPlaying, setIsMiniPlaying] = useState(false);
  const transcriptScrollRef = useRef<ScrollView | null>(null);
  const recordAnim = useRef(new Animated.Value(0)).current;
  const [transcriptViewportHeight, setTranscriptViewportHeight] = useState(1);
  const [transcriptContentHeight, setTranscriptContentHeight] = useState(1);
  const [transcriptBarTop, setTranscriptBarTop] = useState(0);
  const [bottomInnerHeight, setBottomInnerHeight] = useState(0);
  const [historyVisible, setHistoryVisible] = useState(false);
  const historyAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const settingsModalAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langSearch, setLangSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('ქართული');
  const [selectedSpeaker, setSelectedSpeaker] = useState('მოსაუბრის გამოყოფა');
  const [selectedStt, setSelectedStt] = useState('STT1');
  const [selectedMic, setSelectedMic] = useState('მიკროფონი');
  const [usePunctuation, setUsePunctuation] = useState(true);
  const settingsBackup = useRef({lang: 'ქართული', speaker: 'მოსაუბრის გამოყოფა', stt: 'STT1', mic: 'მიკროფონი', punct: true});
  const [langListViewH, setLangListViewH] = useState(1);
  const [langListContentH, setLangListContentH] = useState(1);
  const [langBarTop, setLangBarTop] = useState(0);

  const historyGroups = [
    {
      date: 'დღეს',
      items: [
        {id: '1', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
        {id: '2', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
      ],
    },
    {
      date: 'გუშინ',
      items: [
        {id: '3', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
        {id: '4', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
      ],
    },
    {
      date: '11 მარტი',
      items: [
        {id: '5', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
        {id: '6', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
      ],
    },
    {
      date: 'დღეს',
      items: [
        {id: '7', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
        {id: '8', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
      ],
    },
    {
      date: 'გუშინ',
      items: [
        {id: '9', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
        {id: '10', text: 'ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.'},
      ],
    },
  ];

  const transcriptText =
    'ტექნოლოგიები ყოველდღიურად იცვლება და ჩვენც მათთან ერთად ვვითარდებით. ზოგჯერ ერთი პატარა იდეაც კი შეიძლება გადაიქცეს დიდ პროექტად, თუ მას სწორად განავითარებ. მნიშვნელოვანია, რომ არ შეგეშინდეს შეცდომების, რადგან სწორედ ისინი გვასწავლიან ყველაზე მეტს. დღეს ბევრად მარტივია ახალი უნარების სწავლა, განსაკუთრებით მაშინ, როცა ინტერნეტი უსაზღვრო რესურსებს გვთავაზობს. მთავარია მოტივაცია და მუდმივი პრაქტიკა — ეს არის წარმატების მთავარი ფორმულა.ნსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტექნოლოგიები ყოველდღიურად იცვლება და ჩვენც მათთან ერთად ვვითარდებით. ზოგჯერ ერთი პატარა იდეაც კი შეიძლება გადაიქცესია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფ';

  const handleSettingsPress = () => {
    setHistoryVisible(true);
    historyAnim.setValue(SCREEN_WIDTH);
    Animated.timing(historyAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const handleHistoryClose = () => {
    Animated.timing(historyAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setHistoryVisible(false));
  };

  const languageOptions = ['ფრანგული', 'იაპონური', 'ქართული', 'ინგლისური', 'არაბული', 'მონღოლური', 'გერმანული', 'ჩეჩნური', 'ესპანური'];
  const allSpeakerOptions = ['მოსაუბრის გამოყოფა', 'მოსაუბრის არ გამოყოფა'];
  const allSttOptions = ['STT1', 'STT2', 'STT3'];
  const allMicOptions = ['მიკროფონი', 'სისტემის ხმა'];

  const speakerOptions = allSpeakerOptions.filter(o => o !== selectedSpeaker);
  const sttOptions = allSttOptions.filter(o => o !== selectedStt);
  const micOptions = allMicOptions.filter(o => o !== selectedMic);

  const filteredLanguages = languageOptions.filter(l =>
    l.toLowerCase().includes(langSearch.toLowerCase()),
  );

  const settingsOverlayOpacity = settingsModalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const settingsSheetY = settingsModalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const openSettingsModal = () => {
    settingsBackup.current = {
      lang: selectedLang, speaker: selectedSpeaker, stt: selectedStt,
      mic: selectedMic, punct: usePunctuation,
    };
    setSettingsModalVisible(true);
    setActiveDropdown(null);
    setLangSearch('');
    settingsModalAnim.setValue(0);
    Animated.timing(settingsModalAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeSettingsModal = () => {
    Animated.timing(settingsModalAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSettingsModalVisible(false);
      setActiveDropdown(null);
      setLangSearch('');
    });
  };

  const cancelSettings = () => {
    const b = settingsBackup.current;
    setSelectedLang(b.lang);
    setSelectedSpeaker(b.speaker);
    setSelectedStt(b.stt);
    setSelectedMic(b.mic);
    setUsePunctuation(b.punct);
    closeSettingsModal();
  };

  const saveSettings = () => {
    closeSettingsModal();
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
    if (name !== 'lang') {
      setLangSearch('');
    }
    setLangBarTop(0);
  };

  const handleLangListScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y ?? 0;
    const maxScroll = Math.max(langListContentH - langListViewH, 0);
    const barH = 22;
    const trackH = Math.max(langListViewH - 8, 0);
    const maxTravel = Math.max(trackH - barH, 0);
    setLangBarTop(maxScroll > 0 ? (y / maxScroll) * maxTravel : 0);
  };

  const handleNewFilePress = () => {
    setIsRecording(false);
    setHasRecordedOnce(false);
    setIsMiniPlaying(false);
    recordAnim.stopAnimation();
    recordAnim.setValue(0);
    setTranscriptBarTop(0);
    transcriptScrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const handleRecordPress = () => {
    // After one complete record cycle, ignore further presses.
    if (!isRecording && hasRecordedOnce) {
      return;
    }

    const next = !isRecording;
    setIsRecording(next);
    if (!next) {
      setHasRecordedOnce(true);
    }
    Animated.timing(recordAnim, {
      toValue: next ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const recordButtonBg = recordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#42A5F5', '#F65959'],
  });

  const micOpacity = recordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const stopSquareOpacity = recordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const recordButtonScale = recordAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.965, 1],
  });

  const handleTranscriptScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y ?? 0;
    const maxScroll = Math.max(transcriptContentHeight - transcriptViewportHeight, 0);
    const maxBarTravel = Math.max(transcriptViewportHeight - 25, 0);
    const nextTop = maxScroll > 0 ? (y / maxScroll) * maxBarTravel : 0;
    setTranscriptBarTop(nextTop);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>ხმა</Text>
            <Image
              source={require('../../IMG/arrows.png')}
              style={styles.titleArrowsIcon}
              resizeMode="contain"
            />
            <Text style={styles.title}>ტექსტი</Text>
          </View>

          <Animated.View style={[styles.settingsIconWrap, { transform: [{ translateX: settingsSlideX }] }]}>
            <Pressable
              onPress={handleSettingsPress}
              style={({ pressed }) => [
                styles.settingsButton,
                pressed && styles.settingsButtonPressed,
              ]}>
              <Image
                source={require('../../IMG/Vector.png')}
                style={styles.settingsIconImage}
                resizeMode="contain"
              />
            </Pressable>
          </Animated.View>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.primaryAction} onPress={handleNewFilePress}>
          <Image
            source={require('../../IMG/Plus.png')}
            style={styles.primaryActionIcon}
            resizeMode="contain"
          />
          <Text style={styles.primaryActionText}>ახლის გახსნა</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction} onPress={openSettingsModal}>
          <Image
            source={require('../../IMG/Gear.png')}
            style={styles.secondaryActionIcon}
            resizeMode="contain"
          />
          <Text style={styles.secondaryActionText}>პარამეტრები</Text>
        </Pressable>
      </View>

      <View style={[styles.content, (hasRecordedOnce || isRecording) && styles.contentTranscript]}>
        {hasRecordedOnce || isRecording ? (
          <View style={styles.transcriptWrap}>
            <ScrollView
              ref={transcriptScrollRef}
              style={styles.transcriptScroll}
              contentContainerStyle={styles.transcriptContent}
              onLayout={event => setTranscriptViewportHeight(event.nativeEvent.layout.height)}
              onContentSizeChange={(_, height) => setTranscriptContentHeight(height)}
              onScroll={handleTranscriptScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              bounces={false}
              alwaysBounceVertical={false}
              overScrollMode="never">
              <Text style={styles.transcriptText}>{transcriptText}</Text>
            </ScrollView>
            <View style={[styles.transcriptScrollBar, { transform: [{ translateY: transcriptBarTop }] }]} />
          </View>
        ) : (
          <View style={styles.listenRow}>
            <Image
              source={require('../../IMG/microphone.png')}
              style={styles.listenIcon}
              resizeMode="contain"
            />
            <Text style={styles.listenText}>დაიწყე ჩაწერა...</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomBar}>
        {hasRecordedOnce && !isRecording ? (
          <View style={[styles.miniPlayerWrap, { bottom: bottomInnerHeight }]}>
            <View style={styles.miniPlayerTopRow}>
              <View style={styles.miniPlayerLeftCol}>
                <Pressable
                  style={styles.miniControlButton}
                  onPress={() => setIsMiniPlaying(prev => !prev)}>
                  {isMiniPlaying ? (
                    <View style={styles.pauseIconWrap}>
                      <View style={styles.pauseBar} />
                      <View style={styles.pauseBar} />
                    </View>
                  ) : (
                    <View style={styles.playIcon} />
                  )}
                </Pressable>
              </View>

              <View style={styles.miniProgressCol}>
                <View style={styles.miniProgressTrack}>
                  <View style={styles.miniProgressLine} />
                  <View style={styles.miniProgressDot} />
                </View>
                <Text style={styles.miniTimeLabel}>00:00</Text>
              </View>
            </View>
          </View>
        ) : null}

        <View
          style={styles.bottomBarInner}
          onLayout={event => setBottomInnerHeight(event.nativeEvent.layout.height)}>
          <Pressable style={[styles.bottomItem, {marginBottom: 5}]}>
            <Image
              source={require('../../IMG/FilePlus.png')}
              style={styles.bottomIconMuted}
              resizeMode="contain"
            />
            <Text style={styles.bottomLabelMuted}>აუდიო ფაილი</Text>
          </Pressable>

          <Pressable style={styles.bottomItem} onPress={handleRecordPress}>
            <Animated.View
              style={[
                styles.bottomMicButton,
                { backgroundColor: recordButtonBg, transform: [{ scale: recordButtonScale }] },
              ]}>
              <Animated.Image
                source={require('../../IMG/microphone-new.png')}
                style={[styles.bottomMicIcon, { opacity: micOpacity }]}
                resizeMode="contain"
              />
              <Animated.View style={[styles.recordStopSquare, { opacity: stopSquareOpacity }]} />
            </Animated.View>
            <Text style={styles.bottomLabel}>ჩაწერა</Text>
          </Pressable>

          <Pressable style={[styles.bottomItem, {marginBottom: 5}]}>
            <Image
              source={require('../../IMG/logos_youtube-icon.png')}
              style={styles.youtubeBadge}
              resizeMode="contain"
            />
            <Text style={[styles.bottomLabel, styles.youtubeLabel]}>YouTube Link</Text>
          </Pressable>
        </View>
      </View>

      {settingsModalVisible && (
        <>
          <Animated.View
            style={[styles.settingsOverlay, {opacity: settingsOverlayOpacity}]}
            pointerEvents="auto">
            <Pressable style={styles.settingsOverlayPress} onPress={cancelSettings} />
          </Animated.View>
          <Animated.View
            style={[styles.settingsSheet, {transform: [{translateY: settingsSheetY}]}]}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} scrollEnabled={activeDropdown !== 'lang'} nestedScrollEnabled>
              <View style={[styles.dropdownWrap, {zIndex: activeDropdown === 'lang' ? 10 : 4}]}>
                <Pressable style={[styles.settingsRow, activeDropdown === 'lang' && styles.settingsRowActiveLang]} onPress={() => toggleDropdown('lang')}>
                  <Text style={styles.settingsRowText}>{selectedLang}</Text>
                  <View style={[styles.chevronArrow, activeDropdown === 'lang' && styles.chevronArrowOpen]} />
                </Pressable>
                {activeDropdown === 'lang' && (
                  <View style={[styles.dropdownPanelOverlay, {top: 54}]}>
                    <View style={styles.searchBarWrap}>
                      <View style={styles.searchIconWrap}>
                        <View style={styles.searchIconCircle} />
                        <View style={styles.searchIconHandle} />
                      </View>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="ძიება"
                        placeholderTextColor="#43434396"
                        value={langSearch}
                        onChangeText={setLangSearch}
                      />
                    </View>
                    <View style={styles.langListWrap}>
                      <ScrollView
                        style={styles.langList}
                        nestedScrollEnabled
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        overScrollMode="always"
                        onLayout={e => setLangListViewH(e.nativeEvent.layout.height)}
                        onContentSizeChange={(_, h) => setLangListContentH(h)}
                        onScroll={handleLangListScroll}
                        scrollEventThrottle={16}>
                        {filteredLanguages.map(lang => (
                          <Pressable
                            key={lang}
                            style={styles.langOption}
                            onPress={() => { setSelectedLang(lang); setActiveDropdown(null); }}>
                            <Text style={[styles.langOptionText, selectedLang === lang && styles.langOptionTextSelected]}>
                              {lang}
                            </Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                      <View style={styles.langScrollTrack}>
                        <View style={[styles.langScrollThumb, {transform: [{translateY: langBarTop}]}]} />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              <View style={[styles.dropdownWrap, {zIndex: activeDropdown === 'speaker' ? 10 : 3}]}>
                <Pressable style={[styles.settingsRow, activeDropdown === 'speaker' && styles.settingsRowActive]} onPress={() => toggleDropdown('speaker')}>
                  <Text style={styles.settingsRowText}>{selectedSpeaker}</Text>
                  <View style={[styles.chevronArrow, activeDropdown === 'speaker' && styles.chevronArrowOpen]} />
                </Pressable>
                {activeDropdown === 'speaker' && (
                  <View style={styles.dropdownPanelFlat}>
                    {speakerOptions.map((opt, idx) => (
                      <Pressable
                        key={opt}
                        style={[styles.dropdownOptionFlat, idx === speakerOptions.length - 1 && styles.dropdownOptionFlatLast]}
                        onPress={() => { setSelectedSpeaker(opt); setActiveDropdown(null); }}>
                        <Text style={styles.dropdownOptionFlatText}>{opt}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              <View style={[styles.dropdownWrap, {zIndex: activeDropdown === 'stt' ? 10 : 2}]}>
                <Pressable style={[styles.settingsRow, activeDropdown === 'stt' && styles.settingsRowActive]} onPress={() => toggleDropdown('stt')}>
                  <Text style={styles.settingsRowText}>{selectedStt}</Text>
                  <View style={[styles.chevronArrow, activeDropdown === 'stt' && styles.chevronArrowOpen]} />
                </Pressable>
                {activeDropdown === 'stt' && (
                  <View style={styles.dropdownPanelFlat}>
                    {sttOptions.map((opt, idx) => (
                      <Pressable
                        key={opt}
                        style={[styles.dropdownOptionFlat, idx === sttOptions.length - 1 && styles.dropdownOptionFlatLast]}
                        onPress={() => { setSelectedStt(opt); setActiveDropdown(null); }}>
                        <Text style={styles.dropdownOptionFlatText}>{opt}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              <View style={[styles.dropdownWrap, {zIndex: activeDropdown === 'mic' ? 10 : 1}]}>
                <Pressable style={[styles.settingsRow, activeDropdown === 'mic' && styles.settingsRowActive]} onPress={() => toggleDropdown('mic')}>
                  <Text style={styles.settingsRowText}>{selectedMic}</Text>
                  <View style={[styles.chevronArrow, activeDropdown === 'mic' && styles.chevronArrowOpen]} />
                </Pressable>
                {activeDropdown === 'mic' && (
                  <View style={styles.dropdownPanelFlat}>
                    {micOptions.map((opt, idx) => (
                      <Pressable
                        key={opt}
                        style={[styles.dropdownOptionFlat, idx === micOptions.length - 1 && styles.dropdownOptionFlatLast]}
                        onPress={() => { setSelectedMic(opt); setActiveDropdown(null); }}>
                        <Text style={styles.dropdownOptionFlatText}>{opt}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.radioRow}>
                <Pressable style={styles.radioOption} onPress={() => setUsePunctuation(true)}>
                  <View style={[styles.radioCircle, usePunctuation && styles.radioCircleSelected]}>
                    {usePunctuation && <Text style={styles.radioCheck}>{'✓'}</Text>}
                  </View>
                  <Text style={styles.radioLabel}>პუნქტუაცია</Text>
                </Pressable>
                <Pressable style={styles.radioOption} onPress={() => setUsePunctuation(false)}>
                  <View style={[styles.radioCircle, !usePunctuation && styles.radioCircleSelected]}>
                    {!usePunctuation && <Text style={styles.radioCheck}>{'✓'}</Text>}
                  </View>
                  <Text style={styles.radioLabel}>ავტოკორექტი</Text>
                </Pressable>
              </View>

              <View style={styles.settingsButtons}>
                <Pressable style={styles.cancelBtn} onPress={cancelSettings}>
                  <Text style={styles.cancelBtnText}>გაუქმება</Text>
                </Pressable>
                <Pressable style={styles.saveBtn} onPress={saveSettings}>
                  <Text style={styles.saveBtnText}>დამახსოვრება</Text>
                </Pressable>
              </View>
            </ScrollView>
          </Animated.View>
        </>
      )}

      {historyVisible && (
        <Animated.View
          style={[
            styles.historyOverlay,
            {transform: [{translateX: historyAnim}]},
          ]}>
          <View style={styles.historyHeader}>
            <Pressable onPress={handleHistoryClose} style={styles.historyBackBtn}>
              <Image
                source={require('../../IMG/Vector-return.png')}
                style={styles.historyBackIcon}
                resizeMode="contain"
              />
            </Pressable>

            <View style={styles.historyAvatar}>
              <Text style={styles.historyAvatarLetter}>A</Text>
            </View>

            <View style={styles.historyProfileInfo}>
              <Text style={styles.historyEmail} numberOfLines={1}>
                achi.teruashvili777@gmail.com
              </Text>
              <View style={styles.historyBadge}>
                <Image
                  source={require('../../IMG/star.png')}
                  style={styles.historyBadgeStar}
                  resizeMode="contain"
                />
                <Text style={styles.historyBadgeText}>პრემიუმი</Text>
              </View>
            </View>

            <View style={styles.historyHeaderSpacer} />

            <Pressable style={styles.historyLangBtn}>
              <Image
                source={require('../../IMG/flag.png')}
                style={styles.historyFlagIcon}
                resizeMode="contain"
              />
              <Image
                source={require('../../IMG/Vector-flag.png')}
                style={styles.historyFlagVectorIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <ScrollView
            style={styles.historyScroll}
            contentContainerStyle={styles.historyScrollContent}
            showsVerticalScrollIndicator={false}>
            {historyGroups.map((group, gIdx) => (
              <View key={gIdx} style={styles.historyGroup}>
                <Text style={styles.historyDateLabel}>{group.date}</Text>
                {group.items.map(item => (
                  <View key={item.id} style={styles.historyCard}>
                    <Image
                      source={require('../../IMG/edit.png')}
                      style={styles.historyEditIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.historyCardText} numberOfLines={2}>
                      {item.text}
                    </Text>
                    <Pressable style={styles.historyDeleteBtn}>
                      <Image
                        source={require('../../IMG/Trash.png')}
                        style={styles.historyTrashIcon}
                        resizeMode="contain"
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  settingsIconWrap: {
    width: 36,
    height: 36,
    opacity: 1,
    transform: [{ rotate: '-180deg' }],
    zIndex: 20,
  },
  settingsButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIconImage: {
    width: 30,
    height: 30,
    tintColor: '#000000',
  },
  settingsButtonPressed: {
    opacity: 0.8,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1.25,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleArrowsIcon: {
    width: 20,
    height: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 10,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F95F2',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 28,
    justifyContent: 'center',
    gap: 6,
  },
  primaryActionIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B72B4',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 28,
    justifyContent: 'center',
    gap: 6,
  },
  secondaryActionIcon: {
    width: 17,
    height: 17,
    tintColor: '#23557D',
  },
  secondaryActionText: {
    color: '#1B72B4',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 27,
  },
  contentTranscript: {
    paddingTop: 9,
  },
  listenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  listenIcon: {
    width: 22,
    height: 22,
  },
  listenText: {
    fontSize: 18,
    color: '#1F1F23',
    fontWeight: '400',
  },
  transcriptText: {
    marginLeft: 0,
    marginRight: 20,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: '#1F1F23',
  },
  transcriptWrap: {
    position: 'relative',
    width: '100%',
    flex: 1,
  },
  transcriptScroll: {
    flex: 1,
  },
  transcriptContent: {
    paddingBottom: 8,
  },
  transcriptScrollBar: {
    position: 'absolute',
    top: 0,
    right: 15,
    width: 7,
    height: 25,
    borderRadius: 4,
    backgroundColor: '#2FA2FE',
  },
  bottomBar: {
    height: 129,
    paddingTop: 10,
    paddingBottom: 7,
    marginBottom: 20,
    marginHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 0,
    position: 'relative',
  },
  miniPlayerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingLeft: 7,
    paddingRight: 5,
    paddingTop: 10,
  },
  miniPlayerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniPlayerLeftCol: {
    alignItems: 'center',
  },
  miniControlButton: {
    width: 32.25,
    height: 32.225,
    borderRadius: 16.125,
    backgroundColor: '#2FA2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24.63,
  },
  pauseIconWrap: {
    flexDirection: 'row',
    gap: 3,
  },
  pauseBar: {
    width: 2,
    height: 12,
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FFFFFF',
    marginLeft: 2,
  },
  miniTimeLabel: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '400',
    color: '#000000',
  },
  miniProgressCol: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10.37,
    marginRight: 16,
    marginTop: 0,
  },
  miniProgressTrack: {
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  miniProgressDot: {
    position: 'absolute',
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2FA2FE',
    top: -4.5,
  },
  miniProgressLine: {
    width: '100%',
    height: 5,
    backgroundColor: '#D9D9D9',
  },
  bottomBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 8,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
  },
  bottomItem: {
    alignItems: 'center',
  },
  bottomIconMuted: {
    width: 50,
    height: 50,
    marginTop: 0,
  },
  bottomMicButton: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#42A5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomMicIcon: {
    width: 30,
    height: 30,
  },
  recordStopSquare: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  youtubeBadge: {
    width: 50,
    height: 35,
  },
  bottomLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#6A6A6F',
  },
  youtubeLabel: {
    marginBottom: 0,
  },
  bottomLabelMuted: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: 12,
    color: '#8E8E93',
  },
  settingsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 50,
  },
  settingsOverlayPress: {
    flex: 1,
  },
  settingsSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    zIndex: 60,
    maxHeight: '80%',
  },
  dropdownWrap: {
    position: 'relative',
    marginBottom: 10,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#434343',
    borderRadius: 8,
  },
  settingsRowActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#2FA2FE',
    position: 'relative',
    zIndex: 2,
  },
  settingsRowText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
  },
  chevronArrow: {
    width: 10,
    height: 10,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#434343',
    transform: [{rotate: '45deg'}],
    marginBottom: 4,
  },
  chevronArrowOpen: {
    borderColor: '#2FA2FE',
    transform: [{rotate: '-135deg'}],
    marginBottom: -2,
    marginTop: 4,
  },
  dropdownPanelOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2FA2FE',
    borderRadius: 8,
    paddingTop: 0,
    paddingBottom: 10,
    paddingHorizontal: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownPanelFlat: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#434343',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownOptionFlat: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#434343',
  },
  dropdownOptionFlatLast: {
    borderBottomWidth: 0,
  },
  dropdownOptionFlatText: {
    fontSize: 14,
    color: '#333333',
  },
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#43434352',
    borderRadius: 8,
    marginTop: 9,
    marginHorizontal: 4,
    paddingLeft: 10,
  },
  searchIconWrap: {
    width: 14,
    height: 14,
    marginRight: 6,
    position: 'relative',
  },
  searchIconCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#434343',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchIconHandle: {
    width: 5,
    height: 0,
    borderTopWidth: 1.5,
    borderTopColor: '#434343',
    position: 'absolute',
    bottom: 1.5,
    right: 0,
    transform: [{rotate: '45deg'}],
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '400',
    color: '#333333',
  },
  langListWrap: {
    position: 'relative',
    maxHeight: 200,
  },
  langList: {
    maxHeight: 200,
    paddingRight: 14,
  },
  langScrollTrack: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    right: 4,
    width: 5,
    backgroundColor: '#CFCFCF',
    borderRadius: 2.5,
  },
  langScrollThumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 5,
    height: 22,
    borderRadius: 2.5,
    backgroundColor: '#2FA2FE',
  },
  langOption: {
    paddingVertical: 4,
    paddingLeft: 11,
  },
  langOptionText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '400',
  },
  langOptionTextSelected: {
    color: '#2FA2FE',
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: '#2FA2FE',
    borderColor: '#2FA2FE',
  },
  radioCheck: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: -1,
  },
  radioLabel: {
    fontSize: 13,
    color: '#333333',
  },
  settingsButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingBottom: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#2FA2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2FA2FE',
  },
  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2FA2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 100,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 60,
    paddingBottom: 14,
  },
  historyBackBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 11,
    marginRight: 21,
  },
  historyBackIcon: {
    width: 24,
    height: 17,
  },
  historyAvatar: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: '#EBEB80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  historyAvatarLetter: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  historyProfileInfo: {
    flexShrink: 1,
  },
  historyEmail: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
  historyBadge: {
    backgroundColor: '#3AD2A7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
    overflow: 'visible',
  },
  historyBadgeStar: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 9,
    height: 9,
    transform: [{rotate: '-15deg'}],
  },
  historyBadgeText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  historyHeaderSpacer: {
    flex: 1,
  },
  historyLangBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyFlagIcon: {
    width: 23,
    height: 23,
  },
  historyFlagVectorIcon: {
    width: 8.12,
    height: 4.06,
    marginLeft: 5,
    marginRight: 11,
  },
  historyScroll: {
    flex: 1,
  },
  historyScrollContent: {
    paddingHorizontal: 0,
    paddingTop: 4,
    paddingBottom: 30,
  },
  historyGroup: {
    marginBottom: 4,
  },
  historyDateLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#9E9E9E',
    marginBottom: 8,
    marginTop: 10,
    marginHorizontal: 16,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2FA2FE',
    height: 57,
    paddingLeft: 12,
    paddingRight: 14,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  historyEditIcon: {
    width: 24,
    height: 24,
    marginRight: 11,
  },
  historyCardText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 14,
    color: '#1F1F23',
  },
  historyDeleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 11,
  },
  historyTrashIcon: {
    width: 23,
    height: 23,
  },
});
