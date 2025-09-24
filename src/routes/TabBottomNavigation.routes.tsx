import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { Button } from "react-native";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {

  const context = useContext(UserContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerStyle: { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
                      headerTitleAlign: 'center',
                      headerRight: () => <Button onPress={context?.logout} title="Logou"></Button>
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
