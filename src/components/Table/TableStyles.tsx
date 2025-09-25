import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  table: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
  },
  table_row: {
    flexDirection: 'row',
  },
  table_row_header: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'black'
  },
  table_row_cell: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5
  },
  table_row_cell_text: {
    fontSize: 14,
    textAlign: 'center'
  }
});