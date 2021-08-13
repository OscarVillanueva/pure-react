import React, { FC, useState, useEffect } from 'react'
import { useMachine } from '@xstate/react';

// Context
import PaymentFormMachine from '../context/PaymentFormMachine'

// Components
import Layout from './Layout'


const Home: FC = () => {

  // Machine es el estado actual y send para enviar datos
  const [machine, send] = useMachine(PaymentFormMachine);

  // State del formulario
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  useEffect(() => {
    
    console.log(`machine.value`, machine.value)

  }, [machine])

  // Send form to internet
  const handleClick = () : void => {
    send({
      type: 'SUBMIT',
      data: {
        name: cardName,
        card: cardNumber
      }
    })
  }

  return ( 
    <Layout>

      <div className="flex flex-col justify-center items-center w-100 h-screen">

        <div className="card text-center shadow-2xl">
          <div className="card-body">
            <h2 className="card-title text-3xl">
              State Machine Payment Form
            </h2> 

            { machine.matches('error') && (

              <div className="alert alert-error">
                <div className="flex-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    className="w-6 h-6 mx-2 stroke-current"
                  >    
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    >
                    </path>                      
                  </svg> 

                  <label>
                    { machine.context.msg && machine.context.msg}
                  </label>

                </div>
              </div>
            )}

            { machine.matches('success') && (

              <div className="alert alert-success">
                <div className="flex-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mx-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                  </svg>

                  <label>
                    { machine.context.msg && machine.context.msg}
                  </label>

                </div>
              </div>
            )}

            <div className="p-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Name on card</span>
                </label> 
                <input 
                  type="text" 
                  placeholder="Name on card" 
                  className="border p-2 rounded-lg focus:outline-none bg-base-100" 
                  value = { cardName }
                  onChange = { e => setCardName( e.target.value )}
                />
              </div>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text text-lg">Card Number</span>
                </label> 
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  className="border p-2 rounded-lg focus:outline-none bg-base-100" 
                  value = { cardNumber }
                  onChange = { e => setCardNumber( e.target.value )}
                />
              </div>

              <button 
                className="btn mt-8 w-full"
                onClick = { handleClick }
              >

                { machine.matches('loading') && (

                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>

                )}

                Pay Now
              </button> 

            </div>

          </div>
        </div> 

      </div>

    </Layout>
  );
}
 
export default Home;