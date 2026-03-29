import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useCustomScrollbar } from '../hooks/useCustomScrollbar';
import { styles } from './TranscriptView.styles';

interface TranscriptViewProps {
  text: string;
}

export function TranscriptView({ text }: TranscriptViewProps) {
  const scrollbar = useCustomScrollbar({ barHeight: 25, trackPadding: 0 });

  return (
    <View style={styles.transcriptWrap}>
      <ScrollView
        style={styles.transcriptScroll}
        contentContainerStyle={styles.transcriptContent}
        onLayout={scrollbar.onLayout}
        onContentSizeChange={scrollbar.onContentSizeChange}
        onScroll={scrollbar.onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never">
        <Text style={styles.transcriptText}>{text}</Text>
      </ScrollView>
      <View style={styles.transcriptScrollTrack}>
        <View
          style={[
            styles.transcriptScrollBar,
            {transform: [{translateY: scrollbar.barTop}]},
          ]}
        />
      </View>
    </View>
  );
}
