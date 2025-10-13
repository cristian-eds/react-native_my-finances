import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { Ionicons } from "@expo/vector-icons";

import {styles} from './TabBottomNavigationStyles'

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if(route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Financas') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Lancamentos') {
            iconName = 'swap-horizontal';
          }
          return <Ionicons name={iconName} size={24} color={color}/>
        }
       
      })}
    >
      <Tab.Screen
        name="Lancamentos"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Financas"
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
} 
