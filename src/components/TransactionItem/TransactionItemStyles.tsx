import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    columnGap: 10,
    marginBottom: 10,
    elevation: 2
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,

  },
  central_info: {
    flex: 1
  },
  central_info_description: {
    fontSize: 18
  },
  central_info_data: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  value_info: {
    alignItems: 'center',
    columnGap: 2,
    flexDirection: 'row'
  },
  value_info_text: {
    fontSize: 20,
    fontWeight: '600'
  }
});