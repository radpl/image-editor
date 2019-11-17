import React, { Component } from 'react';
import './App.css';
import ImageEditor from './editor/ImageEditor';
import BackgroundContainer from './background/BackgroundContainer';
import LogoContainer from './logo/LogoContainer';
import background from '../assets/bgAssets';
import { getRandom, toDataUrl, searchImages } from '../api/sourceApi';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      background: background.empty,
      images: [],
      renderText: { status: false, initial: true, value: "", font: "" }
    }

    this.handleSelectBg = this.handleSelectBg.bind(this);
    this.handleDeleteBg = this.handleDeleteBg.bind(this);
    this.handleAddText = this.handleAddText.bind(this);
    this.handleSearchImages = this.handleSearchImages.bind(this);
    this.setInitialPosition = this.setInitialPosition.bind(this);
  }

  handleSelectBg(image) {
    this.setState({ background: image });

  }

  handleDeleteBg(image) {
    this.setState({ background: background.empty })
  }

  setInitialPosition(value) {
    const temp = { ...this.state.renderText, initial: value };
    this.setState({
      renderText: temp
    })
  }

  handleAddText(status, initial, value, font, color) {
    const temp = { ...this.state.renderText, status, value, font, color };
    this.setState({
      renderText: temp
    })
  }

  handleSearchImages(searchTerm) {
    this.setState({
      images: []
    })
    this.getSearchedImages(4, searchTerm);
  }

  componentDidMount() {
    if (this.state.images.length === 0) {
      this.getRandomImages(4);
    }
  }

  getRandomImages(number) {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        getRandom().then((response) => {
          toDataUrl(response.url).then(img => {
            this.setState(prevState => ({
              images: [...prevState.images, "data:image/png[jpg];base64," + img]
            }));
          });
        });
      }, 4000 * i)

    }
  }

  getSearchedImages(number, serachTerm) {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        searchImages(serachTerm).then((response) => {
          toDataUrl(response.url).then(img => {
            this.setState(prevState => ({
              images: [...prevState.images, "data:image/png[jpg];base64," + img]
            }));
          });
        });
      }, 4000 * i)

    }
  }

  render() {
    return (
      <div className="container">

        <div className="columns">
          <div className="left-sidebar">
            <BackgroundContainer
              handleSelectBg={this.handleSelectBg}
              handleDeleteBg={this.handleDeleteBg}
              handleSearchImages={this.handleSearchImages}
              backgroundImages={this.state.images}

            />
          </div>
          <div className="main-panel">
            <ImageEditor
              selectedBackground={this.state.background}
              renderText={this.state.renderText}
              handleAddText={this.handleAddText}
              backgroundImages={this.state.images}
              setInitialPosition={this.setInitialPosition}
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

