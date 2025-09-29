import { createStackNavigator } from "@react-navigation/stack";
import { TabBottomNavigationRoutes } from "./TabBottomNavigation.routes";
import { AccountDetails } from "../screens/AccountDetails/AccountDetailsScreen";
import { PrincipalStackParamList } from "./types/PrincipalStackParamList";


const Stack = createStackNavigator<PrincipalStackParamList>();

export function PrincipalStackNavigationRoutes() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={TabBottomNavigationRoutes}/>
            <Stack.Screen name="AccountDetails" component={AccountDetails} options={{
                headerShown: true,
            }}/>
        </Stack.Navigator>
    )
}