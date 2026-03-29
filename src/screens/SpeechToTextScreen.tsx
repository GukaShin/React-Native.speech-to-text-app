import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HISTORY_GROUPS, TRANSCRIPT_TEXT } from '../constants/data';
import { useHistoryPanel } from '../hooks/useHistoryPanel';
import { useRecording } from '../hooks/useRecording';
import { useSettingsModal } from '../hooks/useSettingsModal';
import { ActionsRow } from '../components/ActionsRow';
import { BottomBar } from '../components/BottomBar';
import { Header } from '../components/Header';
import { HistoryPanel } from '../components/HistoryPanel';
import { SettingsModal } from '../components/SettingsModal';
import { TranscriptView } from '../components/TranscriptView';
import { styles } from './SpeechToTextScreen.styles';

export function SpeechToTextScreen() {
  const recording = useRecording();
  const history = useHistoryPanel();
  const settings = useSettingsModal();

  const handleNewFilePress = () => {
    recording.resetRecording();
  };

  const showTranscript = recording.hasRecordedOnce || recording.isRecording;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <Header onHistoryPress={history.openHistory} />

      <ActionsRow
        onNewFilePress={handleNewFilePress}
        onSettingsPress={settings.openSettingsModal}
      />

      <View
        style={[styles.content, showTranscript && styles.contentTranscript]}>
        {showTranscript ? (
          <TranscriptView text={TRANSCRIPT_TEXT} />
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

      <BottomBar
        isRecording={recording.isRecording}
        hasRecordedOnce={recording.hasRecordedOnce}
        isMiniPlaying={recording.isMiniPlaying}
        onToggleMiniPlay={recording.toggleMiniPlaying}
        onRecordPress={recording.handleRecordPress}
        recordButtonBg={recording.recordButtonBg}
        micOpacity={recording.micOpacity}
        stopSquareOpacity={recording.stopSquareOpacity}
        recordButtonScale={recording.recordButtonScale}
      />

      <SettingsModal
        settingsModalVisible={settings.settingsModalVisible}
        settingsOverlayOpacity={settings.settingsOverlayOpacity}
        settingsSheetY={settings.settingsSheetY}
        activeDropdown={settings.activeDropdown}
        setActiveDropdown={settings.setActiveDropdown}
        langSearch={settings.langSearch}
        setLangSearch={settings.setLangSearch}
        selectedLang={settings.selectedLang}
        setSelectedLang={settings.setSelectedLang}
        selectedSpeaker={settings.selectedSpeaker}
        setSelectedSpeaker={settings.setSelectedSpeaker}
        selectedStt={settings.selectedStt}
        setSelectedStt={settings.setSelectedStt}
        selectedMic={settings.selectedMic}
        setSelectedMic={settings.setSelectedMic}
        usePunctuation={settings.usePunctuation}
        setUsePunctuation={settings.setUsePunctuation}
        cancelSettings={settings.cancelSettings}
        saveSettings={settings.saveSettings}
        toggleDropdown={settings.toggleDropdown}
      />

      <HistoryPanel
        visible={history.historyVisible}
        translateX={history.historyAnim}
        onClose={history.closeHistory}
        groups={HISTORY_GROUPS}
      />
    </SafeAreaView>
  );
}
