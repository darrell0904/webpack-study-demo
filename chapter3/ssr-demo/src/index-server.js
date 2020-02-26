import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import Home from './home';

class App extends React.Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default renderToString(<App />);
