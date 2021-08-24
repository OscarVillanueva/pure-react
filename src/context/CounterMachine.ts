import { createMachine, assign } from "xstate";

type CounterEvent = 
  | { type: 'INC' }
  | { type: 'DEC' }

type CounterContext = {
  count: number
}

const CounterMachine = createMachine<CounterContext, CounterEvent>(
  {
    id: 'counter',
    initial: 'idle',
    context: {
      count: 0
    },
    states: {
      idle: {
        on: {
          INC: {
            actions: ['increment']
          },
          DEC: {
            actions: ['decrement']
          }
        }
      }
    }
  },
  {
    actions: {
      increment:  assign({ count: (context, event) => context.count + 1 }),
      decrement: assign({ count: (context, event) => context.count > 0 ? context.count - 1 : 0 }),
    }
  }
)  

export default CounterMachine