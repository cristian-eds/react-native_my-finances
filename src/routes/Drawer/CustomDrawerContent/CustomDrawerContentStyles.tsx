import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  header: {
    marginBottom: 15
  },
  tab: {
    rowGap: 8,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: .7,
    padding: 10,
    borderBottomColor: '#9e9e9e81'
  },
  itemLink: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    flex: 1
  },
  itemText: {
    fontSize: 18
  },
  boxChevron: {
    width: '15%',
    alignItems: 'flex-end'
  },
  subItem: {
    flexDirection: 'row',
    columnGap: 20,
    paddingLeft: 25
  },
  subItemText: {
    fontSize: 16
  },
});