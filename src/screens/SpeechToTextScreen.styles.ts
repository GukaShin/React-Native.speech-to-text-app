import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 27,
  },
  contentTranscript: {
    paddingTop: 9,
  },
  listenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  listenIcon: {
    width: 22,
    height: 22,
  },
  listenText: {
    fontSize: 18,
    color: '#1F1F23',
    fontWeight: '400',
  },
});
