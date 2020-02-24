import React, { Component } from 'react';
import './index.less';
import bg from './assets/lufei.jpg';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        HomePage
        <img src={bg} alt="bg" />
      </div>
    );
  }
}

export default Home;
