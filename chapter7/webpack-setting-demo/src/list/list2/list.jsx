import '@babel/polyfill';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import React, { Component } from 'react';
import aliasText from 'alias'

class List extends Component {
  render() {
    return <div>ListPage {aliasText} </div>;
  }
}

export default List;
