import React, { useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { formaterIsoDateToDefaultPattern, getDatePatternMonthShortYearDigit, getDateWithNextMonth, getDateWithPrevMonth, getPatterDateDayMonthDigit, getWeekBounds } from '../../utils/DateFormater';
import { PeriodFilterDropdownItem } from '../PeriodFilterDropdownItem/PeriodFilterDropdownItem';

import { styles } from './PeriodFilterStyles';
import { Ionicons } from '@expo/vector-icons';

export type Mode =  'DAY' | 'MONTH' | 'WEEK' | 'PERIOD';

export function PeriodFilter() {

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<Mode>('MONTH');
    const [activeDate, setActiveDate] = useState(new Date());

    const [periodInitialDate, setPeriodInitialDate] = useState<Date>();
    const [periodFinalDate, setPeriodFinalDate] = useState<Date>();
    
    const { firstDay, lastDay } = getWeekBounds(activeDate);

    const items = [
        { label: `Dia | ${getPatterDateDayMonthDigit(activeDate)}`, value: 'DAY' },
        { label: `Semana | ${getPatterDateDayMonthDigit(firstDay)} - ${getPatterDateDayMonthDigit(lastDay)}`, value: 'WEEK' },
        { label: `Mês | ${getDatePatternMonthShortYearDigit(activeDate)}`, value: 'MONTH' },
        { label: 
            `Periodo | ${periodInitialDate ? formaterIsoDateToDefaultPattern(periodInitialDate) : ''} - ${periodFinalDate? formaterIsoDateToDefaultPattern(periodFinalDate) : ''}`, 
            value: 'PERIOD' }
    ]

    const handleSetPeriodDates = (initialDate: Date, finalDate: Date) => {
        setPeriodInitialDate(initialDate);
        setPeriodFinalDate(finalDate);
    }

    const handleBackPeriod = () => {
        if(mode === 'DAY') {
            setActiveDate(prevDate => {
                const newDate = new Date(prevDate).setDate(prevDate.getDate()-1);
                return new Date(newDate);
            })
        } else if (mode === 'WEEK') {
            setActiveDate(prevDate => new Date(prevDate.setDate(firstDay.getDate() - 1)))
        } else if (mode === 'MONTH') {
            setActiveDate(getDateWithPrevMonth(activeDate));
        }
    }

    const handleNextPeriod = () => {
        if(mode === 'DAY') {
            setActiveDate(prevDate => {
                const newDate = new Date(prevDate).setDate(prevDate.getDate()+1);
                return new Date(newDate);
            })
        } else if (mode === 'WEEK') {
            setActiveDate(prevDate => new Date(prevDate.setDate(lastDay.getDate() + 1)))
        }  else if (mode === 'MONTH') {
            setActiveDate(getDateWithNextMonth(activeDate));
        }
    }


    return (
        <>
            <Ionicons name="chevron-back" size={24} color="black" onPress={handleBackPeriod}/>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={items}
                setValue={setMode}
                value={mode}

                style={styles.dropDownStyle}
                containerStyle={styles.containerPeriod}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                labelStyle={styles.labelStyle}

                renderListItem={(props) => <PeriodFilterDropdownItem {...props} handleSetPeriodDates={handleSetPeriodDates}/> }
            />
            <Ionicons name="chevron-forward" size={24} color="black" onPress={handleNextPeriod}/>
        </>

    );
} 