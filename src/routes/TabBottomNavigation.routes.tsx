import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { Button, Text, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {

  const context = useContext(UserContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
        headerTitleAlign: 'center',
        headerRight: () => <Button onPress={context?.logout} title="Logout"></Button>,
        tabBarStyle: { borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 105 },

      }}
    >
      <Tab.Screen
        name="Lançamentos"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name="compare-arrows" size={focused ? 28 : 24} color="black" />
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <View style={{backgroundColor: 'red', width:75, height: 75, alignItems:'center', justifyContent: 'center', borderRadius: 30}}>
            <MaterialIcons name="home" size={focused ? 28 : 24} color="black" />
          </View>,
          tabBarLabelStyle: { color: 'black' }
        }}
      />
      <Tab.Screen
        name="Finanças"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name="attach-money" size={focused ? 28 : 24} color="black" />
        }}
      />
    </Tab.Navigator>
  );
} 
