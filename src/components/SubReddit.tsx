import React, { FC, useMemo } from 'react'
import { useService } from '@xstate/react';


export interface SubreddditProps {
  service: any
}
 
const Subreddit: FC<SubreddditProps> = ({ service }) => {
  
  const [current, send] = useService(service)

  const { subreddit, posts, lastUpdated } : any = current.context;

  const transFromDate = (lastUpdate: number) : string => {
    
    const date = new Date(lastUpdate)
    const hours = date.getHours()
    const minutes = "0" + date.getHours()

    return hours + ':' + minutes.substr(-2)

  }

  return current.matches('failure') ? ( 
    <div>
      Failed to load posts.{' '}
      <button onClick={(_) => send('RETRY')}>Retry?</button>
    </div>
  ) : (
    
    <section
      className = "card mt-4 shadow-2xl p-8 max-h-100 overflow-scroll"
      data-machine={service.machine.id}
      data-state={current.toStrings().join(' ')}
    >
      <p 
        className = "badge block mb-4"
      >
        Subreddit Machine state: {current.value}
      </p>

      {current.matches('loading') && <div>Loading posts...</div>}

      {posts && (
        <>
          <header>

            <h2 className = "text-center font-bold text-xl uppercase">
              Posts of {subreddit}
            </h2>

            <div className = "flex justify-center	">

              <small className  = "mr-2">
                Last updated: {transFromDate(lastUpdated)} hrs
              </small>

              <button
                onClick={(_) => send('REFRESH')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

            </div>

          </header>

          <ul className = "">

            {posts.map(post => (

              <li 
                key={post.id}
                className = "p-4 border-b border-gray-600"
              >
                {post.title}
              </li>
              
            ))}

          </ul>
        </>
      )}

    </section>
  );
}
 
export default Subreddit;