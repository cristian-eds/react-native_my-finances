import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1
  },
  footerTotal: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 10,
    borderTopColor: '#8888883d',
    borderTopWidth: 0.5
  },
  footerTotalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
  },
  footerTotalItemColor: {
    width:12,
    height:12,
    borderRadius: 50
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  footerTitles: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '500'
  }
});