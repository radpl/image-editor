import React, { useState, useEffect } from 'react';
import './MainEditor.css';
import ImageEditor from './editor/ImageEditor';
import BackgroundContainer from './background/BackgroundContainer';
import LogoContainer from './logo/LogoContainer';
import background from '../assets/bgAssets';
import { getRandom, getRandomLogos, toDataUrl, searchImages } from '../api/sourceApi';
import NavBar from "./login/NavBar";
import { useAuth0 } from "../react-auth0-spa";

export default function MainEditor(props) {

  const [bgState, setBackground] = useState(background.empty);
  const [images, setImages] = useState([]);
  const [logos, setLogos] = useState([]);

  const handleSelectBg = (image) => {
    setBackground(image);
  }

  const handleDeleteBg = (image) => {
    setBackground(background.empty)
  }

  const handleSearchImages = (searchTerm) => {
    setImages([]);
    getSearchedImages(4, searchTerm);
  }


  useEffect(() => {
    if (images.length === 0) {
      getRandomImages(4);
      getRandomLogosFetch(3);
    }
  }, [])

  const getRandomImages = (number) => {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        getRandom().then((response) => {
          toDataUrl(response.url).then(img => {
            setImages(oldArray => [...oldArray, "data:image/png[jpg];base64," + img]);
          });
        });
      }, 2000 * i)

    }
  }
  const getRandomLogosFetch = (number) => {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        getRandomLogos().then((response) => {
          toDataUrl(response.url).then(img => {
            setLogos(oldArray => [...oldArray, "data:image/png[jpg];base64," + img]);
          });
        });
      }, 2000 * i)

    }
  }

  const getSearchedImages = (number, serachTerm) => {
    for (let i = 0; i < number; i++) {
      setTimeout(() => {
        searchImages(serachTerm).then((response) => {
          toDataUrl(response.url).then(img => {
            setImages(oldArray => [...oldArray, "data:image/png[jpg];base64," + img]);
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
            handleSearchImages={handleSearchImages} backgroundImages={images} />
        </div>
        <div className="main-panel">
          <ImageEditor selectedBackground={bgState} backgroundImages={images} logoImages={logos} />
        </div>
        <div className="right-sidebar">
          <LogoContainer logos={logos} />
        </div>
      </div>
    </div>
  );
}

