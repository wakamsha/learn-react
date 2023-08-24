import { atom, atomFamily, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil';

type Todo = {
  id: number;
  title: string;
  content: string;
  completed: boolean;
};

const todoState = atomFamily<Todo | null, Todo['id']>({
  key: 'todo/state',
  default: null,
});

const todoIdState = atom<Todo['id'][]>({
  key: 'todo/idState',
  default: [],
});

const getId = (() => {
  let id = 0;
  return () => ++id;
})();

export function useTodoAction() {
  return {
    add: useRecoilCallback(
      ({ set }) =>
        (title: Todo['title'], content: Todo['content']) => {
          const newTodo: Todo = {
            id: getId(),
            title,
            content,
            completed: false,
          };
          set(todoIdState, (prev) => [...prev, newTodo.id]);
          set(todoState(newTodo.id), newTodo);
        },
      [],
    ),
    remove: useRecoilCallback(({ set, reset }) => (targetId: Todo['id']) => {
      set(todoIdState, (prev) => prev.filter((id) => id !== targetId));
      reset(todoState(targetId));
    }),
    edit: useRecoilCallback(({ set }) => (targetId: Todo['id'], payload: Pick<Todo, 'title' | 'content'>) => {
      set(todoState(targetId), (todo) => {
        if (!todo) return null;

        return {
          ...todo,
          ...payload,
        };
      });
    }),
    toggleComplete: useRecoilCallback(({ set }) => (targetId: Todo['id']) => {
      set(todoState(targetId), (todo) => {
        if (!todo) return null;

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }),
  };
}

const getTodo = selectorFamily<Todo | null, Todo['id']>({
  key: 'todo/get',
  get:
    (todoId) =>
    ({ get }) =>
      get(todoState(todoId)),
});

export function useGetTodoAction() {
  return {
    todoIds: useRecoilValue(todoIdState),
    useGetTodo: (todoId: Todo['id']) => useRecoilValue(getTodo(todoId)),
  };
}
