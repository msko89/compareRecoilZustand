import React from 'react';
import { useRecoilState } from 'recoil';
import { todoListFilterState } from '../store/todoStore';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => setFilter(value);

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value='All'>All</option>
        <option value='Completed'>Completed</option>
        <option value='Uncompleted'>Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
