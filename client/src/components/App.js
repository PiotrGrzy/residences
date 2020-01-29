import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactNotifications from 'react-notifications-component';

import NavBar from './layout/navbar/NavBar';
import Footer from './layout/footer/Footer';
import Start from './layout/start/Start';
import Login from './user/Login';
import Register from './user/Register';
import HomesList from './homes/HomesList';
import SingleHome from './homes/SingleHome';
import AddHome from './homes/AddHome';
import UsersHomes from './user/UsersHomes';
import { getUser } from '../actions';

import './app.scss';
export const history = createBrowserHistory();

const App = props => {
  useEffect(() => {
    props.getUser();
  }, []);

  return (
    <Router history={history}>
      <div className="App">
        <ReactNotifications />
        <NavBar />
        <main className="main">
          <Route path="/" exact component={Start} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/homes" exact component={HomesList} />
          <Route path="/homes/:id" exact component={SingleHome} />
          <Route path="/usershomes" exact component={UsersHomes} />
          <Route path="/add" exact component={AddHome} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default connect(null, { getUser })(App);
