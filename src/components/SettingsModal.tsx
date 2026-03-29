import React from 'react';
import {Animated, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useCustomScrollbar} from '../hooks/useCustomScrollbar';
import {useSettings} from '../context/SettingsContext';
import {
  LANGUAGE_OPTIONS,
  MIC_OPTIONS,
  SPEAKER_OPTIONS,
  STT_OPTIONS,
} from '../constants/data';
import {DropdownSelect} from './DropdownSelect';
import {styles} from './SettingsModal.styles';

export function SettingsModal() {
  const {
    modalVisible,
    overlayOpacity,
    sheetTranslateY,
    activeDropdown,
    langSearch,
    setLangSearch,
    language,
    changeLanguage,
    speaker,
    changeSpeaker,
    stt,
    changeStt,
    mic,
    changeMic,
    punctuation,
    setPunctuation,
    cancelModal,
    saveModal,
    toggleDropdown,
    closeDropdown,
  } = useSettings();

  const langScrollbar = useCustomScrollbar({barHeight: 22, trackPadding: 8});

  const handleToggleDropdown = (name: string) => {
    toggleDropdown(name);
    langScrollbar.resetScroll();
  };

  const speakerOptions = SPEAKER_OPTIONS.filter(o => o !== speaker);
  const sttOptions = STT_OPTIONS.filter(o => o !== stt);
  const micOptions = MIC_OPTIONS.filter(o => o !== mic);

  const filteredLanguages = LANGUAGE_OPTIONS.filter(l =>
    l.toLowerCase().includes(langSearch.toLowerCase()),
  );

  if (!modalVisible) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[styles.settingsOverlay, {opacity: overlayOpacity}]}
        pointerEvents="auto">
        <Pressable style={styles.settingsOverlayPress} onPress={cancelModal} />
      </Animated.View>

      <Animated.View
        style={[
          styles.settingsSheet,
          {transform: [{translateY: sheetTranslateY}]},
        ]}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={activeDropdown !== 'lang'}
          nestedScrollEnabled>
          <View
            style={[
              styles.langRowWrap,
              {zIndex: activeDropdown === 'lang' ? 10 : 4},
            ]}>
            <Pressable
              style={[
                styles.settingsRow,
                activeDropdown === 'lang' && styles.settingsRowActiveLang,
              ]}
              onPress={() => handleToggleDropdown('lang')}>
              <Text style={styles.settingsRowText}>{language}</Text>
              <View
                style={[
                  styles.chevronArrow,
                  activeDropdown === 'lang' && styles.chevronArrowOpen,
                ]}
              />
            </Pressable>
          </View>

          <DropdownSelect
            value={speaker}
            options={speakerOptions}
            isOpen={activeDropdown === 'speaker'}
            onToggle={() => handleToggleDropdown('speaker')}
            onSelect={opt => {
              changeSpeaker(opt);
              closeDropdown();
            }}
            zIndex={activeDropdown === 'speaker' ? 10 : 3}
          />

          <DropdownSelect
            value={stt}
            options={sttOptions}
            isOpen={activeDropdown === 'stt'}
            onToggle={() => handleToggleDropdown('stt')}
            onSelect={opt => {
              changeStt(opt);
              closeDropdown();
            }}
            zIndex={activeDropdown === 'stt' ? 10 : 2}
          />

          <DropdownSelect
            value={mic}
            options={micOptions}
            isOpen={activeDropdown === 'mic'}
            onToggle={() => handleToggleDropdown('mic')}
            onSelect={opt => {
              changeMic(opt);
              closeDropdown();
            }}
            zIndex={activeDropdown === 'mic' ? 10 : 1}
          />

          <View style={styles.radioRow}>
            <Pressable
              style={styles.radioOption}
              onPress={() => setPunctuation(true)}>
              <View
                style={[
                  styles.radioCircle,
                  punctuation && styles.radioCircleSelected,
                ]}>
                {punctuation && <View style={styles.checkmark} />}
              </View>
              <Text style={styles.radioLabel}>პუნქტუაცია</Text>
            </Pressable>
            <Pressable
              style={styles.radioOption}
              onPress={() => setPunctuation(false)}>
              <View
                style={[
                  styles.radioCircle,
                  !punctuation && styles.radioCircleSelected,
                ]}>
                {!punctuation && <View style={styles.checkmark} />}
              </View>
              <Text style={styles.radioLabel}>ავტოკორექტი</Text>
            </Pressable>
          </View>

          <View style={styles.settingsButtons}>
            <Pressable style={styles.cancelBtn} onPress={cancelModal}>
              <Text style={styles.cancelBtnText}>გაუქმება</Text>
            </Pressable>
            <Pressable style={styles.saveBtn} onPress={saveModal}>
              <Text style={styles.saveBtnText}>დამახსოვრება</Text>
            </Pressable>
          </View>
        </ScrollView>

        {activeDropdown === 'lang' && (
          <View style={styles.langPanelFloat}>
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
                onLayout={langScrollbar.onLayout}
                onContentSizeChange={langScrollbar.onContentSizeChange}
                onScroll={langScrollbar.onScroll}
                scrollEventThrottle={16}>
                {filteredLanguages.map(lang => (
                  <Pressable
                    key={lang}
                    style={styles.langOption}
                    onPress={() => {
                      changeLanguage(lang);
                      closeDropdown();
                    }}>
                    <Text
                      style={[
                        styles.langOptionText,
                        language === lang && styles.langOptionTextSelected,
                      ]}>
                      {lang}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <View style={styles.langScrollTrack}>
                <View
                  style={[
                    styles.langScrollThumb,
                    {transform: [{translateY: langScrollbar.barTop}]},
                  ]}
                />
              </View>
            </View>
          </View>
        )}
      </Animated.View>
    </>
  );
}
