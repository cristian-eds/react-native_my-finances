import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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

    const { filters } = useTransactionStore();

    const handleSelect = () => {
        if (item.value === 'PERIOD') {
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

    const iconNameAccordingMode = (mode: string): keyof typeof Ionicons.glyphMap  => {
        switch (mode) {
            case 'DAY':
                return 'calendar-number-outline'
            case 'WEEK':
                return 'today-outline'
            case 'MONTH':
                return 'calendar-outline'
            default:
                return 'calendar-clear-outline'
        }
    }


    return (
        <TouchableOpacity style={[styles.container, isSelected && styles.selectedItem]} onPress={handleSelect}>
            <View style={styles.groupItems}>
                <Ionicons name={iconNameAccordingMode(item.value)} size={18} color={isSelected ? 'white' : 'black'}/>
                <Text style={[styles.text, isSelected && styles.textSelected]}>{item.label?.split("|")[0]}</Text>
            </View>
            <View style={styles.groupItems}>
                <Text style={[styles.text, isSelected && styles.textSelected]}>{item.label?.split("|")[1]}</Text>
                {isSelected && <Ionicons name="checkmark" size={18} color={isSelected ? 'white' : 'black'} />}
            </View>
            <ModalSelectPeriod
                isShow={showModalPeriod}
                onClose={() => setShowModalPeriod(false)}
                handleSetPeriodDates={handleSetPeriodDates}
                handleConfirmValue={handleConfirmValuePeriod} />
        </TouchableOpacity>
    );
}