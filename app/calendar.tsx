import { Text } from '@/components/ui/text';
import { TodoList } from '@/components/todo-component';
import { EventList } from '@/components/events/event-list';
import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import { CalendarHeader, type CalendarView } from '@/components/calendar/calendar-header';
import { WeekDateSelector } from '@/components/calendar/week-date-selector';
import { VotePromptCard } from '@/components/events/vote-prompt-card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { MonthDateSelector } from '@/components/calendar/month-date-selector';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [view, setView] = useState<CalendarView>('week');
  const [mockHasVoted, setMockHasVoted] = useState(false);
  const mockVoteIsOpen = true;

  return (
      <View className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-5 px-5 pb-24 pt-10">
        <CalendarHeader
          date={selectedDate}
          view={view}
          onViewChange={setView}
          onTodayPress={() => setSelectedDate(new Date())}
        />
        {view === 'week' ? (
          <WeekDateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        ) : (
          <MonthDateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        )}
        {mockVoteIsOpen && (
          <VotePromptCard
            title="Valorant night"
            message="Gaming crew · 2 slots waiting for your vote"
            hasVoted={mockHasVoted}
            onVote={() => setMockHasVoted(true)}
          />
        )}
        <View className="gap-3">
          <Text className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Events</Text>
          <EventList />
        </View>
        <View className="gap-3">
          <Text className="text-xs font-medium uppercase tracking-widest text-muted-foreground">To do</Text>
          <TodoList />
        </View>
        </ScrollView>
        <FloatingActionButton accessibilityLabel="Add event or to-do" />
      </View>
  );
}
