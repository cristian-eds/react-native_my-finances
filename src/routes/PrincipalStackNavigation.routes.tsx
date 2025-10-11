import { TabBottomNavigationRoutes } from "./TabBottomNavigation.routes";
import { AccountDetails } from "../screens/AccountDetails/AccountDetailsScreen";
import { PrincipalStackParamList } from "./types/PrincipalStackParamList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator<PrincipalStackParamList>();

export function PrincipalStackNavigationRoutes() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Main">
            <Stack.Screen name="Main" component={TabBottomNavigationRoutes}/>
            <Stack.Screen name="AccountDetails" component={AccountDetails} options={{
                headerShown: true,
                title: 'Detalhes da Conta',
            }}/>
        </Stack.Navigator>
    )
}