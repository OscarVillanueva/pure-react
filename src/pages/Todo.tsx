import React, { FC, useEffect } from 'react'
import { useActor, useMachine } from '@xstate/react';

// Machines
import TodoListMachine from 'context/TodoListMacine'
import Form from 'components/Form';
import TodoList from 'components/TodoList';

const Todo: FC = () => {

  const [machine, send] = useMachine(TodoListMachine)

  return ( 
    <div>
      <Form 
        machine = { machine }
        send = { send }
      />

      <TodoList
        tasks = { machine.context.tasks }
        send = { send }
      />

    </div>
  );
}
 
export default Todo;