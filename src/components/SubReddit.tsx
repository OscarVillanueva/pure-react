import React, { FC, useMemo } from 'react'
import { useService } from '@xstate/react';


export interface SubreddditProps {
  service: any
}
 
const Subreddit: FC<SubreddditProps> = ({ service }) => {
  
  const [current, send] = useService(service)

  const { subreddit, posts, lastUpdated } : any = current.context;

  return current.matches('failure') ? ( 
    <div>
      Failed to load posts.{' '}
      <button onClick={(_) => send('RETRY')}>Retry?</button>
    </div>
  ) : (
    
    <section
      data-machine={service.machine.id}
      data-state={current.toStrings().join(' ')}
    >
      <p>{current.value}</p>

      {current.matches('loading') && <div>Loading posts...</div>}

      {posts && (
        <>
          <header>

            <h2>{subreddit}</h2>

            <small>

              Last updated: {lastUpdated}{' '}
              <button onClick={(_) => send('REFRESH')}>Refresh</button>
            </small>

          </header>
          <ul>

            {posts.map((post) => {
              return <li key={post.id}>{post.title}</li>;
            })}
            
          </ul>
        </>
      )}

    </section>
  );
}
 
export default Subreddit;