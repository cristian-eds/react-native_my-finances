import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "../../screens/Home/HomeScreen";
import { styles } from "./TabBottomNavigationStyles";

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#01144dd5',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if(route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Financas') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Transacoes') {
            iconName = 'swap-horizontal';
          }
          return <Ionicons name={iconName} size={24} color={color}/>
        }
       
      })}
    >
      <Tab.Screen
        name="Transacoes"
        component={HomeScreen}
        options={{title: 'Transações'}}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Financas"
        component={HomeScreen}
        options={{title: 'Finanças'}}
      />
    </Tab.Navigator>
  );
} 
