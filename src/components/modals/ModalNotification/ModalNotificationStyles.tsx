import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    body: {
        rowGap: 10,
        borderRadius: 12,
        borderWidth: 0.2,
        borderColor: '#969696ff',
        paddingHorizontal: 6,
        paddingVertical: 10
    },
    item: {
        minHeight: 30
    },
    itemText: {
        fontSize: 14,
        fontWeight: '500',
        flex: 3
    },
    itemValue: {
        borderRadius: 12,
        borderWidth: 0.2,
        borderColor: '#969696ff',
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 7
    }
});