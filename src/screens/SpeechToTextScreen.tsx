import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * UI-only shell for speech-to-text. Wire styles and layout to your Figma file.
 * Transcript and "listening" state are static placeholders for now.
 */
export function SpeechToTextScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Speech to text</Text>
        <Text style={styles.subtitle}>UI preview — no recording yet</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.transcriptCard}>
          <Text style={styles.label}>Transcript</Text>
          <TextInput
            style={styles.transcriptInput}
            value="Your transcribed words will appear here after you hook up speech recognition."
            editable={false}
            multiline
            placeholder="Transcript"
            placeholderTextColor="#8E8E93"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.micButton,
            pressed && styles.micButtonPressed,
          ]}>
          <Text style={styles.micButtonLabel}>●</Text>
        </Pressable>
        <Text style={styles.hint}>Record button is visual only</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#636366',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  transcriptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636366',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  transcriptInput: {
    minHeight: 200,
    fontSize: 17,
    lineHeight: 24,
    color: '#1C1C1E',
    textAlignVertical: 'top',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C6C6C8',
  },
  micButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonPressed: {
    opacity: 0.85,
  },
  micButtonLabel: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  hint: {
    marginTop: 12,
    fontSize: 13,
    color: '#8E8E93',
  },
});
