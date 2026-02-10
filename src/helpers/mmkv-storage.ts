import MMKVStorage from "react-native-mmkv-storage";
const MMKV = new MMKVStorage.Loader().initialize();

export const MmkvRepository = {
    getTheme: async () => {
        const theme = await MMKV.getStringAsync("theme");
        return theme || "light";
    },
    getThemeSync: () => {
        const theme = MMKV.getString("theme");
        return theme || "light";
    },
    setTheme: async (theme: string) => {
        await MMKV.setStringAsync("theme", theme);
    },
};
