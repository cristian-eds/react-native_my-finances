import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabBottomNavigationRoutes } from "../TabBottomNavigation.routes";
import { Button } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useUserContext } from "../../hooks/useUserContext";
import { CustomDrawerContent } from "./CustomDrawerContent/CustomDrawerContent";
import { HomeScreen } from "../../screens/Home/HomeScreen";
import { PrincipalStackNavigationRoutes } from "../PrincipalStackNavigation.routes";


const Drawer = createDrawerNavigator();

export const DrawerNagivationRoutes = () => {

    const context = useUserContext()

    return (
        <Drawer.Navigator screenOptions={{
                headerTitleAlign: 'center',
                headerRight: () => <Button onPress={context.logout} title="Logout"></Button>,
                drawerStyle: {height: '80%', marginTop: 75}
            }}
            drawerContent={(props) => <CustomDrawerContent {...props}/>}
            >
            <Drawer.Screen name="PrincipalStak" component={PrincipalStackNavigationRoutes}/>
        </Drawer.Navigator >
    )
}