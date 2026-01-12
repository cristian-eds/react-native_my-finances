import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e2e2ff',
    padding: 3,
    borderRadius: 15,
    columnGap: 0,
    borderWidth: 0.1,
    borderColor: 'rgba(87, 87, 87, 1)',

  },
  itemSwitch: {
    paddingHorizontal: 7,
    paddingVertical: 2
  },
  itemSwitchActive: {
    backgroundColor: '#5765e2ec',
    borderRadius: 15, 
    elevation: 2
  },
  itemText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: '500',
    color: '#888888ff'
  },
  itemTextActive: {
    fontWeight: '500',
    color: 'white'
  }
});