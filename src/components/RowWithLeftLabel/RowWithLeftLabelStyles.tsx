import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 10,
    padding: 2,
    borderRadius: 5,
    alignItems: 'center',
    borderBottomColor: '#a1a1a1c0',
    borderBottomWidth: 1,
  },
  error_message: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    right: 5,
    position: 'absolute',
    bottom: -9,
    backgroundColor: 'white',
    zIndex: 100000
  },
  text_label: {
    fontSize: 16,
    paddingLeft: 5,
  },
});