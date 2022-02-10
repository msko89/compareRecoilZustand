import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredTodoListState, useStore } from '../../store/useTodoStore';
import TodoItemCreator from './TodoItemCreator';
import TodoItem from './TodoItem';
import TodoListFilters from './TodoListFilters';
import TodoListStats from './TodoListStats';

const TodoList = () => {
  // const todoList = useRecoilValue(filteredTodoListState);
  const todoList = useStore((state) => state.filteredTodoListState());

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
