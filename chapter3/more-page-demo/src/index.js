import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  render() {
    return <div style={{ textAlign: 'center' }}>首页</div>;
  }
}

ReactDom.render(<App />, document.getElementById('root'));
