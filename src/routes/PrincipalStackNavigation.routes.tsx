import { createStackNavigator } from "@react-navigation/stack";
import { TabBottomNavigationRoutes } from "./TabBottomNavigation.routes";


const Stack = createStackNavigator();

export function PrincipalStackNavigationRoutes() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={TabBottomNavigationRoutes}/>
        </Stack.Navigator>
    )
}