import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import './App.css';
import ItemsView from './Components/ItemsView/ItemsView';
import { BrowserRouter as Router } from 'react-router-dom';
import config from "./config.js";
import Auth0Provider from './auth0-provider'
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/ItemsView/Navbar';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import MyRequest from './Components/ItemsView/MyRequest';

const App = () => {

    const {
      user,
      isAuthenticated
    } = useAuth0();

    localStorage.setItem('uuid', user?.sub)
    console.log(user);
    return (
      <>
           <Navbar></Navbar>
            <Switch>
                <Route path="/requests">
                  <MyRequest {...user}></MyRequest>
                </Route>
                <Route path="/"  exact>
                  <ItemsView user={user} isAuthenticated={isAuthenticated} />
                </Route>
            </Switch>
          
          
      </>
   
    )
}

export default App
