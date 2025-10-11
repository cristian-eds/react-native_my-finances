import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  tab: {
    rowGap: 8
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemLink: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    flex: 1
  },
  itemText: {
    fontSize: 20
  },
  subItem: {
    flexDirection: 'row',
    columnGap: 20,
    paddingLeft: 25
  },
  subItemText: {
    fontSize: 18
  }
});