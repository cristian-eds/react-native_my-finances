import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 20,
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: '#cdcdcdff',
        height: 60,
        width: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    avatarText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    avatarSubText: {
        fontSize: 14
    },
    buttonExit: {
        backgroundColor: '#f74141ff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#b70000ff',
        paddingVertical: 8,
        marginBottom: 50
    }
});