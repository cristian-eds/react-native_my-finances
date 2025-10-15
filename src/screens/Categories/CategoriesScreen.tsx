import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './CategoriesScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { ButtonIconSimple } from '../../components/buttons/ButtonIconSimple/ButtonIconSimple';

import { SearchInput } from '../../components/SearchInput/SearchInput';
import { CircularActionButton } from '../../components/buttons/CircularActionButton/CircularActionButton';
import { ModalCategory } from '../../components/modals/ModalCategory/ModalCategory';
import { useCategoryStore } from '../../stores/CategoryStore';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserContext } from '../../hooks/useUserContext';
import { CategoryItem } from '../../components/CategoryItem/CategoryItem';

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
        return categories.map(category => ( <CategoryItem category={category}/> ))
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