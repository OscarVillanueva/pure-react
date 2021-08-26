import React, { FC, useState } from 'react'
import { Todo } from 'context/TodoListMacine';

export interface TodoProps {
  task: Todo
  send: any
}
 
const Task: FC<TodoProps> = ({ send, task }) => {

  const handleDelete = () : void => {
    send({
      type: 'DELETE',
      data: task.id
    })
  }

  return ( 
    <li
      className = {`p-4 rounded-xl my-4 flex justify-between ${ task.completed ? 'line-through bg-base-200' : 'bg-base-300' }`}
    >
      {task.name}

      <div className = "flex items-center">

        <input
          type="radio"
          className="radio radio-primary mr-2"
          onChange = { () => {}}
          onClick = { () => send({ type: 'TOGGLE', data: task.id }) }
          checked = { task.completed }
        />

        <button
          className = "text-error opacity-0 hover:opacity-100"
          onClick = { handleDelete }
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

      </div>

    </li>
  );
}
 
export default Task;