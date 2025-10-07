import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './PeriodFilterDropdownItemStyles';
import { ModalSelectPeriod } from '../modals/ModalSelectPeriod/ModalSelectPeriod';

import Ionicons from '@expo/vector-icons/Ionicons';

interface PeriodFilterDropdownItemProps {
    item: { label?: string | undefined; value?: any };
    onPress: (item: any) => void;
    isSelected: boolean;
    handleSetPeriodDates: (initialDate: Date, finalDate: Date) => void
}

export function PeriodFilterDropdownItem({ item, onPress, isSelected, handleSetPeriodDates }: PeriodFilterDropdownItemProps) {

    const [showModalPeriod, setShowModalPeriod] = useState(false);

    const handleSelect = () => {
        if(item.value === 'PERIOD') {
            setShowModalPeriod(true);
            return;
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