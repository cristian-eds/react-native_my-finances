import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonBack:{
    padding: 2,
    borderRadius: 50,
  },
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
    rowGap: 10
  },
  categoryItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    columnGap: 15
  },
  iconCircle: {
    backgroundColor: '#9bb3f9c7',
    padding: 10,
    borderRadius: 50
  },
  categoryItemTitle: {
    fontSize: 18,
    flex: 1
  },
});