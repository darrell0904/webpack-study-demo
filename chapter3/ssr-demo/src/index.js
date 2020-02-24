import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Home from './home';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
