import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './HistoryCard.styles';

interface HistoryCardProps {
  text: string;
}

export function HistoryCard({ text }: HistoryCardProps) {
  return (
    <View style={styles.historyCard}>
      <Image
        source={require('../../IMG/edit.png')}
        style={styles.historyEditIcon}
        resizeMode="contain"
      />
      <Text style={styles.historyCardText} numberOfLines={2}>
        {text}
      </Text>
      <Pressable style={styles.historyDeleteBtn}>
        <View style={styles.trashIconWrap}>
          <View style={styles.trashLid} />
          <View style={styles.trashHandle} />
          <View style={styles.trashBody}>
            <View style={styles.trashLine} />
            <View style={styles.trashLine} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
