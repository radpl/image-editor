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
      background: background.empty,
      renderText: {
        status: false,
        value: "",
        font: ""
      }
    }

    this.handleSelectBg = this.handleSelectBg.bind(this);
    this.handleDeleteBg = this.handleDeleteBg.bind(this);
    this.handleAddText = this.handleAddText.bind(this);
  }

  handleSelectBg(image) {
    this.setState({ background: image });

  }
  handleDeleteBg(image) {
    this.setState({ background: background.empty })
  }

  handleAddText(status, value, font) {
    const temp = { ...this.state.renderText, status, value, font };
    this.setState({
      renderText: temp
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
              renderText={this.state.renderText}
              handleAddText={this.handleAddText}
            />
          </div>
          <div className="right-sidebar">
            <LogoContainer handleAddText={this.handleAddText} />
          </div>
        </div>
      </div>
    );
  }
}

