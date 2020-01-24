import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.scss';

import NavBar from './layout/navbar/NavBar';
import Footer from './layout/footer/Footer';
import Start from './layout/start/Start';
import Login from './user/Login';
import Register from './user/Register';
import HomesList from './homes/HomesList';
import SingleHome from './homes/SingleHome';
import AddHome from './homes/AddHome';

const App = props => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main">
          <Route path="/" exact component={Start} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/homes" exact component={HomesList} />
          <Route path="/homes/:id" exact component={SingleHome} />
          <Route path="/add" exact component={AddHome} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
