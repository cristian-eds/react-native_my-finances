import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        rowGap: 5,
    },
    label: {
        fontSize: 18,
        paddingLeft: 8
    },
    input: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});