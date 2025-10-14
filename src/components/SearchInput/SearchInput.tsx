import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { styles } from './SearchInputStyles';
import { Ionicons } from '@expo/vector-icons';


export function SearchInput({...props} : TextInputProps) {
    return (
        <View style={styles.search}>
            <Ionicons name="search-outline" size={24} color="black" />
            <TextInput {...props} style={styles.searchInput} />
        </View>
    );
}