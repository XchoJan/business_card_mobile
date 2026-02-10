import { MmkvRepository } from "../helpers/mmkv-storage";

export const palettes = {
    light: {
        blue: "#367FA9",
        black: "#0D0D0D",
        white: "#FFFFFF",
        grey: "#777777",
        grey2: "#DBDBDB",
        bg: "#EAEBF1",
        red: "#FF3636",
        pink: "#FFE7E7",
        green: "#0C9244",
        lightGreen: "#E7FFEC",
        secondaryLightGrey: "#F1F3F4"
    },
    dark: {
        blue: "#367FA9",
        black: "#161616",
        white: "#FFFFFF",
        grey: "#CDCDCD",
        grey2: "#3B3B3B",
        bg: "#000000",
        red: "#FF6868",
        darkRed: "#5D2828",
        green: "#10D34B",
        darkGreen: "#0D3716",
        secondaryDarkGrey: "#3A3A3A"
    },
};

export const getThemeColor = (lightColor: string, darkColor: string, theme?: string) => {
    if ((theme || MmkvRepository.getThemeSync()) == 'light') {
        return lightColor
    }else {
        return darkColor
    }
}

export const getColors = () => palettes[MmkvRepository.getThemeSync()];
