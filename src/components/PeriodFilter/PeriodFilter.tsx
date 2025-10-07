import React, { useEffect, useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { formaterIsoDateToDefaultPattern, getDatePatternMonthShortYearDigit, getPatterDateDayMonthDigit, getWeekBounds } from '../../utils/DateFormater';
import { PeriodFilterDropdownItem } from '../PeriodFilterDropdownItem/PeriodFilterDropdownItem';

import { styles } from './PeriodFilterStyles';

export type Mode =  'TODAY' | 'MONTH' | 'WEEK' | 'PERIOD';

export function PeriodFilter() {

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<Mode>('MONTH');
    const [activeDate, setActiveDate] = useState(new Date());

    const [periodInitialDate, setPeriodInitialDate] = useState<Date>();
    const [periodFinalDate, setPeriodFinalDate] = useState<Date>();
    
    const { firstDay, lastDay } = getWeekBounds(activeDate);

    const items = [
        { label: `Hoje | ${getPatterDateDayMonthDigit(activeDate)}`, value: 'TODAY' },
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

    return (
        <>
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
            
        </>

    );
} 