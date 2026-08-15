import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('chat-theme') || 'light',
  setTheme: (theme) => {
    localStorage.setItem('chat-theme', theme);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('chat-theme', newTheme);
      return { theme: newTheme };
    });
  },
}));
