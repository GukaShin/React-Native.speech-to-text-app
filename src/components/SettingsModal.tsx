import React from 'react';
import { Animated, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useCustomScrollbar } from '../hooks/useCustomScrollbar';
import {
  LANGUAGE_OPTIONS,
  MIC_OPTIONS,
  SPEAKER_OPTIONS,
  STT_OPTIONS,
} from '../constants/data';
import { DropdownSelect } from './DropdownSelect';
import { styles } from './SettingsModal.styles';

interface SettingsModalProps {
  settingsModalVisible: boolean;
  settingsOverlayOpacity: Animated.AnimatedInterpolation<string | number>;
  settingsSheetY: Animated.AnimatedInterpolation<string | number>;
  activeDropdown: string | null;
  langSearch: string;
  setLangSearch: (text: string) => void;
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  selectedSpeaker: string;
  setSelectedSpeaker: (speaker: string) => void;
  selectedStt: string;
  setSelectedStt: (stt: string) => void;
  selectedMic: string;
  setSelectedMic: (mic: string) => void;
  usePunctuation: boolean;
  setUsePunctuation: (value: boolean) => void;
  setActiveDropdown: (value: string | null) => void;
  cancelSettings: () => void;
  saveSettings: () => void;
  toggleDropdown: (name: string) => void;
}

export function SettingsModal({
  settingsModalVisible,
  settingsOverlayOpacity,
  settingsSheetY,
  activeDropdown,
  langSearch,
  setLangSearch,
  selectedLang,
  setSelectedLang,
  selectedSpeaker,
  setSelectedSpeaker,
  selectedStt,
  setSelectedStt,
  selectedMic,
  setSelectedMic,
  usePunctuation,
  setUsePunctuation,
  setActiveDropdown,
  cancelSettings,
  saveSettings,
  toggleDropdown,
}: SettingsModalProps) {
  const langScrollbar = useCustomScrollbar({ barHeight: 22, trackPadding: 8 });

  const handleToggleDropdown = (name: string) => {
    toggleDropdown(name);
    langScrollbar.resetScroll();
  };

  const speakerOptions = SPEAKER_OPTIONS.filter(o => o !== selectedSpeaker);
  const sttOptions = STT_OPTIONS.filter(o => o !== selectedStt);
  const micOptions = MIC_OPTIONS.filter(o => o !== selectedMic);

  const filteredLanguages = LANGUAGE_OPTIONS.filter(l =>
    l.toLowerCase().includes(langSearch.toLowerCase()),
  );

  if (!settingsModalVisible) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[styles.settingsOverlay, {opacity: settingsOverlayOpacity}]}
        pointerEvents="auto">
        <Pressable style={styles.settingsOverlayPress} onPress={cancelSettings} />
      </Animated.View>

      <Animated.View
        style={[
          styles.settingsSheet,
          {transform: [{translateY: settingsSheetY}]},
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
              <Text style={styles.settingsRowText}>{selectedLang}</Text>
              <View
                style={[
                  styles.chevronArrow,
                  activeDropdown === 'lang' && styles.chevronArrowOpen,
                ]}
              />
            </Pressable>
          </View>

          <DropdownSelect
            value={selectedSpeaker}
            options={speakerOptions}
            isOpen={activeDropdown === 'speaker'}
            onToggle={() => handleToggleDropdown('speaker')}
            onSelect={opt => {
              setSelectedSpeaker(opt);
              setActiveDropdown(null);
            }}
            zIndex={activeDropdown === 'speaker' ? 10 : 3}
          />

          <DropdownSelect
            value={selectedStt}
            options={sttOptions}
            isOpen={activeDropdown === 'stt'}
            onToggle={() => handleToggleDropdown('stt')}
            onSelect={opt => {
              setSelectedStt(opt);
              setActiveDropdown(null);
            }}
            zIndex={activeDropdown === 'stt' ? 10 : 2}
          />

          <DropdownSelect
            value={selectedMic}
            options={micOptions}
            isOpen={activeDropdown === 'mic'}
            onToggle={() => handleToggleDropdown('mic')}
            onSelect={opt => {
              setSelectedMic(opt);
              setActiveDropdown(null);
            }}
            zIndex={activeDropdown === 'mic' ? 10 : 1}
          />

          <View style={styles.radioRow}>
            <Pressable
              style={styles.radioOption}
              onPress={() => setUsePunctuation(true)}>
              <View
                style={[
                  styles.radioCircle,
                  usePunctuation && styles.radioCircleSelected,
                ]}>
                {usePunctuation && <View style={styles.checkmark} />}
              </View>
              <Text style={styles.radioLabel}>პუნქტუაცია</Text>
            </Pressable>
            <Pressable
              style={styles.radioOption}
              onPress={() => setUsePunctuation(false)}>
              <View
                style={[
                  styles.radioCircle,
                  !usePunctuation && styles.radioCircleSelected,
                ]}>
                {!usePunctuation && <View style={styles.checkmark} />}
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
                      setSelectedLang(lang);
                      setActiveDropdown(null);
                    }}>
                    <Text
                      style={[
                        styles.langOptionText,
                        selectedLang === lang && styles.langOptionTextSelected,
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
