import { createMachine, assign} from 'xstate'

type TodoListEvents = 
  | { type: 'INPUT', data: string }
  | { type: 'SAVE' }

type TodoListContext = {
  tasks: string[],
  task: string
}

const TodoListMachine = createMachine<TodoListContext, TodoListEvents>(
  {
    id: 'TodoList',
    initial: 'idle',
    context: {
      tasks: [],
      task: ""
    },
    states: {
      idle: {},
      changed: {
        on: {
          SAVE: {
            target: 'idle',
            actions: ['onSave']
          }
        }
      }
    },
    on: {
      INPUT: {
        target: '.changed',
        actions: ['onChange']
      }
    }
  },
  {
    actions: {
      onChange: assign({ task: (context, event) => event.type === 'INPUT' ? event.data : "" }),
      onSave: assign((context, event) => {
        return {
          ...context,
          tasks: [ ...context.tasks, context.task ],
          task: ""
        }
      })
    }
  }
)

export default TodoListMachine