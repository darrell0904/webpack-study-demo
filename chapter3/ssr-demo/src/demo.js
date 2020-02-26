// 新增一个依赖
// const React = require('react');
// const Home = require('./home');

// const bg = require('./assets/lufei.jpg');
// const s = require('./index.less');

import React from 'react';
import Home from './home';
import './index.less';
import bg from './assets/lufei.jpg';

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     name: 1,
  //     demoList: {},
  //   };
  // }

  // addNum = () => {
  //   this.setState({
  //     name: this.state.name + 1,
  //   })
  // }

  render() {
    // const { name, demoList } = this.state;
    // const {data} = demoList;
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;

// module.exports = <App />;
