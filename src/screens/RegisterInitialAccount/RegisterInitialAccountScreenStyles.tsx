import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffffff',
    borderTopLeftRadius: 80,
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 25,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    textAlign: 'center'
  },
  showMore: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showMoreText: {
    fontStyle: "italic",
    color: '#000925ff'
  },
  customSection: {
    paddingHorizontal: 0, 
    paddingVertical: 0, 
    paddingTop: 10, 
    rowGap: 10
  }
});