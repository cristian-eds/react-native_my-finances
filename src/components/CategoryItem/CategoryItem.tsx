import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './CategoryItemStyles';
import { Ionicons } from '@expo/vector-icons';
import { CategoryModel } from '../../domain/categoryModel';
import { ModalCategory } from '../modals/ModalCategory/ModalCategory';

interface CategoryItemProps {
    category: CategoryModel
}

export function CategoryItem({category}: CategoryItemProps) {

    const [showModalCategory, setShowModalCategory] = useState(false);

    return (
        <TouchableOpacity style={styles.categoryItem} onPress={() => setShowModalCategory(true)}>
            <View style={[styles.iconCircle, { backgroundColor: `${category.hexColor}` }]}>
                <Ionicons name={category.iconName} size={24} color="white" />
            </View>
            <Text style={styles.categoryItemTitle}>{category.description}</Text>
            <Ionicons name='ellipsis-vertical-outline' size={24} color="black" />
            <ModalCategory isShow={showModalCategory} onClose={() => setShowModalCategory(false)} mode='edit' categoryData={category}/>
        </TouchableOpacity>
    );
}