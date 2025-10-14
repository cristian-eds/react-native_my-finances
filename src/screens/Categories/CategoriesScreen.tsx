import React, { useEffect } from 'react';
import { View } from 'react-native';

import { styles } from './CategoriesScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { ButtonIconSimple } from '../../components/buttons/ButtonIconSimple/ButtonIconSimple';

export function CategoriesScreen() {

    const navigation = useNavigation();


    useEffect(() => {
        navigation.getParent()?.setOptions(
            { title: 'Categorias' }
        )

        return () => {
            navigation.getParent()?.setOptions(
                { title: '' }
            )
        }
    }, [])

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <ButtonIconSimple iconName='arrow-back' onPress={() => navigation.goBack()} />
                
        </View>
    );
}