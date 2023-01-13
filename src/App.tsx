import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { LandingPage } from './LandingPage';
import store from './Store';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </div>
  );
}

export default App;
