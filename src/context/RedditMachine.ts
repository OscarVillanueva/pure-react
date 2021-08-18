import { createMachine, assign, spawn } from "xstate";

type RedditMachineEvents = {
  type: 'SELECT',
  name: string
}

type RedditMachineContext = {
  subreddit: null | any,
  subreddits: object
}

const invokeFetchSubreddit = async (context: any) : Promise<string[]> => {
  const { subreddit } = context;

  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)

  const json = await response.json()

  return json.data.children.map((child: any) => child.data)
}

const RedditMachine = createMachine<RedditMachineContext, RedditMachineEvents >({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddits: {},
    subreddit: null,
  },
  states: {
    idle: {},
    selected:{}
  },
  on: {
    SELECT: {
      // Se le ponen en punto porque es un hijo de states
      target: ".selected",
      actions: assign((context, event) => {

        // Use the existing subreddit actor if one already exists
        let subreddit = context.subreddits[event.name];

        if (subreddit) {
          return {
            ...context,
            subreddit
          }
        }

        // Otherwise, spawn a new subreddit actor and
        // save it in the subreddits object
        subreddit = spawn(createSubredditMachine(event.name));

        return {
          subreddits: {
            ...context.subreddits,
            [event.name]: subreddit
          },
          subreddit
        };

      })
    }
  }
})

export const createSubredditMachine = (subreddit: string) => {
  return createMachine({
    id: 'subreddit',
    initial: 'loading',
    context: {
      subreddit, // subreddit name passed in
      posts: null,
      lastUpdated: null
    },
    states: {
      loading: {
        invoke: {
          id: 'fetchSubreddit',
          src: invokeFetchSubreddit,
          onDone: {
            target: 'loaded',
            actions: assign({
              posts: (_, event) => event.data,
              lastUpdated: () => Date.now()
            })
          },
          onError: 'failure'
        }
      },
      loaded: {
        on: {
          REFRESH: 'loading'
        }
      },
      failure: {
        on: {
          RETRY: 'loading'
        }
      }
    }
  })
}

export default RedditMachine;