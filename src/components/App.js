import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from "./login/NavBar";
import MainEditor from './MainEditor';
import Profile from './login/Profile';
import Callback from "./login/Callback";
import Canvas from "./editor/Canvas";
import BrowseContainer from './browser/BrowseContainer';
import './App.css';

export default function App(props) {

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

