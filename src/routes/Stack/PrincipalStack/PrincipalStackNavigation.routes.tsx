
import { AccountDetails } from "../../../screens/AccountDetails/AccountDetailsScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrincipalStackParamList } from "../types/PrincipalStackParamList";
import { TabBottomNavigationRoutes } from "../../TabBottom/TabBottomNavigation.routes";
import { CategoriesScreen } from "../../../screens/Categories/CategoriesScreen";
import { TransactionStatistics } from "../../../screens/TransactionStatistics/TransactionStatisticsScreen";
import { PerfilScreen } from "../../../screens/Perfil/PerfilScreen";
import { Configuration } from "../../../screens/Configuration/ConfigurationScreen";


const Stack = createNativeStackNavigator<PrincipalStackParamList>();

export function PrincipalStackNavigationRoutes() {
    return (
        <Stack.Navigator 
            screenOptions={
            {headerShown: false}} 
            initialRouteName="Main">
            <Stack.Screen name="Main" component={TabBottomNavigationRoutes}/>
            <Stack.Screen name="AccountDetails" component={AccountDetails} />
            <Stack.Screen name="Categories" component={CategoriesScreen}/>
            <Stack.Screen name="TransactionStatistics" component={TransactionStatistics}/>
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Config" component={Configuration} />
        </Stack.Navigator>
    )
}