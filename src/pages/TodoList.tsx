import React, { ChangeEvent, FC } from 'react'
import { useMachine } from '@xstate/react';

// Machines
import TodoListMachine from 'context/TodoListMacine'

const TodoList: FC = () => {

  const [machine, send] = useMachine(TodoListMachine)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    send({
      type: 'INPUT',
      data: e.target.value
    })
  }

  return ( 
    <div>
      <h1>Todo List</h1>
      <form className = "p-10 card bg-base-200 w-2/5 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">TODO</span>
          </label> 
          <input
            type="text"
            placeholder = "New Task"
            className = "input"
            value = { machine.context.task }
            onChange = { handleChange }
          />
        </div>
        <input 
          className="bg-transparent mt-2 cursor-pointer" 
          type="submit" 
          value="Guardar"
        />
      </form>
    </div>
  );
}
 
export default TodoList;