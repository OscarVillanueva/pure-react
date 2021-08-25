import React, { FC, ChangeEvent } from 'react'
import { useMachine } from '@xstate/react';

import TodoListMachine from 'context/TodoListMacine'

export interface FormProps {
  machine: any,
  send: Function
}
 
const Form: FC<FormProps> = ({ machine, send }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    send({
      type: 'INPUT',
      data: e.target.value
    })
  }

  const handleSubmit = (e: any) : void => {
    e.preventDefault()

    send({
      type: 'SAVE',
    })
  }

  return ( 
    <form 
      className = "p-10 card bg-base-200 w-2/5 mx-auto"
      onSubmit = { handleSubmit }
    >

      <div className="form-control">
        <label className="label">
          <span className="label-text">TODO</span>
        </label> 

        { machine.matches('error') && (
          <div className="alert alert-error my-4">
            <div className="flex-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                className="w-6 h-6 mx-2 stroke-current"
              >    
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                >
                </path>                      
              </svg> 

              <label>
                { machine.context.msg && machine.context.msg}
              </label>

            </div>
          </div>
        )}

        <input
          type="text"
          placeholder = "New Task"
          className = "input"
          value = { machine.context.task }
          onChange = { handleChange }
        />
      </div>

      { machine.matches('changed') && (
        <input 
          className="bg-transparent mt-2 cursor-pointer" 
          type="submit" 
          value="Guardar"
        />
      )}

    </form>
  );
}
 
export default Form;