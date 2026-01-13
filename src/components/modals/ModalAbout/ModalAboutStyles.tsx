import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },

    textTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    textAbout: {
        fontSize: 14,
        textAlign: 'justify',
    },
    version: {
        fontSize: 13,
        textAlign: 'right',
        marginTop: 10,
        color: 'gray',
    },
    buttonTerms: {
        marginTop: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#1f610d',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        columnGap: 6,
        alignItems: 'center',
    },
    buttonTermsText: {
        color: '#33911a',
        fontSize: 14,
    },
        
    
});