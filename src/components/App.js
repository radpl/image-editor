import React, { Component } from 'react';
import './App.css';
import ImageEditor from './editor/ImageEditor';
import BackgroundContainer from './background/BackgroundContainer';
import LogoContainer from './logo/LogoContainer';
import background from '../assets/bgAssets';


export default class App extends Component {
  constructor() {
    super()

    this.state = {
      background: background.empty
    }

    this.handleSelectBg = this.handleSelectBg.bind(this);
    this.handleDeleteBg = this.handleDeleteBg.bind(this);
  }

  handleSelectBg(image) {
    this.setState({
      background: image
    })

  }
  handleDeleteBg(image) {
    this.setState({
      background: background.empty
    })

  }
  render() {
    return (
      <div className="container">
        <div className="app-header">
          <h1>Image Editor</h1>
        </div>
        <div className="columns">
          <div className="left-sidebar">
            <BackgroundContainer
              handleSelectBg={this.handleSelectBg}
              handleDeleteBg={this.handleDeleteBg}
            />
          </div>
          <div className="main-panel">
            <ImageEditor
              selectedBackground={this.state.background}
            />
          </div>
          <div className="right-sidebar">
            <LogoContainer />
          </div>
        </div>
      </div>
    );
  }
}

