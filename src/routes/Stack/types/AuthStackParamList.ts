import { User } from "../../../domain/userModel";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterInitialAccount: {user: Omit<User,"password"> };
  WelcomeRegister: undefined;
  ForgotPassword: undefined
};
