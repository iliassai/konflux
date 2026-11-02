import { DarkTheme, DefaultTheme, type Theme } from 'expo-router/react-navigation';

// Palette values match the Nord semantic tokens in global.css.
export const THEME = {
  'nord-light': {
    background: '#ECEFF4',
    surface: '#E5E9F0',
    foreground: '#2E3440',
    primary: '#49688E',
    primaryForeground: '#ECEFF4',
    accentSoft: '#DFE4EC',
    positive: '#556F3F',
    negative: '#AE4750',
    secondary: '#4C566A',
    muted: '#5D6982',
    neutral: '#D8DEE9',
    border: '#C5CCD9',
  },
  'nord-dark': {
    background: '#2E3440',
    surface: '#3B4252',
    foreground: '#ECEFF4',
    primary: '#88C0D0',
    primaryForeground: '#2E3440',
    accentSoft: '#3C4956',
    positive: '#A3BE8C',
    negative: '#D89FA4',
    secondary: '#D8DEE9',
    muted: '#A6AFC0',
    neutral: '#4C566A',
    border: '#4C566A',
  },
} as const;

// Uniwind and Expo Router use the registered runtime names `light` and `dark`.
export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: THEME['nord-light'].background,
      border: THEME['nord-light'].border,
      card: THEME['nord-light'].surface,
      notification: THEME['nord-light'].negative,
      primary: THEME['nord-light'].primary,
      text: THEME['nord-light'].foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: THEME['nord-dark'].background,
      border: THEME['nord-dark'].border,
      card: THEME['nord-dark'].surface,
      notification: THEME['nord-dark'].negative,
      primary: THEME['nord-dark'].primary,
      text: THEME['nord-dark'].foreground,
    },
  },
};
