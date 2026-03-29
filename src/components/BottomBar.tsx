import React, { useState } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { styles } from './BottomBar.styles';

interface BottomBarProps {
  isRecording: boolean;
  hasRecordedOnce: boolean;
  isMiniPlaying: boolean;
  onToggleMiniPlay: () => void;
  onRecordPress: () => void;
  recordButtonBg: Animated.AnimatedInterpolation<string | number>;
  micOpacity: Animated.AnimatedInterpolation<string | number>;
  stopSquareOpacity: Animated.AnimatedInterpolation<string | number>;
  recordButtonScale: Animated.AnimatedInterpolation<string | number>;
}

export function BottomBar({
  isRecording,
  hasRecordedOnce,
  isMiniPlaying,
  onToggleMiniPlay,
  onRecordPress,
  recordButtonBg,
  micOpacity,
  stopSquareOpacity,
  recordButtonScale,
}: BottomBarProps) {
  const [bottomInnerHeight, setBottomInnerHeight] = useState(0);

  return (
    <View style={styles.bottomBar}>
      {hasRecordedOnce && !isRecording ? (
        <View style={[styles.miniPlayerWrap, {bottom: bottomInnerHeight}]}>
          <View style={styles.miniPlayerTopRow}>
            <View style={styles.miniPlayerLeftCol}>
              <Pressable
                style={styles.miniControlButton}
                onPress={onToggleMiniPlay}>
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
        onLayout={event =>
          setBottomInnerHeight(event.nativeEvent.layout.height)
        }>
        <Pressable style={[styles.bottomItem, {marginBottom: 5}]}>
          <Image
            source={require('../../IMG/FilePlus.png')}
            style={styles.bottomIconMuted}
            resizeMode="contain"
          />
          <Text style={styles.bottomLabelMuted}>აუდიო ფაილი</Text>
        </Pressable>

        <Pressable style={styles.bottomItem} onPress={onRecordPress}>
          <Animated.View
            style={[
              styles.bottomMicButton,
              {
                backgroundColor: recordButtonBg,
                transform: [{scale: recordButtonScale}],
              },
            ]}>
            <Animated.Image
              source={require('../../IMG/microphone-new.png')}
              style={[styles.bottomMicIcon, {opacity: micOpacity}]}
              resizeMode="contain"
            />
            <Animated.View
              style={[styles.recordStopSquare, {opacity: stopSquareOpacity}]}
            />
          </Animated.View>
          <Text style={styles.bottomLabel}>ჩაწერა</Text>
        </Pressable>

        <Pressable style={[styles.bottomItem, {marginBottom: 5}]}>
          <Image
            source={require('../../IMG/logos_youtube-icon.png')}
            style={styles.youtubeBadge}
            resizeMode="contain"
          />
          <Text style={[styles.bottomLabel, styles.youtubeLabel]}>
            YouTube Link
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
