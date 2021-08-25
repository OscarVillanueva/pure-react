import { createMachine, assign} from 'xstate'
import shortid from 'shortid';

type TodoListEvents = 
  | { type: 'INPUT', data: string }
  | { type: 'TOGGLE', data: string }
  | { type: 'SAVE' }

export type Todo = {
  id: string,
  name: string,
  completed: boolean
}

type TodoListContext = {
  tasks: Todo[],
  task: string,
  msg: string
}

const TodoListMachine = createMachine<TodoListContext, TodoListEvents>(
  {
    id: 'TodoList',
    initial: 'idle',
    context: {
      tasks: [],
      task: '',
      msg: ''
    },
    states: {
      idle: {},
      changed: {
        on: {
          SAVE: [
            {
              target: 'idle',
              cond: 'validForm',
              actions: ['onSave']
            },
            {
              target: 'error'
            }
          ]
        }
      },
      error: {
        invoke: {
          id: 'doRemoveMessage',
          src: () => removeMessage(),
          onDone: {
            target: 'idle'
          }
        }
      }
    },
    on: {
      INPUT: {
        target: '.changed',
        actions: ['onChange']
      },
      TOGGLE: {
        target: '.idle',
        actions: ['toggleTask']
      }
    }
  },
  {
    actions: {
      onChange: assign({ task: (context, event) => event.type === 'INPUT' ? event.data : "" }),

      toggleTask: assign((context, event) => {

        if (event.type !== 'TOGGLE') return context

        console.log("entre")

        const { tasks } = context

        const newTasks : Todo[] = tasks.map((task: Todo) => {
          
          if ( task.id === event.data ) {
            return {
              ...task,
              completed: !task.completed
            }
          }

          return task

        })

        return {
          ...context,
          tasks: newTasks
        }
      }),

      onSave: assign((context, event) => {
        return {
          ...context,
          tasks: [ 
            ...context.tasks, 
            {
              id: shortid.generate(), 
              name: context.task, 
              completed: false
            }
          ],
          task: ""
        }
      })
    },

    guards: {
      validForm: (context, event) => {
        
        if (context.task.trim() === ''){
          context.msg = "Task name is required"
          return false
        }

        return true
      }
    }
  }
)

const removeMessage = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      resolve("")

    }, 2000)
  })
}

export default TodoListMachine