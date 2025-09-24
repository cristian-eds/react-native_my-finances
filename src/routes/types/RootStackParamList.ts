import { User } from "../../domain/userModel";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterInitialAccount: {user: Omit<User,"password"> };
  WelcomeRegister: undefined;
};
