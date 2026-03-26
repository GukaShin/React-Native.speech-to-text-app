import React, { useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
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
        <Pressable style={styles.primaryAction}>
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

      <View style={styles.content}>
        <View style={styles.listenRow}>
          <Image
            source={require('../../IMG/microphone.png')}
            style={styles.listenIcon}
            resizeMode="contain"
          />
          <Text style={styles.listenText}>დაიწყე ჩაწერა...</Text>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.bottomBarInner}>
          <Pressable style={styles.bottomItem}>
            <Image
              source={require('../../IMG/FilePlus.png')}
              style={styles.bottomIconMuted}
              resizeMode="contain"
            />
            <Text style={styles.bottomLabelMuted}>აუდიო ფაილი</Text>
          </Pressable>

          <Pressable style={styles.bottomItem}>
            <View style={styles.bottomMicButton}>
              <Image
              source={require('../../IMG/microphone-new.png')}
                style={styles.bottomMicIcon}
                resizeMode="contain"
              />
            </View>
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
  bottomBar: {
    paddingTop: 12,
    paddingBottom: 7,
    marginBottom: 45,
    marginHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 0,
  },
  bottomBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 7,
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
    marginBottom: 12,
  },
  bottomLabelMuted: {
    marginTop: 4,
    marginBottom: 7,
    fontSize: 12,
    color: '#8E8E93',
  },
});
