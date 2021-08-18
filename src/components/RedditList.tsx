import React, { FC, useState, useEffect } from 'react'
import { useMachine } from '@xstate/react';

// context
import RedditMachine from '../context/RedditMachine'

// components
import Layout from './Layout'
import SubReddit from './SubReddit'

const RedditList: FC = () => {

  const [current, send] = useMachine(RedditMachine);
  const { subreddit } = current.context;
  
  const [ subreddits ] = useState(['frontend', 'reactjs', 'vuejs'])

  useEffect(() => {
    if (subreddit)
      console.log(`subreddit`, subreddit.machine.context.subreddit)
  }, [subreddit]) 

  return ( 

    <Layout>

      <header>

        <p>{current.value}</p>

        <select
          value = { subreddit ? subreddit.machine.context.subreddit : "a" }
          onChange={(e) => {
            send('SELECT', { name: e.target.value });
          }}
        >
          <option value="a" disabled>Select a subredit</option>
          {subreddits.map((subreddit) => {
            return <option key={subreddit}>{subreddit}</option>;
          })}
        </select>

      </header>
        
      { current.matches('idle') && <h1>Select a subreddit</h1> }
      { subreddit && (
        <SubReddit 
          service = { subreddit } 
          key = { subreddit.machine.id } 
        />
      )}

    </Layout>

  );
}
 
export default RedditList;