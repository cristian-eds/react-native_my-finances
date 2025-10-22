import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 10,
    borderTopColor: '#8888883d',
    borderTopWidth: 0.5
  },
  footerText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});