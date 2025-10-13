import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    containerBack: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    containerBackText: {
        fontSize: 20
    },
    containerBackIconButton: {
        backgroundColor: 'transparent'
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
    title_section: {
        fontSize: 20,
        paddingLeft:5,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});