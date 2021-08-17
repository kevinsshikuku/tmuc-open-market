import React from 'react';
import { hydrate, render} from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter} from 'react-router-dom';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { createApolloClient } from './Utils/apollo_client';
import { StoreProvider } from './store';
import { PostProvider } from "./store/posts";
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthUserProvider} from "./Utils/authUserContext";
import {CloudinaryContext} from 'cloudinary-react';

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_API_URL;

// GraphQL WebSocket (subscriptions) URL.
// If its url is not set in .env then it has same url, host and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL;
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
  : API_URL.replace('https://', 'ws://').replace('http://', 'ws://');

const apolloClient = createApolloClient(API_URL, websocketApiUrl);
const rootElement = document.getElementById('root');
// const cloudName = process.env.CLOUDINARY_CLOUD_NAME

if(rootElement.hasChildNodes()){
  hydrate(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
         <PostProvider>
          <StoreProvider>
            <BrowserRouter>
                <AuthUserProvider>
                      <CloudinaryContext cloudName="dsvun26ld">
                          <App/>
                      </CloudinaryContext>
                </AuthUserProvider>
            </BrowserRouter>
          </StoreProvider>
        </PostProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root') // we're running in browser
  )
} else {
  render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <PostProvider>
          <StoreProvider>
            <BrowserRouter>
                <AuthUserProvider>
                    <CloudinaryContext cloudName="dsvun26ld">
                      <App/>
                    </CloudinaryContext>
                </AuthUserProvider>
            </BrowserRouter>
          </StoreProvider>
        </PostProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root') // we're running on server
  )
}

serviceWorkerRegistration.register();
