import * as Notifications from 'expo-notifications';

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
        alert('Precisamos de permissão para enviar notificações!');
    }
}

export const notify = (content: Notifications.NotificationContentInput, trigger: Notifications.NotificationTriggerInput) => Notifications.scheduleNotificationAsync({
    content,
    trigger
});