import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical:10,
    paddingHorizontal: 25,
    backgroundColor: 'white'
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card_header_account: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  card_header_account_title: {
    fontSize: 30
  },
  card_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card_info_text_balance: {
    fontSize: 34,
    fontWeight: '400'
  }
});