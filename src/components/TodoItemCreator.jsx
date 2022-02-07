import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../store/todoStore';

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const handleChange = ({ target: { value } }) => setInputValue(value);

  const handleAddItem = () => {
    setTodoList((todoList) => [
      ...todoList,
      {
        id: uuidv4(),
        text: inputValue,
        isComplete: false,
      },
    ]);

    setInputValue('');
  };

  return (
    <div>
      <input type='text' value={inputValue} onChange={handleChange} />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
