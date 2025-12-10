import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  caption: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    rowGap: 5,
    borderWidth: 1
  },
  captionPayable: {
    backgroundColor: '#ffe3e3ff',
    borderColor: '#eb1e1eff'
  },
  captionReceivable: {
    backgroundColor: '#e6ffe3ff',
    borderColor: '#1f6316ff'
  },
  captionTitlePayable: {
    color: '#eb1e1eff',
  },
  captionTitleReceivable: {
    color: '#1f6316ff'
  },
  captionTitle:{
    fontSize: 14,
    fontWeight: '400'
  },
  captionValue: {
    fontSize: 20,
    fontWeight: '600'
  },
  captionSubText: {
    fontSize: 14
  },
  chartCaptionBadge: {
    width: 15,
    height: 15,
    borderRadius: 50
  }
});