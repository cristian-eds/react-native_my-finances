import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './CategoriesScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { ButtonIconSimple } from '../../components/buttons/ButtonIconSimple/ButtonIconSimple';
import { MovementType } from '../../domain/enums/movementTypeEnum';

import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { CircularActionButton } from '../../components/buttons/CircularActionButton/CircularActionButton';
import { CategoryModel } from '../../domain/categoryModel';
import { ModalCategory } from '../../components/modals/ModalCategory/ModalCategory';

const categorias: CategoryModel[] = [
    {
        id: 1,
        description: 'Saúde',
        movementType: MovementType.Despesa,
        hexColor: '#000000',
        iconName: 'medkit-outline'
    },
    {
        id: 2,
        description: 'Lazer',
        movementType: MovementType.Despesa,
        hexColor: '#000000',
        iconName: 'game-controller-outline'
    }
]

export function CategoriesScreen() {

    const navigation = useNavigation();

    const [captionActive, setCaptionActive] = useState("Despesas");
    const [showModalCategory, setShowModalCategory] = useState(false);


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


    const renderCaptionItem = (description: string) => {
        const isActive = description === captionActive;
        return (
            <TouchableOpacity id={description} style={[styles.captionItem, isActive ? styles.captionItemActive : null]} onPress={() => setCaptionActive(description)} >
                <Text style={[styles.captionItemText, isActive ? styles.captionItemTextActive : null]}>{description}</Text>
            </TouchableOpacity>
        )
    }

    const renderItems = () => {
        return categorias.map(categoria => (
            <View id={categoria.id.toString()} style={styles.categoryItem} >
                <View style={styles.iconCircle}>
                    <Ionicons name={categoria.iconName} size={24} color="black" />
                </View>
                <Text style={styles.categoryItemTitle}>{categoria.description}</Text>
                <Ionicons name='ellipsis-vertical-outline' size={24} color="black" />
            </View>
        ))
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <ButtonIconSimple iconName='arrow-back' onPress={() => navigation.goBack()} style={styles.buttonBack}/>
            <SearchInput placeholder='Pesquisar categoria...' />
            <View style={styles.captions}>
                {renderCaptionItem('Receitas')}
                {renderCaptionItem('Despesas')}
                {renderCaptionItem('Transferências')}
            </View>
            <View style={styles.containerItems}>
                {renderItems()}
            </View>
            <CircularActionButton onPress={() => setShowModalCategory(true)}/>
            <ModalCategory isShow={showModalCategory} onClose={() => setShowModalCategory(false)} mode='add'/>
        </View>
    );
}