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

export type GroupInvite = {
  id: string;
  groupId: string;
  code: string;
  createdAt: string;
};

export type GroupCreationResult = {
  group: Group;
  invite: GroupInvite;
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
  invites: GroupInvite[];
  plans: GroupPlan[];
  votes: PlanVote[];
  createGroup: (name: string, visibility: AvailabilityVisibility) => GroupCreationResult;
  setAvailabilityVisibility: (
    groupId: string,
    userId: string,
    visibility: AvailabilityVisibility
  ) => void;
};

const INVITE_CODE_CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function createInviteCode(existingCodes: string[]) {
  let code = '';

  do {
    code = Array.from({ length: 6 }, () =>
      INVITE_CODE_CHARACTERS[Math.floor(Math.random() * INVITE_CODE_CHARACTERS.length)]
    ).join('');
  } while (existingCodes.includes(code));

  return code;
}

export const useGroupStore = create<GroupStore>((set, get) => ({
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
  invites: [],
  plans: [
    { id: 'gaming-plan', groupId: 'gaming-crew', title: 'Valorant night', status: 'voting', startsAt: null },
    { id: 'study-plan', groupId: 'study-group', title: 'Study session', status: 'confirmed', startsAt: nextThursdayAtTwo() },
  ],
  votes: [],
  createGroup: (name, visibility) => {
    const code = createInviteCode(get().invites.map((invite) => invite.code));

    const group: Group = {
      id: `group-${Date.now()}-${code.toLowerCase()}`,
      name: name.trim(),
      memberIds: [CURRENT_USER_ID],
    };
    const invite: GroupInvite = {
      id: `invite-${code.toLowerCase()}`,
      groupId: group.id,
      code,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      groups: [...state.groups, group],
      members: state.members.some((member) => member.id === CURRENT_USER_ID)
        ? state.members
        : [...state.members, { id: CURRENT_USER_ID, initials: 'IE', name: 'You' }],
      memberships: [
        ...state.memberships,
        { groupId: group.id, userId: CURRENT_USER_ID, availabilityVisibility: visibility },
      ],
      invites: [...state.invites, invite],
    }));

    return { group, invite };
  },
  setAvailabilityVisibility: (groupId, userId, availabilityVisibility) =>
    set((state) => ({
      memberships: state.memberships.map((membership) =>
        membership.groupId === groupId && membership.userId === userId
          ? { ...membership, availabilityVisibility }
          : membership
      ),
    })),
}));
