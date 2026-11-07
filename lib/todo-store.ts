import { create } from "zustand";

export type TodoPrivacy = "dogs"| "homies" | "private" | "public" | "titleOnly";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  privacy: TodoPrivacy;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (title: string, privacy?: TodoPrivacy) => void;
  toggleTodo: (id: string) => void;
  setPrivacy: (id: string, privacy: TodoPrivacy) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: "sample-1",
      title: "Valoant night",
      done: false,
      privacy: "dogs",
    },
    {
      id: "sample-2",
      title: "5stack",
      done: true,
      privacy: "homies",
    },
    {
      id: "sample-3",
      title: "soloQ",
      done: false,
      privacy: "titleOnly",
    },
  ],

  addTodo: (title, privacy = "private") =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          title,
          done: false,
          privacy,
        },
      ],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    })),

  setPrivacy: (id, privacy) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, privacy } : todo,
      ),
    })),
}));
