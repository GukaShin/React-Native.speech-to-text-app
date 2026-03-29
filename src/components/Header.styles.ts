import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1.25,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleArrowsIcon: {
    width: 20,
    height: 18,
    justifyContent: 'center',
    gap: 3,
  },
  arrowRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLine: {
    flex: 1,
    height: 0,
    borderTopWidth: 1.5,
    borderTopColor: '#333333',
  },
  arrowHeadRight: {
    width: 0,
    height: 0,
    borderTopWidth: 3.5,
    borderBottomWidth: 3.5,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#333333',
  },
  arrowHeadLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 3.5,
    borderBottomWidth: 3.5,
    borderRightWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#333333',
  },
  settingsIconWrap: {
    width: 36,
    height: 36,
    opacity: 1,
    transform: [{rotate: '-180deg'}],
    zIndex: 20,
  },
  settingsButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIconImage: {
    width: 30,
    height: 30,
    tintColor: '#000000',
  },
  settingsButtonPressed: {
    opacity: 0.8,
  },
});
