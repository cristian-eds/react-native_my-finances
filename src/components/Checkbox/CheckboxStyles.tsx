import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#061e00ff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSquare: {
    borderRadius: 4,
  },
  containerSquareCheck: {
    backgroundColor: 'rgb(90, 141, 211)',
    borderColor: 'rgb(90, 141, 211)',
  },
  indicator: {
    width: 12,
    height: 12,
    backgroundColor: '#104f01ff',
    borderRadius: 50,
  }
});