import { create } from 'zustand';

export type PlanStatus = 'draft' | 'voting' | 'confirmed' | 'cancelled';

export type PlanSlot = {
  id: string;
  startsAt: string;
  endsAt: string;
};

export type PlanResponse = {
  planId: string;
  memberId: string;
  availableSlotIds: string[];
};

export type Plan = {
  id: string;
  groupId: string;
  title: string;
  durationMinutes: number;
  status: PlanStatus;
  slots: PlanSlot[];
  confirmedSlotId?: string;
};

function nextWeekdaySlot(dayOfWeek: number, hour: number, durationMinutes: number): PlanSlot {
  const startsAt = new Date();
  const daysAhead = (dayOfWeek - startsAt.getDay() + 7) % 7 || 7;
  startsAt.setDate(startsAt.getDate() + daysAhead);
  startsAt.setHours(hour, 0, 0, 0);
  const endsAt = new Date(startsAt.getTime() + durationMinutes * 60_000);

  return {
    id: `slot-${dayOfWeek}-${hour}`,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
  };
}

type PlanStore = {
  plans: Plan[];
  responses: PlanResponse[];
};

const valorantSlots = [
  nextWeekdaySlot(5, 19, 120),
  nextWeekdaySlot(6, 20, 120),
];
const confirmedSlot = nextWeekdaySlot(0, 12, 90);

export const usePlanStore = create<PlanStore>(() => ({
  plans: [
    {
      id: 'valorant-night',
      groupId: 'gaming-crew',
      title: 'Valorant night',
      durationMinutes: 120,
      status: 'voting',
      slots: valorantSlots,
    },
    {
      id: 'group-project-sync',
      groupId: 'study-group',
      title: 'Group project sync',
      durationMinutes: 60,
      status: 'draft',
      slots: [],
    },
    {
      id: 'family-lunch',
      groupId: 'family',
      title: 'Family lunch',
      durationMinutes: 90,
      status: 'confirmed',
      slots: [confirmedSlot],
      confirmedSlotId: confirmedSlot.id,
    },
  ],
  responses: [
    { planId: 'valorant-night', memberId: 'sam', availableSlotIds: [valorantSlots[0].id] },
    { planId: 'valorant-night', memberId: 'omar', availableSlotIds: valorantSlots.map((slot) => slot.id) },
    { planId: 'valorant-night', memberId: 'hana', availableSlotIds: [valorantSlots[1].id] },
  ],
}));
