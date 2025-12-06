import React from 'react';
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './TabRecurrenceStyles';
import { TextInputWithTopLabel } from '../../../TextInputWithTopLabel/TextInputWithTopLabel';
import { TypeRecurrence } from '../../../../domain/enums/typeRecurrence';
import { RowWithTopLabel } from '../../../RowWithTopLabel/RowWithTopLabel';
import { Checkbox } from '../../../Checkbox/Checkbox';
import { TouchableOpacity } from 'react-native';
import { ModalInstallments } from '../../ModalInstallments/ModalInstallments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { installmentsSchemas } from '../../../../utils/schemas/installmentsSchemas';
import { DuplicateModel } from '../../../../domain/duplicateModel';
import { Row } from '../../../structure/Row/Row';
import { Cell } from '../../../structure/Cell/Cell';
import { ButtonIconSimple } from '../../../buttons/ButtonIconSimple/ButtonIconSimple';

interface TabRecurrenceProps {
    data: Omit<DuplicateModel, 'id'>;
    onClose: () => void
}

export function TabRecurrence({ data, onClose }: TabRecurrenceProps) {

    const [showModalInstallments, setShowModalInstallments] = React.useState(false);

    const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm({
        resolver: zodResolver(installmentsSchemas),
        defaultValues: {
            numberInstallments: data.numberInstallments.toLocaleString(),
            typeRecurrence: TypeRecurrence.Fixo,
            intervalBetweenInstallments: 30,
            fixedInstallmentDate: new Date(data.dueDate as Date).getDate().toLocaleString(),
        }
    });

    const handleGenerateInstallments = () => {
        let items = [];
        const activeTypeRecurrence = watch().typeRecurrence;
        const fields = watch();
        if (activeTypeRecurrence === TypeRecurrence.Fixo) {
            for (let i = 1; i < Number(fields.numberInstallments) + 1; i++) {
                items.push({
                    id: 0,
                    sequencyItem: i,
                    dueDate: generateFixedDueDate(i),
                    value: Number(data.totalValue),
                    description: data.description + ` - ${i}/${fields.numberInstallments}`
                });
            }
        }
        else if (activeTypeRecurrence === TypeRecurrence.Intervalo) {
            const intervalDays = fields.intervalBetweenInstallments || 30;
            for (let i = 1; i < Number(fields.numberInstallments) + 1; i++) {
                items.push({
                    id: 0,
                    sequencyItem: i,
                    dueDate: new Date(new Date(data.issueDate as Date).getTime() + (i * Number(intervalDays) * 24 * 60 * 60 * 1000)),
                    value: Number(data.totalValue),
                    description: data.description + ` ${i}/${fields.numberInstallments}`
                });
            }
        }
        return items;
    }

    const generateFixedDueDate = (index: number) => {
        const fixedDate = watch().fixedInstallmentDate;
        const year = new Date(data.issueDate as Date).getFullYear();
        const month = new Date(data.issueDate as Date).getMonth() + index;
        if (new Date(year, month, fixedDate as number).getDate() !== Number(fixedDate)) {
            return new Date(year, month + 1, 0);
        }
        return new Date(new Date(data.issueDate as Date).getFullYear(), new Date(data.issueDate as Date).getMonth() + index, fixedDate as number);
    }

    const renderControlInstallments = (field: 'numberInstallments' | 'intervalBetweenInstallments' | 'fixedInstallmentDate') => {
        return (
            <Row style={{ justifyContent: 'space-around' }}>
                <ButtonIconSimple iconName='remove' sizeIcon={20} style={styles.iconButtonRounded} onPress={() => updateInstallments('decrease', field)} />
                <ButtonIconSimple iconName='add' sizeIcon={20} style={[styles.iconButtonRounded, { backgroundColor: '#77d05fff' }]} onPress={() => updateInstallments('increase', field)} />
            </Row>
        )
    }

    const updateInstallments = (type: 'increase' | 'decrease', field: 'numberInstallments' | 'intervalBetweenInstallments' | 'fixedInstallmentDate') => {
        const values = watch();
        const currentValue = Number(values[field]) || 0;
        if (type === 'increase') {
            setValue(field, (currentValue + 1).toString());
        } else {
            if (currentValue > 1) {
                setValue(field, (currentValue - 1).toString());
            }
        }
    }

    const renderTypeRecurrenceItem = (title: string, subtitle: string, type: TypeRecurrence) => {
        const activeTypeRecurrence = watch().typeRecurrence;
        return (
            <RowWithTopLabel title='Tipo da recorrência' errors={errors.typeRecurrence} stylesProp={{ justifyContent: 'flex-start', columnGap: 10 }}>
                <Checkbox checked={type === activeTypeRecurrence} />
                <TouchableOpacity onPress={() => setValue('typeRecurrence', type)}>
                    <Text>{title}</Text>
                    <Text style={{ fontSize: 12, color: '#7b7b7bff' }}>{subtitle}</Text>
                </TouchableOpacity>
            </RowWithTopLabel>
        )
    }

    return (
        <>
            <Row>
                <Cell flex={3}>
                    <TextInputWithTopLabel title='Número de Parcelas' control={control} name='numberInstallments' errors={errors.numberInstallments} placeholder='Quantidade de parcelas' keyboardType='number-pad' required />
                </Cell>
                <Cell flex={1}>
                    {renderControlInstallments('numberInstallments')}
                </Cell>
            </Row>
            <View style={{ rowGap: 10, marginTop: 5 }}>
                <Text>Tipo de Recorrência</Text>
                {renderTypeRecurrenceItem('Dia Fixo', 'Vence no mesmo dia em todos os meses.', TypeRecurrence.Fixo)}
                {renderTypeRecurrenceItem('Intervalo de dias', 'Número de dias entre cada parcela.', TypeRecurrence.Intervalo)}
            </View>
            <View style={{ rowGap: 14, marginTop: 5 }}>
                {watch().typeRecurrence === TypeRecurrence.Fixo ?
                    <>
                        <Text>Dia do vencimento</Text>
                        <Row>
                            <Cell flex={3}>
                                <TextInputWithTopLabel title='Dia do mês' control={control} name='fixedInstallmentDate' errors={errors.fixedInstallmentDate} placeholder='Informe o dia do mês' keyboardType='number-pad' required />
                            </Cell>
                            <Cell flex={1}>
                                {renderControlInstallments('fixedInstallmentDate')}
                            </Cell>
                        </Row>
                    </> :
                    <>
                        <Text>Dias entre parcelas</Text>
                        <Row>
                            <Cell flex={3}>
                                <TextInputWithTopLabel title='Intervalo de dias' control={control} name='intervalBetweenInstallments' errors={errors.intervalBetweenInstallments} placeholder='Informe o intervalo de dias' keyboardType='number-pad' required />
                            </Cell>
                            <Cell flex={1}>
                                {renderControlInstallments('intervalBetweenInstallments')}
                            </Cell> 
                        </Row>
                    </>
                }
            </View>
            <TouchableOpacity style={styles.buttonInstallmentsPreview} onPress={() => setShowModalInstallments(true)}>
                <Ionicons name="calendar-clear-outline" size={18} color="black" />
                <Text>Ver pré-visualização das parcelas</Text>
            </TouchableOpacity>
            {showModalInstallments && <ModalInstallments isShow={showModalInstallments} items={handleGenerateInstallments()} onClose={() => setShowModalInstallments(false)} data={data} onCreateInstallments={onClose} />}
        </>
    );
}