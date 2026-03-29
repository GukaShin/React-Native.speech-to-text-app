import React from 'react';
import { Animated, Image, Pressable, ScrollView, Text, View } from 'react-native';
import type { HistoryGroup } from '../constants/data';
import { HistoryCard } from './HistoryCard';
import { styles } from './HistoryPanel.styles';

interface HistoryPanelProps {
  visible: boolean;
  translateX: Animated.Value;
  onClose: () => void;
  groups: HistoryGroup[];
}

export function HistoryPanel({
  visible,
  translateX,
  onClose,
  groups,
}: HistoryPanelProps) {
  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.historyOverlay,
        {transform: [{translateX}]},
      ]}>
      <View style={styles.historyHeader}>
        <Pressable onPress={onClose} style={styles.historyBackBtn}>
          <Image
            source={require('../../IMG/Vector-return.png')}
            style={styles.historyBackIcon}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.historyAvatar}>
          <Text style={styles.historyAvatarLetter}>A</Text>
        </View>

        <View style={styles.historyProfileInfo}>
          <Text style={styles.historyEmail} numberOfLines={1}>
            achi.teruashvili777@gmail.com
          </Text>
          <View style={styles.historyBadge}>
            <Image
              source={require('../../IMG/star.png')}
              style={styles.historyBadgeStar}
              resizeMode="contain"
            />
            <Text style={styles.historyBadgeText}>პრემიუმი</Text>
          </View>
        </View>

        <View style={styles.historyHeaderSpacer} />

        <Pressable style={styles.historyLangBtn}>
          <Image
            source={require('../../IMG/flag.png')}
            style={styles.historyFlagIcon}
            resizeMode="contain"
          />
          <Image
            source={require('../../IMG/Vector-flag.png')}
            style={styles.historyFlagVectorIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <ScrollView
        style={styles.historyScroll}
        contentContainerStyle={styles.historyScrollContent}
        showsVerticalScrollIndicator={false}>
        {groups.map((group, gIdx) => (
          <View key={gIdx} style={styles.historyGroup}>
            <Text style={styles.historyDateLabel}>{group.date}</Text>
            {group.items.map(item => (
              <HistoryCard key={item.id} text={item.text} />
            ))}
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
