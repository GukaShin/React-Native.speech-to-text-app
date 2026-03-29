import React from 'react';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HISTORY_GROUPS, TRANSCRIPT_TEXT} from '../constants/data';
import {useHistoryPanel} from '../hooks/useHistoryPanel';
import {useRecording} from '../hooks/useRecording';
import {SettingsProvider, useSettings} from '../context/SettingsContext';
import {ActionsRow} from '../components/ActionsRow';
import {BottomBar} from '../components/BottomBar';
import {Header} from '../components/Header';
import {HistoryPanel} from '../components/HistoryPanel';
import {SettingsModal} from '../components/SettingsModal';
import {TranscriptView} from '../components/TranscriptView';
import {styles} from './SpeechToTextScreen.styles';

function SpeechToTextContent() {
  const recording = useRecording();
  const history = useHistoryPanel();
  const {openModal} = useSettings();

  const handleNewFilePress = () => {
    recording.resetRecording();
  };

  const showTranscript = recording.hasRecordedOnce || recording.isRecording;

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'left', 'right', 'bottom']}>
      <Header onHistoryPress={history.openHistory} />

      <ActionsRow
        onNewFilePress={handleNewFilePress}
        onSettingsPress={openModal}
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

      <SettingsModal />

      <HistoryPanel
        visible={history.historyVisible}
        translateX={history.historyAnim}
        onClose={history.closeHistory}
        groups={HISTORY_GROUPS}
      />
    </SafeAreaView>
  );
}

export function SpeechToTextScreen() {
  return (
    <SettingsProvider>
      <SpeechToTextContent />
    </SettingsProvider>
  );
}
