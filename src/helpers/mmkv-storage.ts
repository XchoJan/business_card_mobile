import { storage } from './key-value-repository';

export const MmkvRepository = {
    getTheme: async () => {
        const theme = storage.getString('theme');
        return theme || 'light';
    },
    getThemeSync: () => {
        const theme = storage.getString('theme');
        return theme || 'light';
    },
    setTheme: async (theme: string) => {
        storage.set('theme', theme);
    },
};
