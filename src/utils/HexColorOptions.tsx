import { View } from "react-native"

const itemHexColor = (hexColor: string) => {
    return <View style={{ width: 50, height: 20, backgroundColor: hexColor }}></View>
}

export const hexColorOptions = [
    {
        label: "Ciano Marinho",
        value: "#5AC8FA",
        icon: () => itemHexColor('#5AC8FA'),
    },
    {
        label: "Roxo Profundo",
        value: "#AF52DE",
        icon: () => itemHexColor('#AF52DE'),
    },
    {
        label: "Verde Esmeralda",
        value: "#34C759",
        icon: () => itemHexColor('#34C759'),
    },
    {
        label: "Cinza Neutro",
        value: "#8E8E93",
        icon: () => itemHexColor('#8E8E93'),
    },
    {
        label: "Preto Carbono",
        value: "#000000",
        icon: () => itemHexColor('#000000'),
    },
    {
        label: "Azul Brilhante",
        value: "#007AFF",
        icon: () => itemHexColor('#007AFF'),
    },
    {
        label: "Laranja Alerta",
        value: "#FF9500",
        icon: () => itemHexColor('#FF9500'),
    },
    {
        label: "Verde Menta",
        value: "#00C7BE",
        icon: () => itemHexColor('#00C7BE'),
    },
    {
        label: "Marrom Terra",
        value: "#A2845E",
        icon: () => itemHexColor('#A2845E'),
    },
    {
        label: "Índigo Escuro",
        value: "#5856D6",
        icon: () => itemHexColor('#5856D6'),
    },
    {
        label: "Rosa Paixão",
        value: "#FF2D55",
        icon: () => itemHexColor('#FF2D55'),
    },
    {
        label: "Amarelo Ouro",
        value: "#FFCC00",
        icon: () => itemHexColor('#FFCC00'),
    },
    {
        label: "Magenta Claro",
        value: "#C69C6E",
        icon: () => itemHexColor('#C69C6E'),
    },
    {
        label: "Verde Água",
        value: "#30B0C7",
        icon: () => itemHexColor('#30B0C7'),
    },
    {
        label: "Verde Maçã",
        value: "#8BC34A",
        icon: () => itemHexColor('#8BC34A'),
    },
    {
        label: "Vermelho Padrão",
        value: "#FF3B30",
        icon: () => itemHexColor('#FF3B30'),
    },
    {
        label: "Teal Escuro",
        value: "#4CDA64",
        icon: () => itemHexColor('#4CDA64'),
    },
    {
        label: "Cáqui Claro",
        value: "#D1C4E9",
        icon: () => itemHexColor('#D1C4E9'),
    },
    {
        label: "Rosa Salmão",
        value: "#E91E63",
        icon: () => itemHexColor('#E91E63'),
    },
    {
        label: "Cobre Escuro",
        value: "#795548",
        icon: () => itemHexColor('#795548'),
    },
    {
        label: "Cinzento Claro",
        value: "#B0BEC5",
        icon: () => itemHexColor('#B0BEC5'),
    },
    {
        label: "Amarelo Limão",
        value: "#CDDC39",
        icon: () => itemHexColor('#CDDC39'),
    },
    {
        label: "Violeta Suave",
        value: "#C96D9C",
        icon: () => itemHexColor('#C96D9C'),
    },
    {
        label: "Limão Vibrante",
        value: "#AEEA00",
        icon: () => itemHexColor('#AEEA00'),
    },
    {
        label: "Borgonha",
        value: "#8D0014",
        icon: () => itemHexColor('#8D0014'),
    },
    {
        label: "Bordô Escuro",
        value: "#6D0000",
        icon: () => itemHexColor('#6D0000'),
    },
    {
        label: "Azul Safira",
        value: "#003A6A",
        icon: () => itemHexColor('#003A6A'),
    },
    {
        label: "Amarelo Mostarda",
        value: "#FFEB3B",
        icon: () => itemHexColor('#FFEB3B'),
    },
    {
        label: "Azul Céu Claro",
        value: "#B3E5FC",
        icon: () => itemHexColor('#B3E5FC'),
    },
    {
        label: "Cinza Ardósia",
        value: "#455A64",
        icon: () => itemHexColor('#455A64'),
    },
    {
        label: "Amarelo Cânone",
        value: "#B5A642",
        icon: () => itemHexColor('#B5A642'),
    },
    {
        label: "Carmesim Suave",
        value: "#F48FB1",
        icon: () => itemHexColor('#F48FB1'),
    },
    {
        label: "Púrpura Escuro",
        value: "#4A148C",
        icon: () => itemHexColor('#4A148C'),
    },
    {
        label: "Ocre Avermelhado",
        value: "#BF360C",
        icon: () => itemHexColor('#BF360C'),
    },
    {
        label: "Esmeralda Claro",
        value: "#69F0AE",
        icon: () => itemHexColor('#69F0AE'),
    },
];