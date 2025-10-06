import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";

import { styles } from './ButtonBackStyles';

type Props = TouchableOpacityProps;

export function ButtonBack({...props}: Props) {
  return (
    <TouchableOpacity {...props} style={styles.container} >
        <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
}
