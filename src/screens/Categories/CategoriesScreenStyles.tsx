import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  captions: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  captionItem: {
    flex: 1,
    paddingVertical: 8
  },
  captionItemText: {
    textAlign: 'center',
  },
  captionItemTextActive: {
    fontWeight: 'bold',
    color: 'white'
  },
  captionItemActive: {
    backgroundColor: '#0023a171',
    borderRadius: 5
  },
  containerItems: {
    rowGap: 10,
    paddingBottom: 80
  }
});