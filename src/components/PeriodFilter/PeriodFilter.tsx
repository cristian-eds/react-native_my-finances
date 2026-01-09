import React, { useEffect, useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { formaterIsoDateToDefaultPattern, getDatePatternMonthShortYearDigit, getInitialDateForPrevMonth, getInitialDateOfMonth, getLastDayOfMonth, getPatterDateDayMonthDigit, getWeekBounds } from '../../utils/DateFormater';
import { PeriodFilterDropdownItem } from '../PeriodFilterDropdownItem/PeriodFilterDropdownItem';

import { styles } from './PeriodFilterStyles';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { TransactionFiltersModel } from '../../domain/transactionFiltersModel';
import { DuplicateFiltersModel } from '../../domain/duplicatesFilters';

export type Mode = 'DAY' | 'MONTH' | 'WEEK' | 'PERIOD';


interface PeriodFilterProps {
    filters: TransactionFiltersModel | DuplicateFiltersModel,
    setFiltersDates: (initialDate: Date, finalDate: Date) => void,
    enableModes?: Mode[] 
}

export function PeriodFilter({filters, setFiltersDates, enableModes}:PeriodFilterProps) {

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<Mode>('MONTH');

    const { firstDay, lastDay } = getWeekBounds(filters.initialDate);

    const items = [
        { label: `Diário | ${getPatterDateDayMonthDigit(filters.initialDate)}`, value: 'DAY' },
        { label: `Semanal | ${getPatterDateDayMonthDigit(firstDay)} - ${getPatterDateDayMonthDigit(lastDay)}`, value: 'WEEK' },
        { label: `Mensal | ${getDatePatternMonthShortYearDigit(filters.initialDate)}`, value: 'MONTH' },
        {
            label:
                `Periodo | ${formaterIsoDateToDefaultPattern(filters.initialDate)} - ${formaterIsoDateToDefaultPattern(filters.finalDate)}`,
            value: 'PERIOD'
        }
    ]

    const enableItemsToDrop = () => {
        if(!enableModes) return items;
        const filteredItems = items.filter(item => enableModes.find(mode => mode === item.value))
        return filteredItems;
    }

    const handleSetPeriodDates = (initialDate: Date, finalDate: Date) => {
        setFiltersDates(initialDate, finalDate);
    }

    const handleBackPeriod = () => {
        if (mode === 'DAY') {
            const newDate = new Date(filters.initialDate.setDate(filters.initialDate.getDate() - 1));
            setFiltersDates(newDate, newDate);
        } else if (mode === 'WEEK') {
            const { firstDay: newFirstDay, lastDay: newLastDay } = getWeekBounds(new Date(firstDay.setDate(firstDay.getDate() - 1)));
            setFiltersDates(newFirstDay, newLastDay);
        } else if (mode === 'MONTH') {
            const newInitialDate = getInitialDateForPrevMonth(filters.initialDate);
            const newLastDate = getLastDayOfMonth(newInitialDate.getFullYear(), newInitialDate.getMonth());
            setFiltersDates(newInitialDate, newLastDate);
        }
    }

    const handleNextPeriod = () => {
        if (mode === 'DAY') {
            const newDate = new Date(filters.initialDate.setDate(filters.initialDate.getDate() + 1));
            setFiltersDates(newDate, newDate);
        } else if (mode === 'WEEK') {
            const { firstDay: newFirstDay, lastDay: newLastDay } = getWeekBounds(new Date(lastDay.setDate(lastDay.getDate() + 1)));
            setFiltersDates(newFirstDay, newLastDay);
        } else if (mode === 'MONTH') {
            const newInitialDate = getInitialDateOfMonth(filters.initialDate.getFullYear(), filters.initialDate.getMonth() + 1);
            const newLastDate = getLastDayOfMonth(newInitialDate.getFullYear(), newInitialDate.getMonth());
            setFiltersDates(newInitialDate, newLastDate);
        }
    }

    useEffect(() => {
        const monthIndex = filters.initialDate.getMonth();
        const year = filters.initialDate.getFullYear();
        handleSetPeriodDates(getInitialDateOfMonth(year, monthIndex), getLastDayOfMonth(year, monthIndex))
    }, [])

    return (
        <View style={styles.period}>
            <Ionicons name="chevron-back" size={24} color={ mode === 'PERIOD' ? 'gray' : 'black'} onPress={handleBackPeriod} disabled={mode === 'PERIOD'} />
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={enableItemsToDrop()}
                setValue={setMode}
                value={mode}
                style={styles.dropDownStyle}
                containerStyle={styles.containerPeriod}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                labelStyle={styles.labelStyle}
                renderListItem={(props) => <PeriodFilterDropdownItem {...props} handleSetPeriodDates={handleSetPeriodDates} />}
                zIndex={2000}
                zIndexInverse={900}
            />
            <Ionicons name="chevron-forward" size={24} color={ mode === 'PERIOD' ? 'gray' : 'black'} onPress={handleNextPeriod} disabled={mode === 'PERIOD'} />
        </View>

    );
} 