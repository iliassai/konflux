import '@/global.css';

import { NAV_THEME, THEME } from '@/lib/theme';
import { PortalHost } from '@rn-primitives/portal';
import { NativeTabs } from 'expo-router/native-tabs';
import { ThemeProvider } from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
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
      <NativeTabs
        backgroundColor={palette.surface}
        tintColor={palette.primary}
        indicatorColor="#00000000"
        rippleColor="#00000000"
        iconColor={{ default: palette.secondary, selected: palette.primary }}
        labelStyle={{
          default: { color: palette.secondary, fontSize: 12 },
          selected: { color: palette.primary, fontSize: 12, fontWeight: '600' },
        }}
        disableIndicator
        disableTransparentOnScrollEdge>
        <NativeTabs.Trigger name="calendar">
          <NativeTabs.Trigger.Icon
            sf="calendar"
            md="calendar_month"
          />
          <NativeTabs.Trigger.Label>Calendar</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="groups">
          <NativeTabs.Trigger.Icon
            sf={{ default: 'person.3', selected: 'person.3.fill' }}
            md="groups"
          />
          <NativeTabs.Trigger.Label>Groups</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="plans">
          <NativeTabs.Trigger.Icon
            sf={{ default: 'list.bullet.clipboard', selected: 'list.bullet.clipboard.fill' }}
            md="checklist"
          />
          <NativeTabs.Trigger.Label>Plans</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="you">
          <NativeTabs.Trigger.Icon
            sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
            md="person"
          />
          <NativeTabs.Trigger.Label>You</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="index" hidden />
      </NativeTabs>
      <PortalHost />
    </ThemeProvider>
  );
}
