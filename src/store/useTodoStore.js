import { atom, selector } from 'recoil';
import create from 'zustand';

export const todoListState = atom({
  key: 'todoListState',
  default: [],
});

export const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'All',
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const todoList = get(todoListState);

    switch (filter) {
      case 'Completed':
        return todoList.filter((todo) => todo.isComplete);
      case 'Uncompleted':
        return todoList.filter((todo) => !todo.isComplete);
      default:
        return todoList;
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((todo) => todo.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export const useStore = create((set, get) => ({
  todoListState: [],
  todoListFilterState: 'All',
  setTodoList: (list) => set({ todoListState: list }),
  setTodoListFilterState: (filter) => set({ todoListFilterState: filter }),
  filteredTodoListState: () => {
    const filter = get().todoListFilterState;
    const todoList = get().todoListState;

    switch (filter) {
      case 'Completed':
        return todoList.filter((todo) => todo.isComplete);
      case 'Uncompleted':
        return todoList.filter((todo) => !todo.isComplete);
      default:
        return todoList;
    }
  },
  todoListStatsState: () => {
    const todoList = get().todoListState;
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((todo) => todo.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
}));
