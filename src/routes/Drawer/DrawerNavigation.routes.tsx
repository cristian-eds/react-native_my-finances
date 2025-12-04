import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./CustomDrawerContent/CustomDrawerContent";
import { PrincipalStackNavigationRoutes } from "../Stack/PrincipalStack/PrincipalStackNavigation.routes";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export const DrawerNagivationRoutes = () => {

    return (
        <Drawer.Navigator
            screenOptions={({navigation}) => ({
                headerTitleAlign: 'center',
                drawerStyle: { height: '80%', marginTop: 75 },
                title: "",
                headerRightContainerStyle: { paddingRight: 20, paddingTop: 5 },
                headerLeftContainerStyle: { paddingLeft: 5 },
                headerRight: () => <Ionicons name="person-outline" size={24} color="white" onPress={() => navigation.navigate('PrincipalStack', { screen: 'Perfil' })}/>,
                headerStyle: {
                    backgroundColor: '#01144dd5'
                },
                headerTintColor: '#fff',
            })}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="PrincipalStack"
        >
            <Drawer.Screen
                name="PrincipalStack"
                component={PrincipalStackNavigationRoutes}
            />
        </Drawer.Navigator >
    )
}