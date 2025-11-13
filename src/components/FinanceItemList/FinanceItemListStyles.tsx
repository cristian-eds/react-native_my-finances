import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1ff',
        elevation: 2,
        borderRadius: 10,
        paddingHorizontal: 17,
        paddingVertical: 12,
        gap: 12,
        marginBottom: 15
    },
    status: {
        width: 80,
        paddingVertical: 4,
        borderRadius: 10
    },
    statusText: {
        textAlign: 'center',
        fontSize: 12
    },
    payButton: {
        backgroundColor: '#a6c2e6d8',
        width: 120,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2
    },
    payButtonText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500'
    }
});