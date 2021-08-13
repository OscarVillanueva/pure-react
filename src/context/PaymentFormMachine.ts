import { createMachine, assign } from "xstate";

type PaymentEvent = { 
  type: 'SUBMIT'
  data: {
    name: string,
    card: string
  }
}

interface PaymentContext {
  msg: string
}

const PaymentFormMachine = createMachine<PaymentContext, PaymentEvent>(
  {
    initial: 'idle',
    context: {
      msg: '',
    },
    states: {
      idle: {
        on: {
          SUBMIT: [
            {
              target: 'loading',
              cond: 'validForm'
            },
            {
              target: 'error'
            }
          ]
        },
      },
      loading: {
        invoke: {
          id: 'doPayment',
          src: (context, event) => facePayment(event.data.card),
          onDone: {
            target: 'success',
            actions: assign({ msg: (context, event) => event.data })
          },
          onError: {
            target: 'error',
            actions: assign({ msg: (context, event) => event.data })
          }
        }
      },
      error: {
        on: {
          SUBMIT: {
            target: 'loading',
            cond: 'validForm'
          }
        }
      },
      success: {
        type: 'final',
      }
    },
  },
  {
    guards: {
      validForm: (context, event) => {
        
        if (event.data.name === '' && event.data.card === '') {
          context.msg = "All inputs are required"
          return false
        }

        return true

      }
    }
  }
);

const facePayment = (card : string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (card.length > 4) resolve("Payment succeded")

      else reject("Card should have more than 4 characters")

    }, 2500)
  })
}

export default PaymentFormMachine;