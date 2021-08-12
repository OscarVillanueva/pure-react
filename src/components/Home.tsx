import React, { FC } from 'react'
import { createMachine } from "xstate";

// Components
import Layout from './Layout'

const stateMachin = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: 'loading'
      },
    },
    loading: {
      on: {
        PAYMENT_RECEIVED: 'success',
        PAYMENT_FAILED: 'error',
      }
    },
    error: {
      on: {
        SUBMIT: 'loading',
      }
    },
    success: {
      type: 'final',
    }
  }
})

const Home: FC = () => {
  return ( 
    <Layout>

      <div className="flex flex-col justify-center items-center w-100 h-screen">

        <div className="card text-center shadow-2xl">
          <div className="card-body">
            <h2 className="card-title text-3xl">
              State Machine Payment Form
            </h2> 

            <div className="p-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Name on card</span>
                </label> 
                <input 
                  type="text" 
                  placeholder="Name on card" 
                  className="border p-2 rounded-lg focus:outline-none bg-base-100" 
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
                />
              </div>

              <button 
                className="btn mt-8 w-full"
              >
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