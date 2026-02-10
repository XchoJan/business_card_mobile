import { getThemeColor, palettes } from './colors.ts';

export const getFonts: any = () => {
    return {
        H1: {
            fontWeight: '500',
            fontSize: 28,
            lineHeight: 27,
            color: getThemeColor(palettes.light.black, palettes.dark.white),
        },
        H2: {
            fontWeight: '500',
            fontSize: 22,
            lineHeight: 23,
            color: getThemeColor(palettes.light.black, palettes.dark.white),

        },
        H3: {
            fontWeight: '500',
            fontSize: 18,
            lineHeight: 23,
            color: getThemeColor(palettes.light.black, palettes.dark.white),

        },
        H4: {
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 23,
            color: getThemeColor(palettes.light.black, palettes.dark.white),

        },
        H5: {
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 23,
            color: getThemeColor(palettes.light.black, palettes.dark.white),

        },

        b1: {
            fontWeight: '500',
            fontSize: 14,
            lineHeight: 23,
            color: getThemeColor(palettes.light.grey, palettes.dark.white),
        },
        b2: {
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 16,
            color: getThemeColor(palettes.light.black, palettes.dark.white),
        },

        b3: {
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 23,
            color: getThemeColor(palettes.light.grey, palettes.dark.grey),

        },
        button: {
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 23,
            color: getThemeColor(palettes.light.black, palettes.dark.grey),

        },
    }
}
