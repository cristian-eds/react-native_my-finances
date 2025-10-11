import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";

import { styles } from './ButtonIconSimpleStyles';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';

interface ButtonIconSimple {
  iconName: keyof typeof Ionicons.glyphMap,
  styles?: StyleProp<ViewStyle>
}

type Props = ButtonIconSimple & TouchableOpacityProps;

export function ButtonIconSimple({iconName,style, ...props}: Props) {
  return (
    <TouchableOpacity {...props} style={[styles.container,style]} >
        <Ionicons name={iconName} size={24} color="black" />
    </TouchableOpacity>
  );
}
