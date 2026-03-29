import { useRef, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export function useHistoryPanel() {
  const [historyVisible, setHistoryVisible] = useState(false);
  const historyAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const openHistory = () => {
    setHistoryVisible(true);
    historyAnim.setValue(SCREEN_WIDTH);
    Animated.timing(historyAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeHistory = () => {
    Animated.timing(historyAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setHistoryVisible(false));
  };

  return { historyVisible, historyAnim, openHistory, closeHistory };
}
