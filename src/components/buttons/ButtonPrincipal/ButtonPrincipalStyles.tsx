import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container_button: {
        width: '70%',
        backgroundColor: '#ffffffff',
        elevation: 2,
        marginHorizontal: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 5,
        borderColor: '#79a8ff',
        borderWidth: 0.3
    },
    containerButtonConfirm: {
        backgroundColor: '#6886be',
        borderColor: '#1a3f85'
    },
    text_button: {
        fontSize: 18
    },
    textButtonConfirm: {
        color: '#fff',
        fontWeight: 'bold'
    }
});