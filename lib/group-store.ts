import { create } from 'zustand';

export type AvailabilityVisibility = 'hidden' | 'busy_only' | 'titles' | 'full';

export type Group = {
  id: string;
  name: string;
  memberIds: string[];
};

export type GroupMember = {
  id: string;
  initials: string;
  name: string;
};

export type GroupMembership = {
  groupId: string;
  userId: string;
  availabilityVisibility: AvailabilityVisibility;
};

export type GroupPlan = {
  id: string;
  groupId: string;
  title: string;
  status: 'voting' | 'confirmed' | 'cancelled';
  startsAt: string | null;
};

export type PlanVote = {
  planId: string;
  userId: string;
};

export const CURRENT_USER_ID = 'current-user';

function nextThursdayAtTwo() {
  const date = new Date();
  const daysUntilThursday = (4 - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntilThursday);
  date.setHours(14, 0, 0, 0);
  return date.toISOString();
}

type GroupStore = {
  groups: Group[];
  members: GroupMember[];
  memberships: GroupMembership[];
  plans: GroupPlan[];
  votes: PlanVote[];
  setAvailabilityVisibility: (
    groupId: string,
    userId: string,
    visibility: AvailabilityVisibility
  ) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [
    { id: 'gaming-crew', name: 'Gaming crew', memberIds: ['sam', 'omar', 'hana', 'ilyas'] },
    { id: 'study-group', name: 'Study group', memberIds: ['yasmine', 'lina', 'mehdi', 'adam', 'nora'] },
    { id: 'family', name: 'Family', memberIds: ['mona', 'daoud', 'nada', 'ali', 'sara'] },
  ],
  members: [
    { id: 'sam', initials: 'SA', name: 'Sam' },
    { id: 'omar', initials: 'OM', name: 'Omar' },
    { id: 'hana', initials: 'HA', name: 'Hana' },
    { id: 'ilyas', initials: 'IE', name: 'Ilyas' },
    { id: 'yasmine', initials: 'YA', name: 'Yasmine' },
    { id: 'lina', initials: 'LI', name: 'Lina' },
    { id: 'mehdi', initials: 'ME', name: 'Mehdi' },
    { id: 'adam', initials: 'AD', name: 'Adam' },
    { id: 'nora', initials: 'NO', name: 'Nora' },
    { id: 'mona', initials: 'MO', name: 'Mona' },
    { id: 'daoud', initials: 'DA', name: 'Daoud' },
    { id: 'nada', initials: 'NA', name: 'Nada' },
    { id: 'ali', initials: 'AL', name: 'Ali' },
    { id: 'sara', initials: 'SA', name: 'Sara' },
  ],
  memberships: [
    { groupId: 'gaming-crew', userId: CURRENT_USER_ID, availabilityVisibility: 'busy_only' },
    { groupId: 'study-group', userId: CURRENT_USER_ID, availabilityVisibility: 'titles' },
    { groupId: 'family', userId: CURRENT_USER_ID, availabilityVisibility: 'full' },
  ],
  plans: [
    { id: 'gaming-plan', groupId: 'gaming-crew', title: 'Valorant night', status: 'voting', startsAt: null },
    { id: 'study-plan', groupId: 'study-group', title: 'Study session', status: 'confirmed', startsAt: nextThursdayAtTwo() },
  ],
  votes: [],
  setAvailabilityVisibility: (groupId, userId, availabilityVisibility) =>
    set((state) => ({
      memberships: state.memberships.map((membership) =>
        membership.groupId === groupId && membership.userId === userId
          ? { ...membership, availabilityVisibility }
          : membership
      ),
    })),
}));
