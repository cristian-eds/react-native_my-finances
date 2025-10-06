import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    columnGap: 10,
    marginBottom: 10
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40
  },
  central_info: {
    flex: 1
  },
  central_info_description: {
    fontSize: 18
  },
  central_info_data: {
    fontSize: 14,
    fontStyle: 'italic'
  },
  value_info: {
    alignItems: 'center',
    columnGap: 2,
    flexDirection: 'row'
  },
  value_info_text: {
    fontSize: 22,
    fontWeight: '600'
  }
});