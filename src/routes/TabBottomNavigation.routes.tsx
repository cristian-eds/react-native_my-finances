import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { Button, Text, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './TabBottomNavigationStyles';

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
        tabBarStyle: { 
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20, 
          height: 102,
          width: "100%",
          flexDirection: 'row',
          justifyContent: 'center'
        },
      }}
    >
      <Tab.Screen
        name="Lançamentos"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            <View style={styles.icon_tab}>
              <MaterialIcons name="compare-arrows" size={focused ? 28 : 24} color="black" style={{ top: -10 }} />
            </View>,
          tabBarLabel: ({ focused }) => <Text style={styles.label}>Lançamentos</Text>,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            <View style={styles.icon_tab}>
              <MaterialIcons name="home" size={focused ? 28 : 24} color="black" style={{ top: -10 }} />
            </View>,
          tabBarLabel: ({ focused }) => <Text style={styles.label}>Home</Text>,
        }}
      />
      <Tab.Screen
        name="Finanças"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            <View style={styles.icon_tab}>
              <MaterialIcons name="attach-money" size={focused ? 28 : 24} color="black" style={{ top: -10 }} />
            </View>,
          tabBarLabel: ({ focused }) => <Text style={styles.label}>Finanças</Text>,
        }}
      />
    </Tab.Navigator>
  );
} 
