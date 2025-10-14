import { View } from "react-native"



const itemHexColor = (hexColor: string) => {
    return <View style={{ width: 50, height: 20, backgroundColor: hexColor }}></View>
}


export const hexColorOptions = [
    {
        label: "Vermelho Padrão",
        value: "#FF3B30", // Vermelho do iOS
        icon: () => itemHexColor('#FF3B30'),
    },
    {
        label: "Azul Brilhante",
        value: "#007AFF", // Azul do iOS/Ação
        icon: () => itemHexColor('#007AFF'),
    },
    {
        label: "Verde Esmeralda",
        value: "#34C759", // Verde de Sucesso
        icon: () => itemHexColor('#34C759'),
    },
    {
        label: "Laranja",
        value: "#FF9500",
        icon: () => itemHexColor('#FF9500'),
    },
    {
        label: "Amarelo Canário",
        value: "#FFCC00",
        icon: () => itemHexColor('#FFCC00'),
    },
    {
        label: "Roxo",
        value: "#AF52DE",
        icon: () => itemHexColor('#AF52DE'),
    },
    {
        label: "Rosa Vibrante",
        value: "#FF2D55",
        icon: () => itemHexColor('#FF2D55'),
    },
    {
        label: "Ciano (Água)",
        value: "#32ADEA",
        icon: () => itemHexColor('#32ADEA'),
    },
    {
        label: "Marrom",
        value: "#A2845E",
        icon: () => itemHexColor('#A2845E'),
    },
    {
        label: "Cinza Claro",
        value: "#E5E5EA",
        icon: () => itemHexColor('#E5E5EA'),
    },
    {
        label: "Cinza Escuro",
        value: "#8E8E93",
        icon: () => itemHexColor('#8E8E93'),
    },
    {
        label: "Preto",
        value: "#000000",
        icon: () => itemHexColor('#000000'),
    },
    {
        label: "Branco",
        value: "#FFFFFF",
        icon: () => itemHexColor('#FFFFFF'),
    },
    {
        label: "Vinho",
        value: "#9B2F2A",
        icon: () => itemHexColor('#9B2F2A'),
    },
    {
        label: "Azul Marinho",
        value: "#003366",
        icon: () => itemHexColor('#003366'),
    },
    {
        label: "Verde Oliva",
        value: "#6B8E23",
        icon: () => itemHexColor('#6B8E23'),
    },
    {
        label: "Turquesa",
        value: "#40E0D0",
        icon: () => itemHexColor('#40E0D0'),
    },
    {
        label: "Lilás",
        value: "#C3A0D5",
        icon: () => itemHexColor('#C3A0D5'),
    },
    {
        label: "Dourado",
        value: "#FFD700",
        icon: () => itemHexColor('#FFD700'),
    },
    {
        label: "Salmão",
        value: "#FA8072",
        icon: () => itemHexColor('#FA8072'),
    },
        {
        label: "Azul Céu",
        value: "#87CEEB",
        icon: () => itemHexColor('#87CEEB'),
    },
    {
        label: "Verde Menta",
        value: "#98FB98",
        icon: () => itemHexColor('#98FB98'),
    },
    {
        label: "Índigo",
        value: "#4B0082",
        icon: () => itemHexColor('#4B0082'),
    },
    {
        label: "Terra Cota",
        value: "#E2725B",
        icon: () => itemHexColor('#E2725B'),
    },
    {
        label: "Púrpura",
        value: "#800080",
        icon: () => itemHexColor('#800080'),
    },
    {
        label: "Cinza Ardósia",
        value: "#708090",
        icon: () => itemHexColor('#708090'),
    },
    {
        label: "Bege",
        value: "#F5F5DC",
        icon: () => itemHexColor('#F5F5DC'),
    },
    {
        label: "Chocolate",
        value: "#D2691E",
        icon: () => itemHexColor('#D2691E'),
    },
    {
        label: "Vermelho Tijolo",
        value: "#B22222",
        icon: () => itemHexColor('#B22222'),
    },
    {
        label: "Verde Limão",
        value: "#32CD32",
        icon: () => itemHexColor('#32CD32'),
    }
];