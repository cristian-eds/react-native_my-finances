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
    labelTopLine: {
        fontSize: 12,
        color: '#373737b6',
        position: 'absolute',
        top: -8,
        left: 15,
        backgroundColor: 'white',
        zIndex: 1000,
        fontStyle: 'italic',
        paddingHorizontal: 4
    },
    input: {
        borderWidth: 1,
        borderColor: '#8989899f',
        padding: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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