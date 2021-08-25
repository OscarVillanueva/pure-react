import { createMachine, assign} from 'xstate'

type TodoListEvents = 
  | { type: 'INPUT', data: string }
  | { type: 'SAVE' }

type TodoListContext = {
  tasks: string[],
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