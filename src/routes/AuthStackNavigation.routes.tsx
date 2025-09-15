import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login/LoginScreen";
import { RegisterScreen } from "../screens/Register/RegisterScreen";

const Stack = createStackNavigator();

export function AuthStackNavigationRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={() => <LoginScreen />} />
      <Stack.Screen name="Register" component={() => <RegisterScreen />} />
    </Stack.Navigator>
  );
}