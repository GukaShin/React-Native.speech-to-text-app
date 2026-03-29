import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Animated, Easing} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@app_settings';

interface SettingsValues {
  language: string;
  speaker: string;
  stt: string;
  mic: string;
  punctuation: boolean;
}

const DEFAULTS: SettingsValues = {
  language: 'ქართული',
  speaker: 'მოსაუბრის გამოყოფა',
  stt: 'STT1',
  mic: 'მიკროფონი',
  punctuation: true,
};

interface SettingsContextValue {
  language: string;
  speaker: string;
  stt: string;
  mic: string;
  punctuation: boolean;
  isLoaded: boolean;

  changeLanguage: (lang: string) => void;
  changeSpeaker: (speaker: string) => void;
  changeStt: (stt: string) => void;
  changeMic: (mic: string) => void;
  setPunctuation: (value: boolean) => void;

  modalVisible: boolean;
  overlayOpacity: Animated.AnimatedInterpolation<string | number>;
  sheetTranslateY: Animated.AnimatedInterpolation<string | number>;
  activeDropdown: string | null;
  langSearch: string;

  openModal: () => void;
  cancelModal: () => void;
  saveModal: () => void;
  toggleDropdown: (name: string) => void;
  closeDropdown: () => void;
  setLangSearch: (text: string) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}

export function SettingsProvider({children}: {children: React.ReactNode}) {
  const [language, setLanguage] = useState(DEFAULTS.language);
  const [speaker, setSpeaker] = useState(DEFAULTS.speaker);
  const [stt, setStt] = useState(DEFAULTS.stt);
  const [mic, setMic] = useState(DEFAULTS.mic);
  const [punctuation, setPunctuationRaw] = useState(DEFAULTS.punctuation);
  const [isLoaded, setIsLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const modalAnim = useRef(new Animated.Value(0)).current;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langSearch, setLangSearch] = useState('');

  const backup = useRef<SettingsValues>({...DEFAULTS});

  const overlayOpacity = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const sheetTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: Partial<SettingsValues> = JSON.parse(stored);
          if (parsed.language !== undefined) {
            setLanguage(parsed.language);
          }
          if (parsed.speaker !== undefined) {
            setSpeaker(parsed.speaker);
          }
          if (parsed.stt !== undefined) {
            setStt(parsed.stt);
          }
          if (parsed.mic !== undefined) {
            setMic(parsed.mic);
          }
          if (parsed.punctuation !== undefined) {
            setPunctuationRaw(parsed.punctuation);
          }
        }
      } catch (_e) {
        /* first launch or corrupt data — use defaults */
      }
      setIsLoaded(true);
    })();
  }, []);

  const persist = useCallback(async (values: SettingsValues) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch (_e) {
      /* non-critical — settings will still work for this session */
    }
  }, []);

  const changeLanguage = useCallback((lang: string) => setLanguage(lang), []);
  const changeSpeaker = useCallback((s: string) => setSpeaker(s), []);
  const changeStt = useCallback((s: string) => setStt(s), []);
  const changeMic = useCallback((m: string) => setMic(m), []);
  const setPunctuation = useCallback(
    (v: boolean) => setPunctuationRaw(v),
    [],
  );

  const closeModal = useCallback(() => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setActiveDropdown(null);
      setLangSearch('');
    });
  }, [modalAnim]);

  const openModal = useCallback(() => {
    backup.current = {language, speaker, stt, mic, punctuation};
    setModalVisible(true);
    setActiveDropdown(null);
    setLangSearch('');
    modalAnim.setValue(0);
    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [language, speaker, stt, mic, punctuation, modalAnim]);

  const cancelModal = useCallback(() => {
    const b = backup.current;
    setLanguage(b.language);
    setSpeaker(b.speaker);
    setStt(b.stt);
    setMic(b.mic);
    setPunctuationRaw(b.punctuation);
    closeModal();
  }, [closeModal]);

  const saveModal = useCallback(() => {
    persist({language, speaker, stt, mic, punctuation});
    closeModal();
  }, [language, speaker, stt, mic, punctuation, closeModal, persist]);

  const toggleDropdown = useCallback((name: string) => {
    setActiveDropdown(prev => (prev === name ? null : name));
    if (name !== 'lang') {
      setLangSearch('');
    }
  }, []);

  const closeDropdown = useCallback(() => setActiveDropdown(null), []);

  const value: SettingsContextValue = {
    language,
    speaker,
    stt,
    mic,
    punctuation,
    isLoaded,
    changeLanguage,
    changeSpeaker,
    changeStt,
    changeMic,
    setPunctuation,
    modalVisible,
    overlayOpacity,
    sheetTranslateY,
    activeDropdown,
    langSearch,
    openModal,
    cancelModal,
    saveModal,
    toggleDropdown,
    closeDropdown,
    setLangSearch,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
