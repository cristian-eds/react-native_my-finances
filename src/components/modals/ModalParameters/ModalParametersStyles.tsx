import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    section: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 13,
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        fontStyle: 'italic'
    },  
    itemText: {
        fontSize: 14,
        fontWeight: '500',
    },
});