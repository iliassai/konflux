import '@/global.css';

import { NAV_THEME, THEME } from '@/lib/theme';
import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { ThemeProvider } from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { CalendarDays, ListTodo, Users, UserRound } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();
  const palette = theme === 'dark' ? THEME['nord-dark'] : THEME['nord-light'];

  return (
    <ThemeProvider value={NAV_THEME[theme ?? 'light']}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: palette.secondary,
          tabBarStyle: { backgroundColor: palette.background, borderTopColor: palette.border },
        }}>
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: 'Groups',
            tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="plans"
          options={{
            title: 'Plans',
            tabBarIcon: ({ color, size }) => <ListTodo color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="you"
          options={{ title: 'You', tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} /> }}
        />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
      <PortalHost />
    </ThemeProvider>
  );
}
