import React, { useEffect } from 'react';
import { connect } from "react-redux";
import ImageEditor from './editor/ImageEditor';
import BackgroundContainer from './background/BackgroundContainer';
import LogoContainer from './logo/LogoContainer';
import background from '../assets/bgAssets';
import { getRandom, getRandomLogos, toDataUrl, searchImages } from '../api/sourceApi';
import DrawContainer from "./text/DrawContainer";
import { getImageLogos, saveImageLogosRemote } from "../redux/actions/logoActions";
import { getImageBackgrounds, saveImageBackgroundsRemote, selectedBackground, clearImageBackgrounds } from "../redux/actions/backgroundActions";
import './MainEditor.css';

function MainEditor(props) {

  const handleSelectBg = (imageId) => {
    props.selectedBackground(imageId);
  }

  const handleDeleteBg = (image) => {
    props.selectedBackground(-1);
  }

  const handleSearchImages = (searchTerm) => {
    getSearchedImages(4, searchTerm);
  }

  useEffect(() => {
    if (props.match.params.imageId) {
      props.getImageLogos(props.match.params.imageId);
      props.getImageBackgrounds(props.match.params.imageId);

    } else {
      if (props.images.length === 0) {
        getRandomImages(4);
      }
      if (props.logoImages.length === 0) {
        getRandomLogosFetch(3);
      }
    }

  }, [])

  const getRandomImages = (number) => {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        getRandom().then((response) => {
          toDataUrl(response.url).then(img => {
            props.saveImageBackgroundsRemote("data:image/png[jpg];base64," + img);
            //setImages(oldArray => [...oldArray, "data:image/png[jpg];base64," + img]);
          });
        });
      }, 4000 * i)

    }
  }
  const getRandomLogosFetch = (number) => {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        getRandomLogos().then((response) => {
          toDataUrl(response.url).then(img => {
            props.saveImageLogosRemote("data:image/png[jpg];base64," + img);
            //setLogos(oldArray => [...oldArray, "data:image/png[jpg];base64," + img]);
          });
        });
      }, 4000 * i)

    }
  }

  const getSearchedImages = (number, serachTerm) => {
    props.clearImageBackgrounds();
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        searchImages(serachTerm).then((response) => {
          toDataUrl(response.url).then(img => {
            props.saveImageBackgroundsRemote("data:image/png[jpg];base64," + img);
            //setImages(oldArray => [...oldArray, "data:image/png[jpg];base64," + img]);
          });
        });
      }, 4000 * i)

    }
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="left-sidebar">
          <BackgroundContainer handleSelectBg={handleSelectBg} handleDeleteBg={handleDeleteBg}
            handleSearchImages={handleSearchImages} backgroundImages={props.backgrounds} />
        </div>
        <div className="main-panel">
          <ImageEditor selectedBackground={props.bgSelected} backgroundImages={props.backgrounds} logoImages={props.logoImages} />
        </div>
        <div className="right-sidebar">
          <LogoContainer logos={props.logoImages} />
          <DrawContainer />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user && state.user.db && state.user.db.user,
    images: state.images,
    backgrounds: state.backgrounds.backgrounds,
    bgSelected: state.backgrounds.selected > -1 ? state.backgrounds.backgrounds[state.backgrounds.selected] : background.empty,
    logoImages: (state.logos && state.logos.logoImages) || []
  };
}

const mapDispatchToProps = {
  getImageLogos,
  getImageBackgrounds,
  saveImageBackgroundsRemote,
  saveImageLogosRemote,
  selectedBackground,
  clearImageBackgrounds,

};

export default connect(mapStateToProps, mapDispatchToProps)(MainEditor)
