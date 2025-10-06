import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './PeriodFilterStyles';
import DropDownPicker from 'react-native-dropdown-picker';



export function PeriodFilter() {

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('TODAY');

    const items = [
        {label:'HOJE', value: 'TODAY'},
        {label:'SEMANA',  value: 'WEEK'},
        {label:'MÊS',  value: 'MONTH'},
        {label:'PERIODO',  value: 'PERIOD'}
    ]



    return (
        <TouchableOpacity style={styles.container_period}>
            <Text style={styles.title}>Set-2025</Text>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={items}
                setValue={setMode}
                value={mode}
            />
        </TouchableOpacity>
    );
} 