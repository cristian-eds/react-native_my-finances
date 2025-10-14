import React from 'react';
import { Modal, Text, View } from 'react-native';

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
            iconName: categoryData?.iconName ?? '',
            movementType: categoryData?.movementType ?? MovementType.Despesa
        }
    });

    const movementTypeItems = Object.keys(MovementType).map((text) => { return { label: text, value: MovementType[text as keyof typeof MovementType] } })

    return (
        <Modal
            visible={isShow}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.container_content}>
                    <View style={styles.header}>
                        <ButtonIconSimple iconName='arrow-back' onPress={onClose} style={{ width: '15%' }} />
                        <Text style={styles.title}>{mode === 'add' ? 'Nova Categoria' : 'Editar Categoria'}</Text>
                        <View style={styles.rightSpacer}></View>
                    </View>
                    <View style={{ rowGap: 10 }}>
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Insira uma descrição' required />
                        <PickerWithTopLabel control={control} name='movementType' errors={errors.movementType} labelText='Tipo Movimento' items={movementTypeItems} />
                        <PickerWithTopLabel control={control} name='iconName' errors={errors.iconName} labelText='Icone' items={iconsOptions} />
                        <PickerWithTopLabel control={control} name='hexColor' errors={errors.iconName} labelText='Icone' items={hexColorOptions} />
                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' />
                    </View>
                </View>
            </View>
        </Modal>
    );
}