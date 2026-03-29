import { useState } from 'react';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface UseCustomScrollbarOptions {
  barHeight?: number;
  trackPadding?: number;
}

export function useCustomScrollbar(options: UseCustomScrollbarOptions = {}) {
  const { barHeight = 25, trackPadding = 0 } = options;
  const [viewportHeight, setViewportHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);
  const [barTop, setBarTop] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setViewportHeight(event.nativeEvent.layout.height);
  };

  const onContentSizeChange = (_width: number, height: number) => {
    setContentHeight(height);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y ?? 0;
    const maxScroll = Math.max(contentHeight - viewportHeight, 0);
    const trackH = Math.max(viewportHeight - trackPadding, 0);
    const maxTravel = Math.max(trackH - barHeight, 0);
    setBarTop(maxScroll > 0 ? (y / maxScroll) * maxTravel : 0);
  };

  const resetScroll = () => {
    setBarTop(0);
  };

  return { barTop, onLayout, onContentSizeChange, onScroll, resetScroll };
}
