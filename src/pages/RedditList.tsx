import React, { FC, useState, useEffect } from 'react'
import { useMachine } from '@xstate/react';

// context
import RedditMachine from 'context/RedditMachine'

// components
import Layout from 'components/Layout'
import SubReddit from 'components/SubReddit'

const RedditList: FC = () => {

  const [current, send] = useMachine(RedditMachine);
  const { subreddit } = current.context;
  
  const [ subreddits ] = useState(['frontend', 'reactjs', 'vuejs'])

  return ( 

    <Layout>

      <header>

        <h1
          className = "text-center text-4xl uppercase font-bold mt-10"
        >
          Reddit posts
        </h1>

        <p className = "badge block mb-4">
          Reddit Machine State: {current.value}
        </p>

        <select
          className = "select select-bordered w-full max-w-xs"
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
        
      { current.matches('idle') && ( 

        <h1 className = "text-center mt-10 font-bold text-2xl">
          Select a subreddit
        </h1> 

      )}
      
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