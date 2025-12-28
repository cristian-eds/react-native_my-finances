import * as Notifications from 'expo-notifications';
import { DuplicateModel } from '../domain/duplicateModel';
import { formaterNumberToBRL } from '../utils/NumberFormater';
import { notify } from '../utils/notifications/NotificationsConfig';
import { Transaction } from '../domain/transactionModel';
import { useParameterStore } from '../stores/ParameterStore';

export async function scheduleDuplicateNotification(duplicate: DuplicateModel) {
    const alertDate = new Date(duplicate.dueDate);
    const { parameters } = useParameterStore.getState();
    
    alertDate.setHours(8);
    alertDate.setMinutes(0);
    alertDate.setSeconds(0);

    if(parameters.duplicateNotificationTime) {
        alertDate.setHours(parameters.duplicateNotificationTime.getHours());
        alertDate.setMinutes(parameters.duplicateNotificationTime.getMinutes());
    }

    console.log('Agendando notificação para:', alertDate);

    try {
        const id = await notify(
            {
                title: "Vencimento de Conta! 💸",
                body: `Sua conta ${duplicate.description} de ${formaterNumberToBRL(duplicate.totalValue)} vence hoje. Não esqueça de pagar!`,
                data: { idConta: duplicate.id, tipo: 'Duplicate' },
                sound: true,
            },
            {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: alertDate
            }
        );
        return id;
    } catch (error) {
        console.error(error)
        return null;
    }
}

export async function notifyTransactionNotification(transaction: Transaction) {

    try {
        await notify({
            title: 'Nova transação registrada!',
            body: `Transação ${transaction.description} de ${formaterNumberToBRL(transaction.value)} na data ${transaction.paymentDate.toLocaleDateString()}`
        },
            null
        )
    } catch (error) {
        console.error(error)
    }

}