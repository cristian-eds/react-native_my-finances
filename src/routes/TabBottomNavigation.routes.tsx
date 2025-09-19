import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerStyle: { borderBottomLeftRadius: 20, borderBottomStartRadius: 20 },
                      headerTitleAlign: 'center',
                 }} 
      >
      <Tab.Screen
        name="Lançamentos"
        component={HomeScreen} />
      <Tab.Screen
        name="Home"
        component={HomeScreen} />
      <Tab.Screen
        name="Finanças"
        component={HomeScreen} />
    </Tab.Navigator>
  );
} 
