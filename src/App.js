import React, { Component } from 'react';
import {NavComponent} from './NavComponent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class App extends Component {
 
  render() {
    return (
      <Router>
      <NavComponent></NavComponent>
      </Router>
    );
  }
}

