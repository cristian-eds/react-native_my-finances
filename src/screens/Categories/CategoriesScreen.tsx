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
import { useCategoryStore } from '../../stores/CategoryStore';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserContext } from '../../hooks/useUserContext';

export function CategoriesScreen() {

    const navigation = useNavigation();
    const { categories, fetchCategories } = useCategoryStore();
    const database = useSQLiteContext();
    const { user } = useUserContext();

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

    useEffect(() => {
        const fetch = async () => {
            if (user) {
                await fetchCategories(user.id, database);
            }
        }

        fetch();
    }, [user])

    const renderCaptionItem = (description: string) => {
        const isActive = description === captionActive;
        return (
            <TouchableOpacity id={description} style={[styles.captionItem, isActive ? styles.captionItemActive : null]} onPress={() => setCaptionActive(description)} >
                <Text style={[styles.captionItemText, isActive ? styles.captionItemTextActive : null]}>{description}</Text>
            </TouchableOpacity>
        )
    }

    const renderItems = () => {
        return categories.map(category => (
            <View id={category.id.toString()} style={styles.categoryItem} >
                <View style={[styles.iconCircle, { backgroundColor: `${category.hexColor}` }]}>
                    <Ionicons name={category.iconName} size={24} color="black" />
                </View>
                <Text style={styles.categoryItemTitle}>{category.description}</Text>
                <Ionicons name='ellipsis-vertical-outline' size={24} color="black" />
            </View>
        ))
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <ButtonIconSimple iconName='arrow-back' onPress={() => navigation.goBack()} style={styles.buttonBack} />
            <SearchInput placeholder='Pesquisar categoria...' />
            <View style={styles.captions}>
                {renderCaptionItem('Receitas')}
                {renderCaptionItem('Despesas')}
                {renderCaptionItem('Transferências')}
            </View>
            <View style={styles.containerItems}>
                {renderItems()}
            </View>
            <CircularActionButton onPress={() => setShowModalCategory(true)} />
            <ModalCategory isShow={showModalCategory} onClose={() => setShowModalCategory(false)} mode='add' />
        </View>
    );
}