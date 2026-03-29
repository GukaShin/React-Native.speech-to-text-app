import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  transcriptWrap: {
    position: 'relative',
    width: '100%',
    flex: 1,
  },
  transcriptScroll: {
    flex: 1,
  },
  transcriptContent: {
    paddingBottom: 8,
  },
  transcriptText: {
    marginLeft: 0,
    marginRight: 20,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: '#1F1F23',
  },
  transcriptScrollTrack: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 7,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  transcriptScrollBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 7,
    height: 25,
    borderRadius: 4,
    backgroundColor: '#2FA2FE',
  },
});
