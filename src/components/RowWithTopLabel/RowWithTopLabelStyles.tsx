import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        rowGap: 5,
    },
    label: {
        fontSize: 17,
        paddingLeft: 8,
        color: '#242424e1'
    },
    input: {
        borderWidth: 1,
        borderColor: '#8989899f',
        padding: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        height: 46.9
    },
    error_message: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        right: 10,
        position: 'absolute',
        bottom: -6,
        backgroundColor: 'white',
        zIndex: 2000
    },
});