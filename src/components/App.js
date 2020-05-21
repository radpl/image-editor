import React, { Component } from 'react';
import './App.css';
import ImageEditor from './editor/ImageEditor';
import BackgroundContainer from './background/BackgroundContainer';
import LogoContainer from './logo/LogoContainer';
import background from '../assets/bgAssets';
import { getRandom, getRandomLogos, toDataUrl, searchImages } from '../api/sourceApi';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      background: background.empty,
      images: [],
      logos: [],
      addedTexts: {},
      renderText: { status: false, initial: true, value: "", font: "" }
    }

    this.handleSelectBg = this.handleSelectBg.bind(this);
    this.handleDeleteBg = this.handleDeleteBg.bind(this);
    this.handleAddText = this.handleAddText.bind(this);
    this.handleSearchImages = this.handleSearchImages.bind(this);
    this.setInitialPosition = this.setInitialPosition.bind(this);
    this.handleTextMove = this.handleTextMove.bind(this);
    this.mainHandleTextClick = this.mainHandleTextClick.bind(this);
    this.mainHandleTextDelete = this.mainHandleTextDelete.bind(this);
    this.handleFontSizeUpdate = this.handleFontSizeUpdate.bind(this);
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

  handleAddText(value, font, color, render = true) {
    const tmp = Object.assign({}, this.state.addedTexts);
    let id = Object.keys(tmp).length + 1;

    tmp[id] = { left: 200, top: 120, clicked: false, render, value, font, color, fontSize: 20 };
    this.setState({
      addedTexts: { ...tmp }
    });

  }

  handleFontSizeUpdate(id, change) {
    const temp = Object.assign({}, this.state.addedTexts);
    let fontSize = 20 + (-change);
    if (fontSize < 5) fontSize = 5;
    if (fontSize > 50) fontSize = 50;
    temp[id] = { ...temp[id], fontSize };
    this.setState({
      addedTexts: { ...temp }
    });
  }

  mainHandleTextDelete(id) {
    const tmp = Object.assign({}, this.state.addedTexts);
    const item = tmp[id];

    tmp[id] = { ...item, clicked: false, render: false };
    this.setState({
      addedTexts: { ...tmp }
    });

  }

  handleTextMove(id, left, top) {
    const temp = Object.assign({}, this.state.addedTexts);
    temp[id] = { ...temp[id], left, top };
    this.setState({
      addedTexts: { ...temp }
    });
  }

  mainHandleTextClick(event) {
    const element = event.target;
    const temp = Object.assign({}, this.state.addedTexts);
    const el = temp[element.id];
    el.clicked = !el.clicked;

    this.setState({
      addedTexts: { ...temp }
    });
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
      this.getRandomLogos(3);
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
  getRandomLogos(number) {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        getRandomLogos().then((response) => {
          toDataUrl(response.url).then(img => {
            this.setState(prevState => ({
              logos: [...prevState.logos, "data:image/png[jpg];base64," + img]
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
              logoImages={this.state.logos}
              addedTexts={this.state.addedTexts}
              handleTextMove={this.handleTextMove}
              mainHandleTextClick={this.mainHandleTextClick}
              mainHandleTextDelete={this.mainHandleTextDelete}
              handleFontSizeUpdate={this.handleFontSizeUpdate}
            />
          </div>
          <div className="right-sidebar">
            <LogoContainer handleAddText={this.handleAddText} logos={this.state.logos} addedTexts={this.state.addedTexts} />
          </div>
        </div>
      </div>
    );
  }
}

