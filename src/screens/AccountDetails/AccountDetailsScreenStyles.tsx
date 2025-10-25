import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    containerBack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 5,
    },
    title_account: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    containerContent: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 15,
        borderRadius: 8,
        marginVertical: 9
    }

});