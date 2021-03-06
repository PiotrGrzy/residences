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
import UpdateHome from './homes/UpdateHome';
import UsersHomes from './user/UsersHomes';
import Loader from './utils/Loader';
import { getUser } from '../actions/userActions';
import { fetchHomes, setLoading } from '../actions/homeActions';

import './app.scss';
export const history = createBrowserHistory();

const App = props => {
  useEffect(() => {
    props.fetchHomes(props.query);
    // eslint-disable-next-line
  }, [props.query]);

  useEffect(() => {
    props.getUser();

    // eslint-disable-next-line
  }, []);

  if (props.loading) {
    return <Loader />;
  }

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
          <Route path="/update" exact component={UpdateHome} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    query: state.homes.currentQuery,
    loading: state.homes.loading
  };
};

export default connect(mapStateToProps, { getUser, fetchHomes, setLoading })(
  App
);
