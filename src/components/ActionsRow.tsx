import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './ActionsRow.styles';

interface ActionsRowProps {
  onNewFilePress: () => void;
  onSettingsPress: () => void;
}

export function ActionsRow({ onNewFilePress, onSettingsPress }: ActionsRowProps) {
  return (
    <View style={styles.actionsRow}>
      <Pressable style={styles.primaryAction} onPress={onNewFilePress}>
        <Image
          source={require('../../IMG/Plus.png')}
          style={styles.primaryActionIcon}
          resizeMode="contain"
        />
        <Text style={styles.primaryActionText}>ახლის გახსნა</Text>
      </Pressable>
      <Pressable style={styles.secondaryAction} onPress={onSettingsPress}>
        <Image
          source={require('../../IMG/Gear.png')}
          style={styles.secondaryActionIcon}
          resizeMode="contain"
        />
        <Text style={styles.secondaryActionText}>პარამეტრები</Text>
      </Pressable>
    </View>
  );
}
