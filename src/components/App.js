import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from "./login/NavBar";
//import { useAuth0 } from "../react-auth0-spa";
//import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainEditor from './MainEditor';
import Profile from './login/Profile';
import Callback from "./login/Callback";
import LoginForm from "./login/LoginForm";
import Canvas from "./editor/Canvas";
import BrowseContainer from './browser/BrowseContainer';

export default function App(props) {

  //const { loading } = useAuth0();

  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route exact path='/' component={MainEditor} />
        <Route exact path='/callback' component={Callback} />
        <Route path='/profile' component={Profile} />
        <Route path='/draw' component={Canvas} />
        <Route path='/browse' component={BrowseContainer} />
        <Route path='/edit/:imageId' component={MainEditor} />
      </Switch>
    </div>
  );
}

