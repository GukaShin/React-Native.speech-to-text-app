import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 10,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F95F2',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 28,
    justifyContent: 'center',
    gap: 6,
  },
  primaryActionIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B72B4',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 28,
    justifyContent: 'center',
    gap: 6,
  },
  secondaryActionIcon: {
    width: 17,
    height: 17,
    tintColor: '#23557D',
  },
  secondaryActionText: {
    color: '#1B72B4',
    fontSize: 14,
    fontWeight: '700',
  },
});
