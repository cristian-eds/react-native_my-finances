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
        alignItems: 'center',
        borderBottomWidth: 0.6,
        borderBottomColor: '#cdcdcdde',
        marginBottom: 10,
        paddingBottom: 7
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    inputs: {
        rowGap: 10
    },
    inputsTitle: {
        fontSize: 13,
        fontWeight: "600",
        paddingLeft: 5,
        marginTop: 7
    },
    showMore: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    showMoreText: {
        fontStyle: "italic",
        color: '#000925ff'
    },
    buttons_footer: {
        borderTopWidth: 0.5,
        borderTopColor: '#cdcdcdde',
        paddingTop: 20,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    rightSpacer: {
        width: '20%'
    }
})

export { styles }