import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={() => null} />
      <Tab.Screen name="Screen" component={() => null} />
    </Tab.Navigator>
  );
} 
