import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#63636345'
    },
    containerContent: {
        width: '98%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        rowGap: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#9d9d9dff',
        paddingBottom: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    rightSpacer: {
        width: '20%'
    },
    buttons_footer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});