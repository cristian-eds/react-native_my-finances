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

  return (
    <View style={GlobalStyles.container_screens_normal}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <PeriodFilter filters={filters} setFiltersDates={setFiltersDate} />
      <Row style={{ columnGap: 10 }}>
        {renderItem(MovementType.Receita, 2000, 4)}
        {renderItem(MovementType.Despesa, 1500, 3)}
      </Row>
    </View>
  );
}