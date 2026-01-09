import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderWidth: 0,
    },
    dropDownStyle: {
        borderWidth: 0,
        height: 45,
        minHeight: 45,
        marginVertical: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    dropDownContainerStyle: {
        borderWidth: 0,
        elevation: 3,
        borderRadius: 10,
    },
    labelStyle: {
        textAlign: 'right',
        fontSize: 14,
        fontWeight: '500',
        flex: 0
    }
});