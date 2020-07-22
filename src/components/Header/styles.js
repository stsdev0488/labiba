import { Platform, StyleSheet } from 'react-native';
import { Colors } from 'config';
import { scaleH, scaleW } from 'utils/scale';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: scaleH(2),
    },
    shadowColor: '#2F3432',
    shadowOpacity: 0.1,
    elevation: scaleH(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleW(20),
    paddingVertical: scaleH(Platform.OS === 'ios' ? 10 : 13),
  },
  icon: {
    height: scaleH(24),
  },
  title: {
    fontSize: scaleH(25),
    fontWeight: '500',
    color: Colors.primary,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    borderRadius: scaleH(30),
    paddingLeft: scaleW(38),
    paddingVertical: scaleH(Platform.OS === 'ios' ? 15 : 10),
    marginTop: scaleH(-10),
  },
  searchIcon: {
    position: 'absolute',
    top: scaleH(14),
    left: scaleW(30),
  },
});
