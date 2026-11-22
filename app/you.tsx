import { DefaultSharingRow } from '@/components/you/default-sharing-row';
import { DefaultVisibilityPicker } from '@/components/you/default-visibility-picker';
import { PreferenceCard } from '@/components/you/preference-card';
import { ProfileRow } from '@/components/you/profile-row';
import { ThemeSelector, type AppTheme } from '@/components/you/theme-selector';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ScreenHeading } from '@/components/ui/screen-heading';
import type { AvailabilityVisibility } from '@/lib/group-store';
import { Uniwind, useUniwind } from 'uniwind';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

export default function YouScreen() {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const [calendarImportEnabled, setCalendarImportEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [widgetEnabled, setWidgetEnabled] = useState(false);
  const [defaultVisibility, setDefaultVisibility] = useState<AvailabilityVisibility>('busy_only');
  const [visibilityPickerVisible, setVisibilityPickerVisible] = useState(false);
  const selectedTheme: AppTheme = hasAdaptiveThemes ? 'system' : theme;

  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-5 px-5 pb-8 pt-10">
      <ScreenHeading eyebrow="Account" title="Me" />

      <ProfileRow
        initials="IE"
        name="Ilyas"
        email="Add email when account is connected"
        onEdit={() => Alert.alert('Edit profile', 'Profile editing will be added later.')}
      />

      <View className="gap-3">
        <PreferenceCard
          title="Import phone calendar"
          description="Fills busy blocks automatically"
          value={calendarImportEnabled}
          onValueChange={setCalendarImportEnabled}
        />
        <PreferenceCard
          title="Notifications"
          description="Invites, votes and reminders"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <PreferenceCard
          title="Home screen widget"
          description="Today's agenda"
          value={widgetEnabled}
          onValueChange={setWidgetEnabled}
        />
      </View>

      <DefaultSharingRow value={defaultVisibility} onPress={() => setVisibilityPickerVisible(true)} />
      <DefaultVisibilityPicker
        visible={visibilityPickerVisible}
        value={defaultVisibility}
        onSelect={(value) => {
          setDefaultVisibility(value);
          setVisibilityPickerVisible(false);
        }}
        onClose={() => setVisibilityPickerVisible(false)}
      />

      <View className="gap-3">
        <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Theme</Text>
        <ThemeSelector value={selectedTheme} onChange={(value) => Uniwind.setTheme(value)} />
      </View>

      <Button
        variant="outline"
        size="lg"
        className="h-14 w-full rounded-2xl"
        onPress={() => Alert.alert('Sign out', 'Sign out will be available after authentication is added.')}>
        <Text className="text-base font-semibold">Sign out</Text>
      </Button>
    </ScrollView>
  );
}
