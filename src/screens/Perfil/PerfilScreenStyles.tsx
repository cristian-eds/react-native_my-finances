import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        height: 150,
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
    section: {
        backgroundColor: '#ffffffff',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        rowGap: 15,
        marginBottom: 10
    },
    inputsTitle: {
        fontSize: 16,
        fontWeight: "600",
        paddingLeft: 5,
    },
    sectionItemText: {
        fontSize: 16
    },
    sectionItemSubText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#6c6c6cff'
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