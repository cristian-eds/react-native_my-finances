import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login/LoginScreen";
import { RegisterScreen } from "../screens/Register/RegisterScreen";
import { RegisterInitialAccountScreen } from "../screens/RegisterInitialAccount/RegisterInitialAccountScreen";

const Stack = createStackNavigator();

export function AuthStackNavigationRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={() => <LoginScreen />} />
      <Stack.Screen name="Register" component={() => <RegisterScreen />} />
      <Stack.Screen name="RegisterInitialAccount" component={() => <RegisterInitialAccountScreen />} />
    </Stack.Navigator>
  );
}