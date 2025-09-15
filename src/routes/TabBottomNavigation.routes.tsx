import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={() => null} />
      <Tab.Screen name="Settings" component={() => null} />
    </Tab.Navigator>
  );
} 
