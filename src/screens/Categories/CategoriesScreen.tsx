import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
import { capitalizeWord } from '../../utils/StringFormater';
import { ButtonBack } from '../../components/buttons/ButtonBack/ButtonBack';

export function CategoriesScreen() {

    const navigation = useNavigation();
    const { categories, fetchCategories } = useCategoryStore();
    const database = useSQLiteContext();
    const { user } = useUserContext();

    const [search, setSearch] = useState("");
    const [captionActive, setCaptionActive] = useState("");
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
                await fetchCategories(user.id, database,search);
            }
        }

        fetch();
    }, [user,search])

    

    const renderCaptionItem = (description: string) => {
        const isActive = description === captionActive;
        return (
            <TouchableOpacity key={description} style={[styles.captionItem, isActive ? styles.captionItemActive : null]} onPress={() => handleCaptionActive(description)} >
                <Text style={[styles.captionItemText, isActive ? styles.captionItemTextActive : null]}>{capitalizeWord(description)}</Text>
            </TouchableOpacity>
        )
    }

    const renderItems = () => {
        return categories.map(category => ( <CategoryItem  key={category.id} category={category}/> ))
    }

    const handleCaptionActive = (caption: string) => {
        setCaptionActive(prevCaption => {
            if(prevCaption === caption) {
                return "";
            }
            return caption;
        })
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <ButtonBack onPress={() => navigation.goBack()}/>
            <SearchInput placeholder='Pesquisar categoria...' value={search} onChangeText={(e) => setSearch(e)}/>

            <ScrollView contentContainerStyle={styles.containerItems}>
                {renderItems()}
            </ScrollView>
            <CircularActionButton onPress={() => setShowModalCategory(true)} style={{bottom: '10%'}} />
            <ModalCategory isShow={showModalCategory} onClose={() => setShowModalCategory(false)} mode='add' />
        </View>
    );
}