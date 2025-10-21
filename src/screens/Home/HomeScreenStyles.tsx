import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  transactions: {
    marginBottom: 5
  },
  transactions_infos: {
    rowGap: 10
  },
  period: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    width: '100%',
    backgroundColor: 'white',
    height: 60,
    borderRadius: 10,
  },
  captions: {
    rowGap: 5
  },
  captionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  transactions_infos_item: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  transactions_infos_h1: {
    fontSize: 24
  },
  transactions_infos_h2: {
    fontSize: 20
  },
  transactions_infos_h3: {
    fontSize: 18
  },
  transactions_infos_h4: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15
  },

});