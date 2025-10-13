import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../../screens/Login/LoginScreen";
import { RegisterScreen } from "../../../screens/Register/RegisterScreen";
import { RegisterInitialAccountScreen } from "../../../screens/RegisterInitialAccount/RegisterInitialAccountScreen";
import { WelcomeRegisterScreen } from "../../../screens/WelcomeRegister/WelcomeRegisterScreen";
import { AuthStackParamList } from "../types/AuthStackParamList";

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthStackNavigationRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterInitialAccount" component={RegisterInitialAccountScreen} />
      <Stack.Screen name="WelcomeRegister" component={WelcomeRegisterScreen} />
    </Stack.Navigator>
  );
}