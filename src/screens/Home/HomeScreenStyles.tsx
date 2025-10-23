import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  transactions: {
    marginBottom: 5
  },
  transactions_infos: {
    rowGap: 10
  },
  captions: {
    rowGap: 5,
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 5
  },
  captionItem: {
    flexDirection: 'column',
    flex: 1,
    rowGap: 8,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  captionItemText: {
    fontSize: 14,
    textAlign: 'center'
  },
  transactions_infos_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  transactions_infos_h1: {
    fontSize: 24
  },
  transactions_infos_h2: {
    fontSize: 20
  },
  transactions_infos_h3: {
    fontSize: 16,
    textAlign: 'center'
  },
  transactions_infos_h4: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15
  },

});