import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './DropdownSelect.styles';

interface DropdownSelectProps {
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  zIndex: number;
}

export function DropdownSelect({
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  zIndex,
}: DropdownSelectProps) {
  return (
    <View style={[styles.dropdownWrap, {zIndex}]}>
      <Pressable
        style={[styles.settingsRow, isOpen && styles.settingsRowActive]}
        onPress={onToggle}>
        <Text style={styles.settingsRowText}>{value}</Text>
        <View
          style={[styles.chevronArrow, isOpen && styles.chevronArrowOpen]}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.dropdownPanelFlat}>
          {options.map((opt, idx) => (
            <Pressable
              key={opt}
              style={[
                styles.dropdownOptionFlat,
                idx === options.length - 1 && styles.dropdownOptionFlatLast,
              ]}
              onPress={() => onSelect(opt)}>
              <Text style={styles.dropdownOptionFlatText}>{opt}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
