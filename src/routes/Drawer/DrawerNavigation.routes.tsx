import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native";
import { useUserContext } from "../../hooks/useUserContext";
import { CustomDrawerContent } from "./CustomDrawerContent/CustomDrawerContent";
import { PrincipalStackNavigationRoutes } from "../Stack/PrincipalStack/PrincipalStackNavigation.routes";

const Drawer = createDrawerNavigator();

export const DrawerNagivationRoutes = () => {

    const context = useUserContext()

    return (
        <Drawer.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerRight: () => <Button onPress={context.logout} title="Sair"></Button>,
            drawerStyle: { height: '80%', marginTop: 75 },
            title: ""
        }}
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