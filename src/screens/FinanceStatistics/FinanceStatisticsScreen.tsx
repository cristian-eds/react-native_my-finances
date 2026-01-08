import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { styles } from './FinanceStatisticsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { ButtonBack } from '../../components/buttons/ButtonBack/ButtonBack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { useDuplicateStore } from '../../stores/DuplicateStores';
import { Row } from '../../components/structure/Row/Row';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { CurvedLineChart } from '../../components/charts/CurvedLineChart/CurvedLineChart';
import { lineDataItem } from 'react-native-gifted-charts';
import { useUserContext } from '../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';
import { getAllByUser } from '../../services/duplicateService';
import { DuplicateModel } from '../../domain/duplicateModel';
import { ColumnsOrderDuplicate } from '../../domain/enums/columnsOrderDuplicate';
import { OrderTypes } from '../../domain/enums/orderTypes';
import { getMonthAbbreviation } from '../../utils/DateFormater';
import { CustomPieChart } from '../../components/charts/PieChart/CustomPieChart';
import { findTransactionsByDuplicateList } from '../../services/transactionService';
import { Transaction } from '../../domain/transactionModel';

export function FinanceStatisticsScreen() {

  const { duplicates, filters, setFiltersDates, fetchDuplicates } = useDuplicateStore();

  const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();
  const { user } = useUserContext();
  const database = useSQLiteContext();

  const [chartDuplicates, setChartDuplicates] = useState<DuplicateModel[]>(duplicates);
  const [paymentsDuplicates, setPaymentsDuplicates] = useState<Transaction[]>([]);

   const totalValue = chartDuplicates.reduce((prev, current) => prev + current.totalValue, 0);

  useEffect(() => {
    const getDuplicatesToChart = async () => {
      const actualDate = new Date(filters.initialDate);
      const dateMinusTwoMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() - 2, 1);
      const datePlusTwoMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() + 2, 1);
      const duplicates = await getAllByUser(user?.id as number, { initialDate: dateMinusTwoMonth, finalDate: datePlusTwoMonth }, { orderColumn: ColumnsOrderDuplicate.DATA_VENCIMENTO, orderType: OrderTypes.CRESCENTE }, database);
      setChartDuplicates(duplicates);
    }
    const fetch = async () => {
      await fetchDuplicates(user?.id as number, database)
      await getDuplicatesToChart();
      if (chartDuplicates) {
        const payments = await findTransactionsByDuplicateList(chartDuplicates, database);
        setPaymentsDuplicates(payments);
      }
    }
    fetch();
  }, [filters])


  const generateItemsToLineChart = (type: MovementType) => {
    if (chartDuplicates.length === 0) return;
    const filteredDuplicates = chartDuplicates.filter(dup => dup.movementType === type);

    const months = generateStaticMonthsToChart();

    const initialItemWithMonth: { month: number, items: lineDataItem }[] = Array.from(months).map(month => { return { month: month as number, items: { value: 0, label: getMonthAbbreviation(month as number), hideDataPoint: true, stripColor: '#030303ff' } } });

    const items: { month: number, items: lineDataItem }[] = filteredDuplicates.reduce((acumulator, current) => {
      const actualFilterMonth = new Date(filters.initialDate).getMonth();
      const currentItemMonth = new Date(current.dueDate).getMonth();
      const isActualMonth = actualFilterMonth === currentItemMonth;
      const actualItem = acumulator.find(item => item.month === currentItemMonth);
      if (actualItem) {
        const newItem = {
          ...actualItem, items: {
            ...actualItem.items,
            value: Number(actualItem.items.value) + current.totalValue,
            hideDataPoint: isActualMonth ? false : true,
            showStrip: isActualMonth ? true : false,
          }
        }
        return acumulator.map(item => item.month === currentItemMonth ? newItem : item);
      }
      return acumulator;
    }, initialItemWithMonth as { month: number, items: lineDataItem }[]);

    return items.map(item => item.items);
  }

  const generateStaticMonthsToChart = () => {
    const actualDate = new Date(filters.initialDate);
    const dateMinusOneMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() - 1, 1);
    const dateMinusTwoMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() - 2, 1);
    const datePlusOneMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 1);
    const datePlusTwoMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() + 2, 1);
    const months = [dateMinusTwoMonth.getMonth(), dateMinusOneMonth.getMonth(), actualDate.getMonth(), datePlusOneMonth.getMonth(), datePlusTwoMonth.getMonth()];
    return new Set<number>(months)
  }

  const generateItemsToPieChart = () => {
    let payed = { color: '#098e00ff', value: 0, count: 0, text: 'Pago' };
    let pending = { color: 'rgba(98, 140, 255, 1)', value: 0, count: 0, text: 'Aberto' };
    let overdue = { color: '#d80d0dff', value: 0, count: 0, text: 'Vencido' };

    chartDuplicates.forEach(dup => {
      const payDup = paymentsDuplicates.filter(pay => pay.duplicateId === dup.id);
      if (payDup && payDup.length > 0) {
        const totalPayed = payDup.reduce((prev, current) => prev + current.value, 0);
        if (totalPayed >= dup.totalValue) payed = { ...payed, value: payed.value + dup.totalValue, count: payed.count + 1 }
      } else if (new Date() > new Date(dup.dueDate)) {
        overdue = { ...overdue, value: overdue.value + dup.totalValue, count: overdue.count + 1 };
      } else {
        pending = { ...pending, value: pending.value + dup.totalValue, count: pending.count + 1 }
      }
    })
    return [payed, pending, overdue]

  }

  const renderItem = (type: MovementType) => {
    const payable = MovementType.Despesa === type;
    const filteredDuplicates = duplicates.filter(dup => dup.movementType == type);
    const totalValue = filteredDuplicates.reduce((prev, current) => prev + current.totalValue, 0);
    return (
      <View style={[styles.caption, payable ? styles.captionPayable : styles.captionReceivable]}>
        <Row>
          <Text style={styles.captionTitle}>
            Total à {payable ? 'Pagar' : 'Receber'}
          </Text>
          <Ionicons name="trending-up-outline" size={18} color="black" />
        </Row>
        <Text style={[styles.captionValue, payable ? styles.captionTitlePayable : styles.captionTitleReceivable]}>{formaterNumberToBRL(totalValue)}</Text>
        <Text style={styles.captionSubText}>{filteredDuplicates.length} duplicatas</Text>
      </View>
    )
  }

  const randerCaptionChartBadge = (index: number, text: string, color: string, value?: number, subText?: string) => {
    return (
      <View key={index} style={{rowGap: 3}}>
        <Row style={{ columnGap: 4 }} >
          <View style={[styles.chartCaptionBadge, { backgroundColor: color }]}></View>
          <Text>{text}</Text>
          {!!subText && <Text>({subText})</Text>}
        </Row>
        {!!value && <Text style={{ textAlign: 'center', fontWeight: '500'}}>{formaterNumberToBRL(value)}</Text> }
      </View>
    )
  }

  return (
    <View style={GlobalStyles.container_screens_normal}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <PeriodFilter filters={filters} setFiltersDates={setFiltersDates} enableModes={['MONTH']} />
      <ScrollView>
        <View style={{ rowGap: 10, paddingBottom: 30 }}>
          <Row style={{ columnGap: 10 }}>
            {renderItem(MovementType.Receita)}
            {renderItem(MovementType.Despesa)}
          </Row>
          <SectionWithTitle title='Evolução mensal'>
            {chartDuplicates.length > 0 && <CurvedLineChart data={generateItemsToLineChart(MovementType.Receita) as lineDataItem[]} data2={generateItemsToLineChart(MovementType.Despesa) as lineDataItem[]} />}
            <Row style={{ justifyContent: 'center', columnGap: 20 }}>
              {randerCaptionChartBadge(0, 'A Receber', '#098e00ff')}
              {randerCaptionChartBadge(1, 'A Pagar', '#d80d0dff')}
            </Row>
          </SectionWithTitle>
          <SectionWithTitle title='Status das Duplicatas'>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
              <CustomPieChart items={generateItemsToPieChart()} donut />
            </View>
            <Row style={{ justifyContent: 'center', columnGap: 20 }}>
              {generateItemsToPieChart().map((item, index) => randerCaptionChartBadge(index, item.text, item.color, item.value, item.count.toLocaleString()))}
            </Row>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Total ({chartDuplicates.length}): {formaterNumberToBRL(totalValue)}</Text>
          </SectionWithTitle>
        </View>
      </ScrollView>
    </View>
  );
}