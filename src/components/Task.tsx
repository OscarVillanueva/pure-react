import React, { FC, useState } from 'react'
import { Todo } from 'context/TodoListMacine';

export interface TodoProps {
  task: Todo
  send: any
}
 
const Task: FC<TodoProps> = ({ send, task }) => {

  return ( 
    <li
      className = {`p-4 rounded-xl my-4 flex justify-between ${ task.completed ? 'line-through bg-base-200' : 'bg-base-300' }`}
    >
      {task.name}

      <input 
        type="radio" 
        className="radio radio-primary"
        onChange = { () => {}}
        onClick = { () => send({ type: 'TOGGLE', data: task.id }) }
        checked = { task.completed }
      />

    </li>
  );
}
 
export default Task;