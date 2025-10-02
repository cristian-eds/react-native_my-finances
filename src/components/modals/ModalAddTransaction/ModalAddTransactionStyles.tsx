import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container_content: {
        width: '98%',
        height: '95%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
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
    buttons_footer: {
        justifyContent: 'center',
        flex:1
    }
});