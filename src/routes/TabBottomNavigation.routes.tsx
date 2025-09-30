import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { Button, Text} from "react-native";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { styles } from './TabBottomNavigationStyles';
import { ButtonIconTab } from "../components/buttons/ButtonIconTab/ButtonIconTab";

const Tab = createBottomTabNavigator();

export function TabBottomNavigationRoutes() {

  const context = useContext(UserContext);

  const renderTextLabel = (focused: boolean, title: string) => {
    return (<Text style={[styles.label, focused && {fontSize: 12}]}>{title}</Text>)
  }

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
          justifyContent: 'center',
          gap: 0
        },
      }}
    >
      <Tab.Screen
        name="Lançamentos"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <ButtonIconTab focused={focused} iconName="compare-arrows" />,
          tabBarLabel: ({ focused }) => renderTextLabel(focused, "Lançamentos"),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <ButtonIconTab focused={focused} iconName="home"/>,
          tabBarLabel: ({ focused }) => renderTextLabel(focused, "Home"),
          title: ""
        }}
      />
      <Tab.Screen
        name="Finanças"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <ButtonIconTab focused={focused} iconName="attach-money"/>,
          tabBarLabel: ({ focused }) => renderTextLabel(focused, "Finanças"),
        }}
      />
    </Tab.Navigator>
  );
} 
