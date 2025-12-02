import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: '#000'
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    paddingHorizontal: 5,
  },
  tabContainerActive: {
    borderBottomColor: '#070031ff',
    borderBottomWidth: 1
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 5,
    color: '#727272d3'
  },
  tabActive: {
    fontWeight: '800',
    color: '#000'
  },
  textNoTransactions: {
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#272727ff'
  },
  buttonInstallmentsPreview: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 8,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 7
  },
});