import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const setHandler = () => Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permissões de notificações não concedidas!');
        await Notifications.requestPermissionsAsync();
    }
}

export const notify = (content: Notifications.NotificationContentInput, trigger: Notifications.NotificationTriggerInput) => Notifications.scheduleNotificationAsync({
    content,
    trigger
});