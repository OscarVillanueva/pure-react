import React, { FC } from 'react'

export interface TodoListProps {
  tasks: string[]
}
 
const TodoList: FC<TodoListProps> = ({ tasks }) => {
  return ( 

    <div className="container mx-auto">
      {tasks.map(task => (
        <li>{task}</li>
      ))}
    </div>

  );
}
 
export default TodoList;