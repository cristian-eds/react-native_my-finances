import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  header: {
    marginBottom: 20
  },
  avatarHeader: {
    backgroundColor:'#9eb5ffcb',
    padding: 7,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500', 
    flexWrap: 'wrap'
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
    borderBottomColor: '#9e9e9e81',
  },
  itemsPrincipals: {
    borderRadius: 10
  },
  itemLink: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    flex: 1
  },
  itemText: {
    fontSize: 16,
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
  bgGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    borderRadius: 15
  }
});