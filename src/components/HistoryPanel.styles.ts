import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  historyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 100,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 60,
    paddingBottom: 14,
  },
  historyBackBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 11,
    marginRight: 21,
  },
  historyBackIcon: {
    width: 24,
    height: 17,
  },
  historyAvatar: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: '#EBEB80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  historyAvatarLetter: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  historyProfileInfo: {
    flexShrink: 1,
  },
  historyEmail: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
  historyBadge: {
    backgroundColor: '#3AD2A7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
    overflow: 'visible',
  },
  historyBadgeStar: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 9,
    height: 9,
    transform: [{rotate: '-15deg'}],
  },
  historyBadgeText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  historyHeaderSpacer: {
    flex: 1,
  },
  historyLangBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyFlagIcon: {
    width: 23,
    height: 23,
  },
  historyFlagVectorIcon: {
    width: 8.12,
    height: 4.06,
    marginLeft: 5,
    marginRight: 11,
  },
  historyScroll: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  historyScrollContent: {
    paddingHorizontal: 0,
    paddingTop: 4,
    paddingBottom: 30,
  },
  historyGroup: {
    marginBottom: 4,
  },
  historyDateLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#9E9E9E',
    marginBottom: 8,
    marginTop: 10,
    marginHorizontal: 16,
  },
});
