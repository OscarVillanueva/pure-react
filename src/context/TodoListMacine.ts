import { createMachine, assign} from 'xstate'
import shortid from 'shortid';

type TodoListEvents = 
  | { type: 'INPUT', data: string }
  | { type: 'TOGGLE', data: string }
  | { type: 'DELETE', data: string }
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
      },
      DELETE: {
        target: '.idle',
        actions: ['onDelete']
      }
    }
  },
  {
    actions: {
      onChange: assign({ task: (context, event) => event.type === 'INPUT' ? event.data : "" }),

      toggleTask: assign((context, event) => {

        if (event.type !== 'TOGGLE') return context

        const { tasks } = context

        let i = 0;
        let flag = true
        let newTasks: Todo[] = [...tasks]
        
        while (flag) {

          if (newTasks[i].id === event.data){
            const newTask : Todo = newTasks[i]
            newTask.completed = !newTask.completed
            newTasks.splice(i, 1)

            if (newTask.completed) newTasks.push(newTask)
            else newTasks.unshift(newTask)

            flag = false
          }

          i = i + 1;

        }

        return {
          ...context,
          tasks: newTasks
        }
      }),

      onSave: assign((context, event) => {
        return {
          ...context,
          tasks: [ 
            {
              id: shortid.generate(), 
              name: context.task, 
              completed: false
            },
            ...context.tasks, 
          ],
          task: ""
        }
      }),

      onDelete: assign((context, event) => {

        if (event.type !== 'DELETE') return context

        return {
          ...context,
          tasks: context.tasks.filter((task: Todo) => task.id !== event.data),
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