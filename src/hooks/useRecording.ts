import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecordedOnce, setHasRecordedOnce] = useState(false);
  const [isMiniPlaying, setIsMiniPlaying] = useState(false);
  const recordAnim = useRef(new Animated.Value(0)).current;

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

  const handleRecordPress = () => {
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

  const resetRecording = () => {
    setIsRecording(false);
    setHasRecordedOnce(false);
    setIsMiniPlaying(false);
    recordAnim.stopAnimation();
    recordAnim.setValue(0);
  };

  const toggleMiniPlaying = () => setIsMiniPlaying(prev => !prev);

  return {
    isRecording,
    hasRecordedOnce,
    isMiniPlaying,
    recordButtonBg,
    micOpacity,
    stopSquareOpacity,
    recordButtonScale,
    handleRecordPress,
    resetRecording,
    toggleMiniPlaying,
  };
}
