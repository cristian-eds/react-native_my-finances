import React, { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import { styles } from './ModalCategoryStyles';
import { ButtonIconSimple } from '../../buttons/ButtonIconSimple/ButtonIconSimple';
import { TextInputWithTopLabel } from '../../TextInputWithTopLabel/TextInputWithTopLabel';
import { CategoryModel } from '../../../domain/categoryModel';
import { MovementType } from '../../../domain/enums/movementTypeEnum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { categorySchemas } from '../../../schemas/categorySchemas';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { iconsOptions } from '../../../utils/IconOptions';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { hexColorOptions } from '../../../utils/HexColorOptions';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';
import { ModalConfirm } from '../ModalConfirm/ModalConfirm';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';


interface ModalCategoryProps {
    isShow: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    categoryData?: CategoryModel
}

export function ModalCategory({ isShow, onClose, mode, categoryData }: ModalCategoryProps) {

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(categorySchemas),
        defaultValues: {
            description: categoryData?.description ?? '',
            hexColor: categoryData?.hexColor ?? '',
            iconName: categoryData?.iconName ?? undefined,
            movementType: categoryData?.movementType ?? MovementType.Despesa
        }
    });

    const { createCategory, updateCategory, deleteCategory } = useCategoryStore();
    const { user } = useUserContext();
    const database = useSQLiteContext();

    const [showModalDelete, setShowModalDelete] = useState(false);

    const movementTypeItems = Object.keys(MovementType).map((text) => { return { label: text, value: MovementType[text as keyof typeof MovementType] } })

    const handleConfirm = async () => {
        const formValues = watch();
        const newCategory: CategoryModel = {
            description: formValues.description,
            hexColor: formValues.hexColor,
            iconName: formValues.iconName as keyof typeof Ionicons.glyphMap,
            movementType: formValues.movementType,
            id: categoryData ? categoryData.id : 0
        }

        if (mode === 'add') {
            const insertedId = await createCategory(user?.id as number, newCategory, database);
            if (insertedId) {
                Alert.alert("Categoria cadastrado com sucesso!");
                handleClose();
            }
        } else if (mode === 'edit') {
            const updated = await updateCategory(newCategory, database);
            if (updated) {
                Alert.alert("Categoria atualizada com sucesso!");
                handleClose();
            }
        }
    }

    const handleDelete = async () => {
        if(!categoryData) return;
        const deleted = await deleteCategory(categoryData?.id, database);
        if(deleted) {
            Alert.alert("Categoria deletada com sucesso!");
            setShowModalDelete(false);
            handleClose();
        }
    }

    const handleClose = () => {
        reset();
        onClose();
    }

    return (
        <Modal
            visible={isShow}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.container_content}>
                    <View style={styles.header}>
                        <ButtonBack onPress={handleClose}/>
                        <Text style={styles.title}>{mode === 'add' ? 'Nova Categoria' : 'Editar Categoria'}</Text>
                        {mode === 'edit' ?
                            <ButtonIconSimple iconName='trash-outline' onPress={() => setShowModalDelete(true)} style={{ width: '15%', alignItems: "flex-end" }} /> :
                            <View style={styles.rightSpacer}></View>}
                    </View>
                    <View style={{ rowGap: 10 }}>
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Insira uma descrição' required />
                        <PickerWithTopLabel control={control} name='movementType' errors={errors.movementType} labelText='Tipo Movimento' items={movementTypeItems} zIndex={40000} />
                        <PickerWithTopLabel control={control} name='iconName' errors={errors.iconName} labelText='Icone' items={iconsOptions} zIndex={3000} />
                        <PickerWithTopLabel control={control} name='hexColor' errors={errors.iconName} labelText='Cor' items={hexColorOptions} zIndex={2000} />
                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={handleClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleConfirm)} />
                    </View>
                </View>
            </View>
            <ModalConfirm isShow={showModalDelete} onClose={() => setShowModalDelete(false)} title='Confirma a exclusão da categoria?' onConfirm={handleDelete}/>
        </Modal>
    );
}