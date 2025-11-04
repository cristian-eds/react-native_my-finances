import { RouteProp, useRoute } from "@react-navigation/native";
import { PrincipalStackParamList } from "../../routes/Stack/types/PrincipalStackParamList";

export const useAppRoute = <RouteName extends keyof PrincipalStackParamList>() =>
  useRoute<RouteProp<PrincipalStackParamList, RouteName>>();