import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedItem: {
    backgroundColor: '#5b87c9b4'
  },
  text: {
    fontSize: 15
  },
  textSelected: {
    color: 'white',
    fontWeight: 'bold'
  },
  groupItems: { 
    flexDirection: 'row', 
    columnGap: 10,
    alignItems: 'center'
  }
});