import React, { FC, useState, useEffect } from 'react'
import { Todo } from 'context/TodoListMacine';
import Task from 'components/Task'

export interface TodoListProps {
  tasks: Todo[]
  send: any
}
 
const TodoList: FC<TodoListProps> = ({ tasks, send }) => {

  const [filterby, setFilterBy] = useState('all')
  const [filteredTasks, setFilteredTasks] = useState<Todo[]>([])

  useEffect(() => {
    
    setFilteredTasks(filterTasks())

  }, [tasks, filterby])

  const filterTasks = () : Todo[] => {
    
    if (filterby === 'all') return tasks

    if (filterby === 'completed') return tasks.filter((task) => task.completed)

    if (filterby === 'active') return tasks.filter((task) => !task.completed)

  }

  return ( 

    <div className="container mx-auto">

      { tasks.length > 0 && (
        <div className = "flex justify-between items-center">
          <h2>Todos: </h2>

          <div>
            <button
              onClick = { () => setFilterBy('all') }
            >
              All
            </button>

            <button 
              className = "mx-2"
              onClick = { () => setFilterBy('completed') }
            >
              Completed
            </button>

            <button
              onClick = { () => setFilterBy('active') }
            >
              Active
            </button>
          </div>

        </div>
      )}

      <ul>
        {filteredTasks.map((task: Todo) => (
          
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