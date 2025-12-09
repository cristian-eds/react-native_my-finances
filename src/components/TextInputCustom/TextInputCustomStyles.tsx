import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#09090929',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fffffffb',
  },
  focus: {
    borderColor: '#9c9fb9d7'
  },
  input: {
    fontSize: 18,
    flex: 1,
    color: 'black'
  },
  error_message: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    left: 2,
    position: 'absolute',
    bottom: -16,
  }
});