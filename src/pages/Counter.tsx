import React, { FC, useEffect, useRef } from 'react'
import { useMachine } from '@xstate/react';

// Machines
import CounterMachine from 'context/CounterMachine'

const Counter: FC = () => {

  const [machine, send] = useMachine(CounterMachine)

  const counter = useRef<any>()

  useEffect(() => {
    
    if( counter.current ) {
      counter.current.setAttribute("style", `--value: ${machine.context.count};`)
    }

  }, [machine.context])

  const handleIncrement = () => {
    send({
      type: 'INC'
    })
  }

  const handleDecrement = () => {
    send({
      type: 'DEC'
    })
  }

  return ( 
    <div className="flex flex-col justify-center items-center w-100 h-screen">

      <span className="font-mono text-6xl countdown">
        <span ref = { counter }></span>
      </span>

      <div className="flex mt-10">

        <button 
          className="btn mr-8 btn-primary"
          onClick = { handleIncrement }
        >

          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </button> 

        <button 
          className="btn"
          onClick = { handleDecrement }
          disabled = { machine.context.count === 0 }
        >

          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </button> 
      </div>
    </div>
  );
}
 
export default Counter