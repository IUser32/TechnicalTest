import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RentPanel from './RentPanel'
import ReturnPanel from './ReturnPanel'
import Home from './Home'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const RouteLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <li>
        <Link to={to}>{label}</Link>
      </li>
    )}
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                  <a className="navbar-brand" href="#">RentMovie</a>
              </div>
              <ul className="nav navbar-nav">
                <RouteLink activeOnlyWhenExact={true} to="/" label="Home" />
                <RouteLink to="/rent" label="Rent" />
                <RouteLink to="/return" label="Return" />
              </ul>
            </div>
          </nav>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/rent" component={RentPanel} />
            <Route path="/return" component={ReturnPanel} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
