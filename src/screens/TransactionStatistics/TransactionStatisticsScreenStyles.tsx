import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  headerAccountText: {
    paddingRight: 15,
    textAlign: 'right'
  },
  period: {
    marginBottom: 15
  },
  captionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  captionItemText: {
    fontSize: 20
  }
});