import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./CustomDrawerContent/CustomDrawerContent";
import { PrincipalStackNavigationRoutes } from "../Stack/PrincipalStack/PrincipalStackNavigation.routes";
import Logo from '../../../assets/logo.png'

import { Image } from "react-native";

const Drawer = createDrawerNavigator();

export const DrawerNagivationRoutes = () => {

    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerTitleAlign: 'center',
                drawerStyle: { height: '80%', marginTop: 75 },
                title: "",
                headerTitleStyle: {fontSize: 20},
                headerRightContainerStyle: { paddingRight: 20, paddingTop: 5 },
                headerLeftContainerStyle: { paddingLeft: 5 },
                headerRight: () => <Image source={Logo} style={{width:80, height: 35}}/>,
                headerStyle: {
                    backgroundColor: '#03305D'
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