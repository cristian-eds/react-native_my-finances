import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  headerAccountText: {
    paddingRight: 15,
    textAlign: 'right'
  },
  sectionChartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  sectionChartHeaderText: {
    fontSize: 20
  },
  chart: {
    rowGap: 10,
    marginBottom: 20
  },
  period: {
    marginBottom: 15
  },
  periodText: {
    fontSize: 18,
    paddingLeft: 8,
    paddingBottom: 10
  },
  captionMovementType: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  captionMovementTypeItem: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  captionMovementTypeItemActive: {
    backgroundColor: '#0e5affa8',
    borderRadius: 5
  },
  captionMovementTypeItemText: {
    textAlign: 'center',
    fontSize: 15
  },
  captionMovementTypeItemTextActive: {
    fontWeight: 'bold',
    color: 'white'
  }
});