import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export function useSettingsModal() {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const settingsModalAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langSearch, setLangSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('ქართული');
  const [selectedSpeaker, setSelectedSpeaker] = useState('მოსაუბრის გამოყოფა');
  const [selectedStt, setSelectedStt] = useState('STT1');
  const [selectedMic, setSelectedMic] = useState('მიკროფონი');
  const [usePunctuation, setUsePunctuation] = useState(true);
  const settingsBackup = useRef({
    lang: 'ქართული',
    speaker: 'მოსაუბრის გამოყოფა',
    stt: 'STT1',
    mic: 'მიკროფონი',
    punct: true,
  });

  const settingsOverlayOpacity = settingsModalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const settingsSheetY = settingsModalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const openSettingsModal = () => {
    settingsBackup.current = {
      lang: selectedLang,
      speaker: selectedSpeaker,
      stt: selectedStt,
      mic: selectedMic,
      punct: usePunctuation,
    };
    setSettingsModalVisible(true);
    setActiveDropdown(null);
    setLangSearch('');
    settingsModalAnim.setValue(0);
    Animated.timing(settingsModalAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeSettingsModal = () => {
    Animated.timing(settingsModalAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSettingsModalVisible(false);
      setActiveDropdown(null);
      setLangSearch('');
    });
  };

  const cancelSettings = () => {
    const b = settingsBackup.current;
    setSelectedLang(b.lang);
    setSelectedSpeaker(b.speaker);
    setSelectedStt(b.stt);
    setSelectedMic(b.mic);
    setUsePunctuation(b.punct);
    closeSettingsModal();
  };

  const saveSettings = () => {
    closeSettingsModal();
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => (prev === name ? null : name));
    if (name !== 'lang') {
      setLangSearch('');
    }
  };

  return {
    settingsModalVisible,
    settingsOverlayOpacity,
    settingsSheetY,
    activeDropdown,
    setActiveDropdown,
    langSearch,
    setLangSearch,
    selectedLang,
    setSelectedLang,
    selectedSpeaker,
    setSelectedSpeaker,
    selectedStt,
    setSelectedStt,
    selectedMic,
    setSelectedMic,
    usePunctuation,
    setUsePunctuation,
    openSettingsModal,
    cancelSettings,
    saveSettings,
    toggleDropdown,
  };
}
