import '@babel/polyfill';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import jquery from 'jquery';
import _ from 'lodash';
import bg from './assets/build.png'
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="navcontact">
        HomePage
        <img src={ bg } /> 
      </div>
    );
  }
}

export default Home;
