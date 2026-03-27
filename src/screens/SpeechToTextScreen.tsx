import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const transcriptText =
    'ტექნოლოგიები ყოველდღიურად იცვლება და ჩვენც მათთან ერთად ვვითარდებით. ზოგჯერ ერთი პატარა იდეაც კი შეიძლება გადაიქცეს დიდ პროექტად, თუ მას სწორად განავითარებ. მნიშვნელოვანია, რომ არ შეგეშინდეს შეცდომების, რადგან სწორედ ისინი გვასწავლიან ყველაზე მეტს. დღეს ბევრად მარტივია ახალი უნარების სწავლა, განსაკუთრებით მაშინ, როცა ინტერნეტი უსაზღვრო რესურსებს გვთავაზობს. მთავარია მოტივაცია და მუდმივი პრაქტიკა — ეს არის წარმატების მთავარი ფორმულა.ნსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტექნოლოგიები ყოველდღიურად იცვლება და ჩვენც მათთან ერთად ვვითარდებით. ზოგჯერ ერთი პატარა იდეაც კი შეიძლება გადაიქცესია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძლია ჩაწეროს საუბარი და რამდენიმე წამში მიიღოს წასაკითხი ტექსტი.ტრანსკრიფციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფ';

  const handleSettingsPress = () => {
    settingsSlideX.setValue(18);
    Animated.spring(settingsSlideX, {
      toValue: 0,
      mass: 1,
      stiffness: 711.1,
      damping: 40,
      useNativeDriver: true,
    }).start();
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
        <Pressable style={styles.secondaryAction}>
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
          <View style={[styles.miniPlayerWrap, { bottom: bottomInnerHeight + 16 }]}>
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
          <Pressable style={styles.bottomItem}>
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

          <Pressable style={styles.bottomItem}>
            <Image
              source={require('../../IMG/logos_youtube-icon.png')}
              style={styles.youtubeBadge}
              resizeMode="contain"
            />
            <Text style={[styles.bottomLabel, styles.youtubeLabel]}>YouTube Link</Text>
          </Pressable>
        </View>
      </View>
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
    paddingTop: 12,
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
    paddingTop: 8,
    paddingBottom: 0,
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
  },
  bottomItem: {
    alignItems: 'center',
  },
  bottomIconMuted: {
    width: 40,
    height: 40,
    marginTop: 6,
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
    width: 40,
    height: 28,
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
    marginTop: 4,
    marginBottom: 0,
    fontSize: 12,
    color: '#8E8E93',
  },
});
