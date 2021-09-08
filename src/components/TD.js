import React, { useState } from 'react';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import TDForm from './TDForm';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TDForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <>
      <div
        className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        <div
          className="todo-row-text"
          onClick={() => completeTodo(todo.id)}
          key={todo.id}
        >
          {todo.text}
        </div>
        <div className="todo-icons">
          <AiFillDelete
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          <AiOutlineEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="edit-icon"
          />
        </div>
      </div>
    </>
  ));
}

export default Todo;
