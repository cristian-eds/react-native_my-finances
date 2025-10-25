import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";

import { styles } from './ButtonIconSimpleStyles';

interface ButtonIconSimple {
  iconName: keyof typeof Ionicons.glyphMap,
}

type Props = ButtonIconSimple & TouchableOpacityProps;

export function ButtonIconSimple({iconName, ...props}: Props) {
  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]} >
        <Ionicons name={iconName} size={22} color="black" />
    </TouchableOpacity>
  );
}
