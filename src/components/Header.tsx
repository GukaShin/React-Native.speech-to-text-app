import React, { useRef } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { styles } from './Header.styles';

interface HeaderProps {
  onHistoryPress: () => void;
}

export function Header({ onHistoryPress }: HeaderProps) {
  const settingsSlideX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>ხმა</Text>
          <View style={styles.titleArrowsIcon}>
            <View style={styles.arrowRowRight}>
              <View style={styles.arrowLine} />
              <View style={styles.arrowHeadRight} />
            </View>
            <View style={styles.arrowRowLeft}>
              <View style={styles.arrowHeadLeft} />
              <View style={styles.arrowLine} />
            </View>
          </View>
          <Text style={styles.title}>ტექსტი</Text>
        </View>

        <Animated.View
          style={[
            styles.settingsIconWrap,
            {transform: [{translateX: settingsSlideX}]},
          ]}>
          <Pressable
            onPress={onHistoryPress}
            style={({pressed}) => [
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
  );
}
