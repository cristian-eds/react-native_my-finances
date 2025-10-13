
import { AccountDetails } from "../../../screens/AccountDetails/AccountDetailsScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrincipalStackParamList } from "../types/PrincipalStackParamList";
import { TabBottomNavigationRoutes } from "../../TabBottom/TabBottomNavigation.routes";


const Stack = createNativeStackNavigator<PrincipalStackParamList>();

export function PrincipalStackNavigationRoutes() {
    return (
        <Stack.Navigator 
            screenOptions={
            {headerShown: false}} 
            initialRouteName="Main">
            <Stack.Screen name="Main" component={TabBottomNavigationRoutes}/>
            <Stack.Screen name="AccountDetails" component={AccountDetails} />
        </Stack.Navigator>
    )
}