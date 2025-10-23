import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingRight: 30,
    paddingLeft: 15,
    backgroundColor: 'white',
    zIndex: 5,
    rowGap: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card_info_text_balance: {
    fontSize: 32,
    fontWeight: '500',
    paddingLeft: 15,
  },
  cardText: {
    fontSize: 14,
    color: '#747474cf',
    textAlign: 'left',
    paddingLeft: 13
  }
});