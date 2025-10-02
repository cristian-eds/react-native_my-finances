import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',  
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container_content: {
        width: '85%',
        height: 200,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    }
});