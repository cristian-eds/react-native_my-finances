import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#63636345'
    },
    container_content: {
        width: '98%',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#9d9d9dff',
        marginBottom: 10,
        paddingBottom: 7
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    inputs:{
        rowGap: 5
    },
    buttons_footer: {
        marginTop: 30,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    rightSpacer: {
        width: '20%'
    }
})

export { styles }