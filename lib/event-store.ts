import { create } from 'zustand';

export type CalendarEvent = {
  id: string;
  title: string;
  detail: string;
  time: string;
  color: string;
};

type EventStore = {
  events: CalendarEvent[];
};

export const useEventStore = create<EventStore>(() => ({
  events: [
    {
      id: 'event-1',
      title: 'Algorithms lecture',
      detail: 'Room B12',
      time: '09:00',
      color: '#5E81AC',
    },
    {
      id: 'event-2',
      title: 'Study group',
      detail: 'Library · titles visible to Group of study of ....',
      time: '14:00',
      color: '#A3BE8C',
    },
  ],
}));
