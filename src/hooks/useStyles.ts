import {useMemo} from 'react';
import { MmkvRepository } from '../helpers/mmkv-storage.ts';
import { getFonts } from '../theme/typography.ts';
import { useSelector } from 'react-redux';
import { getThemeColor, palettes } from '../theme/colors.ts';

export type ColorsEnum = 'blue' | 'black' | 'white' | 'grey' | 'grey2' | 'bg' | 'red' | 'pink' |
  'green' | 'lightGreen' | 'darkRed' | 'darkGreen' | 'secondaryLightGrey' | 'secondaryDarkGrey' ;


const useStyles = (createStyles: any) => {
    const fonts = getFonts()
    const theme = useSelector((store: any) => store.theme.theme)
    const styles = useMemo(() => createStyles(getThemeColorFn(theme), theme), [theme]);

    return { styles, theme, fonts};
};

const getThemeColorFn = (theme: any) => (lightColor: ColorsEnum, darkColor: ColorsEnum) => {
    //@ts-ignore
    return getThemeColor(palettes.light[lightColor], palettes.dark[darkColor], theme)
}

export default useStyles;
