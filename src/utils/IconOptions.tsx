import { Ionicons } from '@expo/vector-icons';
import { ReactElement } from 'react';

interface IconOption {
    label: string,
    value: keyof typeof Ionicons.glyphMap,
    icon: () => ReactElement
}

export const iconsOptions: IconOption[] = [
    {
        label: "Viajem",
        value: "airplane-outline",
        icon: () => <Ionicons name="airplane-outline" size={16} color="#555" />,
    },
    {
        label: "Educacao",
        value: "school-outline",
        icon: () => <Ionicons name="school-outline" size={16} color="#555" />,
    },
    {
        label: "Saude",
        value: "medkit-outline",
        icon: () => <Ionicons name="medkit-outline" size={16} color="#555" />,
    },
    {
        label: "Transporte",
        value: "bus-outline",
        icon: () => <Ionicons name="bus-outline" size={16} color="#555" />,
    },
    {
        label: "Carro",
        value: "car-outline",
        icon: () => <Ionicons name="car-outline" size={16} color="#555" />,
    },
    {
        label: "Compras",
        value: "cart-outline",
        icon: () => <Ionicons name="cart-outline" size={16} color="#555" />,
    },
    {
        label: "Comida",
        value: "fast-food-outline",
        icon: () => <Ionicons name="fast-food-outline" size={16} color="#555" />,
    },
    {
        label: "Games",
        value: "game-controller-outline",
        icon: () => <Ionicons name="game-controller-outline" size={16} color="#555" />,
    },
    {
        label: "Lazer",
        value: "cafe-outline",
        icon: () => <Ionicons name="cafe-outline" size={16} color="#555" />,
    },
    {
        label: "Contas Gerais",
        value: "receipt-outline",
        icon: () => <Ionicons name="receipt-outline" size={16} color="#555" />,
    },
    {
        label: "Roupas",
        value: "shirt-outline",
        icon: () => <Ionicons name="shirt-outline" size={16} color="#555" />,
    },
    {
        label: "Salário",
        value: "business-outline",
        icon: () => <Ionicons name="business-outline" size={16} color="#555" />,
    },
    {
        label: "Presente",
        value: "gift-outline",
        icon: () => <Ionicons name="gift-outline" size={16} color="#555" />,
    },
    {
        label: "Dinheiro",
        value: "dice-outline",
        icon: () => <Ionicons name="dice-outline" size={16} color="#555" />,
    },
    {
        label: "Investimento",
        value: "trending-up-outline",
        icon: () => <Ionicons name="trending-up-outline" size={16} color="#555" />,
    },
    {
        label: "Venda",
        value: "pricetag-outline",
        icon: () => <Ionicons name="pricetag-outline" size={16} color="#555" />,
    },
    {
        label: "Dinheiro",
        value: "cash-outline",
        icon: () => <Ionicons name="cash-outline" size={16} color="#555" />,
    },
    {
        label: "Casa",
        value: "home-outline",
        icon: () => <Ionicons name="home-outline" size={16} color="#555" />,
    },
    {
        label: "Pets",
        value: "paw-outline",
        icon: () => <Ionicons name="paw-outline" size={16} color="#555" />,
    },
    {
        label: "Manutenção",
        value: "build-outline",
        icon: () => <Ionicons name="build-outline" size={16} color="#555" />,
    },
    {
        label: "Tecnologia",
        value: "desktop-outline",
        icon: () => <Ionicons name="desktop-outline" size={16} color="#555" />,
    },
    {
        label: "Filhos",
        value: "happy-outline",
        icon: () => <Ionicons name="happy-outline" size={16} color="#555" />,
    },
    {
        label: "Beleza",
        value: "color-wand-outline",
        icon: () => <Ionicons name="color-wand-outline" size={16} color="#555" />,
    },
    {
        label: "Esportes",
        value: "tennisball-outline",
        icon: () => <Ionicons name="tennisball-outline" size={16} color="#555" />,
    },
    {
        label: "Doação",
        value: "heart-outline",
        icon: () => <Ionicons name="heart-outline" size={16} color="#555" />,
    },
    {
        label: "Impostos",
        value: "document-text-outline",
        icon: () => <Ionicons name="document-text-outline" size={16} color="#555" />,
    },
    {
        label: "Seguros",
        value: "shield-half-outline",
        icon: () => <Ionicons name="shield-half-outline" size={16} color="#555" />,
    },
    {
        label: "Emergência",
        value: "warning-outline",
        icon: () => <Ionicons name="warning-outline" size={16} color="#555" />,
    },
    {
        label: "Internet",
        value: "globe-outline",
        icon: () => <Ionicons name="globe-outline" size={16} color="#555" />,
    },
    {
        label: "Outros Gastos",
        value: "ellipsis-horizontal-circle-outline",
        icon: () => <Ionicons name="ellipsis-horizontal-circle-outline" size={16} color="#555" />,
    },
    {
        label: "Aluguel",
        value: "key-outline",
        icon: () => <Ionicons name="key-outline" size={16} color="#555" />,
    },
    {
        label: "Reembolso",
        value: "refresh-outline",
        icon: () => <Ionicons name="refresh-outline" size={16} color="#555" />,
    },
    {
        label: "Empréstimo",
        value: "wallet-outline",
        icon: () => <Ionicons name="wallet-outline" size={16} color="#555" />,
    },
    {
        label: "Juros",
        value: "pie-chart-outline",
        icon: () => <Ionicons name="pie-chart-outline" size={16} color="#555" />,
    },
    {
        label: "Dividendos",
        value: "leaf-outline",
        icon: () => <Ionicons name="leaf-outline" size={16} color="#555" />,
    },
]