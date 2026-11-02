import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from 'expo-router/react-navigation';
import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CalendarDays, ListTodo, Users, UserRound } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();

  return (
    <ThemeProvider value={NAV_THEME[theme ?? 'light']}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Tabs initialRouteName="calendar" screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color, size }) => <ListTodo color={color} size={size} />,
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
          name="you"
          options={{ title: 'You', tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} /> }}
        />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
      <PortalHost />
    </ThemeProvider>
  );
}
