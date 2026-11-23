import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useGroupStore } from '@/lib/group-store';
import DateTimePicker from '@expo/ui/community/datetime-picker';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Modal, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { useUniwind } from 'uniwind';
import { ProposalChoiceChip } from './proposal-choice-chip';
import { ProposalDateField } from './proposal-date-field';

type DurationChoice = '1 h' | '2 h' | '3 h' | 'Custom';
type DateField = 'from' | 'to';

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function SectionLabel({ children }: { children: string }) {
  return <Text className="text-sm font-semibold tracking-wider text-muted-foreground">{children}</Text>;
}

export function ProposePlanScreen() {
  const { theme } = useUniwind();
  const groups = useGroupStore((state) => state.groups);
  const [title, setTitle] = useState('Valorant night');
  const [groupId, setGroupId] = useState(groups[0]?.id ?? '');
  const [duration, setDuration] = useState<DurationChoice>('2 h');
  const [customHours, setCustomHours] = useState('');
  const [fromDate, setFromDate] = useState(() => new Date());
  const [toDate, setToDate] = useState(() => addDays(new Date(), 7));
  const [activeDateField, setActiveDateField] = useState<DateField | null>(null);
  const [draftDate, setDraftDate] = useState(new Date());

  const pickerAccentColor = theme === 'dark' ? '#88C0D0' : '#49688E';

  const openDatePicker = (field: DateField) => {
    setDraftDate(field === 'from' ? fromDate : toDate);
    setActiveDateField(field);
  };

  const saveDate = (date: Date) => {
    if (activeDateField === 'from') setFromDate(date);
    if (activeDateField === 'to') setToDate(date);
    setActiveDateField(null);
  };

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/plans');
  };

  const findFreeSlots = () => {
    if (!title.trim()) {
      Alert.alert('Add an activity', 'Enter a name for this plan to continue.');
      return;
    }
    if (!groupId) {
      Alert.alert('Choose a group', 'Select the group you want to plan with.');
      return;
    }
    if (duration === 'Custom' && (!Number.isFinite(Number(customHours)) || Number(customHours) <= 0)) {
      Alert.alert('Enter a duration', 'Add a custom duration in hours.');
      return;
    }
    Alert.alert('Step 1 complete', 'Free-slot results will be added in Step 2.');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-5 px-5 pb-6 pt-10"
        keyboardShouldPersistTaps="handled">
        <View className="gap-2">
          <View className="flex-row items-center">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to Plans"
              onPress={goBack}
              hitSlop={8}
              className="-ml-1 flex-row items-center gap-1 py-1">
              <ChevronLeft size={20} color="#5D6982" />
              <Text className="text-sm text-muted-foreground">Step 1 of 2</Text>
            </Pressable>
          </View>
          <Text className="text-3xl font-bold">Propose</Text>
        </View>

        <View className="gap-2">
          <SectionLabel>ACTIVITY</SectionLabel>
          <TextInput
            accessibilityLabel="Activity name"
            value={title}
            onChangeText={setTitle}
            placeholder="What are you planning?"
            returnKeyType="done"
            className="h-14 rounded-2xl border border-border bg-card px-4 text-base font-medium text-foreground"
          />
        </View>

        <View className="gap-2">
          <SectionLabel>GROUP</SectionLabel>
          <View className="flex-row flex-wrap gap-2">
            {groups.map((group) => (
              <ProposalChoiceChip
                key={group.id}
                label={group.name}
                selected={groupId === group.id}
                onPress={() => setGroupId(group.id)}
              />
            ))}
          </View>
        </View>

        <View className="gap-2">
          <SectionLabel>DURATION</SectionLabel>
          <View className="flex-row flex-wrap gap-2">
            {(['1 h', '2 h', '3 h', 'Custom'] as const).map((choice) => (
              <ProposalChoiceChip
                key={choice}
                label={choice}
                selected={duration === choice}
                onPress={() => setDuration(choice)}
              />
            ))}
          </View>
          {duration === 'Custom' ? (
            <TextInput
              accessibilityLabel="Custom duration in hours"
              value={customHours}
              onChangeText={setCustomHours}
              placeholder="Hours"
              keyboardType="decimal-pad"
              className="h-12 rounded-xl border border-border bg-card px-4 text-base text-foreground"
            />
          ) : null}
        </View>

        <View className="flex-row gap-3">
          <ProposalDateField label="FROM" value={fromDate} onPress={() => openDatePicker('from')} />
          <ProposalDateField label="TO" value={toDate} onPress={() => openDatePicker('to')} />
        </View>

        <Text className="text-sm leading-5 text-muted-foreground">
          Slots come from busy blocks only. Nobody&apos;s details are shown.
        </Text>
      </ScrollView>

      <View className="px-5 pb-4 pt-2">
        <Button
          size="lg"
          className="h-14 w-full rounded-2xl"
          onPress={findFreeSlots}>
          <Text className="text-base font-semibold">Find free slots</Text>
        </Button>
      </View>

      {activeDateField && Platform.OS === 'android' ? (
        <DateTimePicker
          key={activeDateField}
          value={activeDateField === 'from' ? fromDate : toDate}
          mode="date"
          presentation="dialog"
          minimumDate={activeDateField === 'to' ? fromDate : undefined}
          maximumDate={activeDateField === 'from' ? toDate : undefined}
          accentColor={pickerAccentColor}
          themeVariant="light"
          onValueChange={(_, selectedDate) => saveDate(selectedDate)}
          onDismiss={() => setActiveDateField(null)}
        />
      ) : null}

      {activeDateField && Platform.OS === 'ios' ? (
        <Modal
          transparent
          animationType="slide"
          visible
          onRequestClose={() => setActiveDateField(null)}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close date picker"
            onPress={() => setActiveDateField(null)}
            className="flex-1 items-center justify-center bg-black/30 px-5">
            <Pressable
              onPress={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white px-3 pb-5 pt-4">
              <View className="flex-row items-center justify-between px-5 pb-2">
                <Pressable accessibilityRole="button" onPress={() => setActiveDateField(null)}>
                  <Text className="text-base text-muted-foreground">Cancel</Text>
                </Pressable>
                <Text className="text-base font-semibold">
                  {activeDateField === 'from' ? 'Start date' : 'End date'}
                </Text>
                <Pressable accessibilityRole="button" onPress={() => saveDate(draftDate)}>
                  <Text className="text-base font-semibold text-primary">Done</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={draftDate}
                mode="date"
                display="spinner"
                minimumDate={activeDateField === 'to' ? fromDate : undefined}
                maximumDate={activeDateField === 'from' ? toDate : undefined}
                accentColor={pickerAccentColor}
                themeVariant="light"
                locale="en_GB"
                onValueChange={(_, selectedDate) => setDraftDate(selectedDate)}
              />
            </Pressable>
          </Pressable>
        </Modal>
      ) : null}
    </View>
  );
}
