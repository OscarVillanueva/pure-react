import React, { FC } from 'react'
import { Todo } from 'context/TodoListMacine';
import Task from 'components/Task'

export interface TodoListProps {
  tasks: Todo[]
  send: any
}
 
const TodoList: FC<TodoListProps> = ({ tasks, send }) => {

  return ( 

    <div className="container mx-auto">

      { tasks.length > 0 && (
        <h2>Todos: </h2>
      )}

      <ul>
        {tasks.map((task: Todo) => (
          
          <Task
            key = { task.id }
            task = { task }
            send = { send }
          />

        ))}
      </ul>
    </div>

  );
}
 
export default TodoList;