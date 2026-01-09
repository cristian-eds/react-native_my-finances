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
        borderRadius: 5,
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
    item: {
        minHeight: 30
    },
    itemText: {
        fontSize: 14,
        fontWeight: '500',
        flex: 3
    },
});