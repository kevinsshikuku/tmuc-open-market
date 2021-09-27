import dotenv from 'dotenv'
import googleAnalytics from '@analytics/google-analytics';
import Analytics from 'analytics';
dotenv.config();
/* Initialize analytics & load plugins */


/** my custom plugin */
const myPlugin = {
    name:"my_custon_plugin",
    page: ({payload}) => {
      console.log("page view fired", payload)
    },
    track: ({payload}) => {
      console.log("track event", payload)
    }
  }

/**Analytics */
export const analytics = Analytics({
  app: 'windoshoppe',
  plugins: [
     myPlugin,
     googleAnalytics({
       trackingId: process.env.REACT_GA
    })
  ]
})
