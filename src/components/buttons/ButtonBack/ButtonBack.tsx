import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";

import { styles } from './ButtonBackStyles';

type Props = TouchableOpacityProps;

export function ButtonBack({...props}: Props) {
  return (
    <TouchableOpacity {...props} style={styles.container} >
        <MaterialIcons name="arrow-back" size={28} color="black" />
    </TouchableOpacity>
  );
}
