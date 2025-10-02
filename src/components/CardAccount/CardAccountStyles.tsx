import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#b2b2b2ff',
    borderRadius: 20,
    paddingVertical:10,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    zIndex: 5,
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
    fontSize: 34,
    fontWeight: '400'
  }
});