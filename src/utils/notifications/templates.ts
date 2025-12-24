import { DuplicateModel } from "../../domain/duplicateModel";
import { formaterNumberToBRL } from "../NumberFormater";
import * as Notifications from 'expo-notifications';

export async function scheduleDuplicateNotification(duplicate: DuplicateModel) {
    const alertDate = new Date(duplicate.dueDate);
    alertDate.setHours(0);
    alertDate.setMinutes(55);
    alertDate.setSeconds(0);

    console.log(alertDate)

    try {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Vencimento de Conta! 💸",
                body: `Sua conta ${duplicate.description} de ${formaterNumberToBRL(duplicate.totalValue)} vence hoje. Não esqueça de pagar!`,
                data: { idConta: duplicate.id, tipo: 'Duplicate' },
                sound: true,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: alertDate
            }
        });
        return id;
    } catch (error) {
        console.log(error)
    }

    
}