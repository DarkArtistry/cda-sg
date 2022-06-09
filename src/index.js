import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import configureStore from './app/configureStore';


const store = configureStore({ })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      {/* NavBar Component Here */}
      {/* Drawer Component Here */}
        <App />
      {/* Footer Component Here */}
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
