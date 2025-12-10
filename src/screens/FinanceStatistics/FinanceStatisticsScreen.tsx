import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { styles } from './FinanceStatisticsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { ButtonBack } from '../../components/buttons/ButtonBack/ButtonBack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { DuplicateFiltersModel } from '../../domain/duplicatesFilters';
import { useDuplicateStore } from '../../stores/DuplicateStores';
import { Row } from '../../components/structure/Row/Row';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { CurvedLineChart } from '../../components/charts/CurvedLineChart/CurvedLineChart';
import { lineDataItem } from 'react-native-gifted-charts';


const lineData: lineDataItem[] = [
  { value: 58, label: 'Jan', hideDataPoint: true },
  { value: 61, label: 'Fev', hideDataPoint: true },
  { value: 51, label: 'Mar', hideDataPoint: false},
  { value: 70, label: 'Abr', hideDataPoint: true },
  { value: 56, label: 'Mai', hideDataPoint: true },
];

const lineData2 = [
  { value: 38, label: 'Jan', hideDataPoint: true },
  { value: 41, label: 'Fev', hideDataPoint: true },
  { value: 27, label: 'Mar', hideDataPoint: false },
  { value: 58, label: 'Abr', hideDataPoint: true },
  { value: 32, label: 'Mai', hideDataPoint: true },
];

export function FinanceStatisticsScreen() {

  const { filters: filtersStore } = useDuplicateStore();

  const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();
  const [filters, setFilters] = useState<DuplicateFiltersModel>(filtersStore);

  const setFiltersDate = (initial: Date, final: Date) => {
    setFilters({ ...filters, initialDate: initial, finalDate: final })
  }

  const renderItem = (type: MovementType, total: number, numberOfDuplicate: number) => {
    const payable = MovementType.Despesa === type;
    return (
      <View style={[styles.caption, payable ? styles.captionPayable : styles.captionReceivable]}>
        <Row>
          <Text style={styles.captionTitle}>
            Total à {payable ? 'Pagar' : 'Receber'}
          </Text>
          <Ionicons name="trending-up-outline" size={18} color="black" />
        </Row>
        <Text style={[styles.captionValue, payable ? styles.captionTitlePayable : styles.captionTitleReceivable]}>{formaterNumberToBRL(total)}</Text>
        <Text style={styles.captionSubText}>{numberOfDuplicate} duplicatas</Text>
      </View>
    )
  }

  const randerCaptionChartBadge = (text: string, color: string) => {
    return (
      <Row style={{ columnGap: 6 }}>
        <View style={[styles.chartCaptionBadge, { backgroundColor: color }]}></View>
        <Text>{text}</Text>
      </Row>
    )
  }


  return (
    <View style={GlobalStyles.container_screens_normal}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <PeriodFilter filters={filters} setFiltersDates={setFiltersDate} />
      <Row style={{ columnGap: 10 }}>
        {renderItem(MovementType.Receita, 2000, 4)}
        {renderItem(MovementType.Despesa, 1500, 3)}
      </Row>
      <SectionWithTitle title='Evolução mensal'>
        <CurvedLineChart data={lineData} data2={lineData2} />
        <Row style={{ justifyContent: 'center', columnGap: 20 }}>
          {randerCaptionChartBadge('A Receber', '#098e00ff')}
          {randerCaptionChartBadge('A Pagar', '#d80d0dff')}
        </Row>
      </SectionWithTitle>
    </View>
  );
}