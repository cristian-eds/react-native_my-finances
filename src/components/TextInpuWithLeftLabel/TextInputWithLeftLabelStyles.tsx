import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 10,
    padding: 3,
    borderRadius: 5,
    rowGap: 5,
    alignItems: 'center',
    borderBottomColor: '#a1a1a1c0', 
    borderBottomWidth: 1,
  },
  text_label: {
    fontSize: 16,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffffff',
    textAlign: 'right',
    paddingRight: 5,
    width: '100%',
  }
});