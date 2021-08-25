import React, { FC, useEffect } from 'react'
import { useMachine } from '@xstate/react';

// Machines
import TodoListMachine from 'context/TodoListMacine'
import Form from 'components/Form';
import TodoList from 'components/TodoList';

const Todo: FC = () => {

  const [machine, send] = useMachine(TodoListMachine)

  useEffect(() => {
    
    console.log(`machine.value`, machine.value)

  }, [machine])

  return ( 
    <div>
      <h1>Todo List</h1>

      <Form 
        machine = { machine }
        send = { send }
      />

      <TodoList
        tasks = { machine.context.tasks }
      />

    </div>
  );
}
 
export default Todo;