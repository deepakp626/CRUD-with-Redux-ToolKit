import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-e8232ppp7gbr35db.us.auth0.com"
      clientId="jSqbnAruUxfkm6tMGRBPmpBYbVz95gBz"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)
