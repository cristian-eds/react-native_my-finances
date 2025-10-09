import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './PeriodFilterDropdownItemStyles';
import { ModalSelectPeriod } from '../modals/ModalSelectPeriod/ModalSelectPeriod';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useTransactionStore } from '../../stores/TransactionStore';
import { getInitialDateOfMonth, getLastDayOfMonth, getWeekBounds } from '../../utils/DateFormater';

interface PeriodFilterDropdownItemProps {
    item: { label?: string | undefined; value?: any };
    onPress: (item: any) => void;
    isSelected: boolean;
    handleSetPeriodDates: (initialDate: Date, finalDate: Date) => void
}

export function PeriodFilterDropdownItem({ item, onPress, isSelected, handleSetPeriodDates }: PeriodFilterDropdownItemProps) {

    const [showModalPeriod, setShowModalPeriod] = useState(false);

    const {filters} = useTransactionStore();

    const handleSelect = () => {
        if(item.value === 'PERIOD') {
            setShowModalPeriod(true);
            return;
        } else if (item.value === 'MONTH') {
            const newInitialDate = getInitialDateOfMonth(filters.initialDate.getFullYear(), filters.initialDate.getMonth());
            const newLastDate = getLastDayOfMonth(filters.initialDate.getFullYear(), filters.initialDate.getMonth());
            handleSetPeriodDates(newInitialDate, newLastDate);
        } else if (item.value === 'DAY') {
            handleSetPeriodDates(filters.initialDate, filters.initialDate);
        } else if (item.value === 'WEEK') {
            const { firstDay, lastDay } = getWeekBounds(filters.initialDate);
            handleSetPeriodDates(firstDay, lastDay);
        }

        onPress(item);
    }

    const handleConfirmValuePeriod = () => {
        setShowModalPeriod(false);
        onPress(item);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleSelect}>
            <Text style={styles.text}>{item.label}</Text>
            {isSelected && <Ionicons name="checkmark" size={18} color="black" />}
            <ModalSelectPeriod 
                isShow={showModalPeriod} 
                onClose={() => setShowModalPeriod(false)} 
                handleSetPeriodDates={handleSetPeriodDates} 
                handleConfirmValue={handleConfirmValuePeriod}/>
        </TouchableOpacity>
    );
}