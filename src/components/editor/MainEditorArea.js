import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import SimpleButton from '../common/SimpleButton';
import styles from './MainEditorArea.module.css';
import { connect } from "react-redux";
import { addLogo, deleteLogo, saveLogo } from "../../redux/actions/logoActions";
import { saveBackgrounds } from "../../redux/actions/backgroundActions";

import { addText, deleteText } from "../../redux/actions/textActions";
import { saveUserImage } from "../../redux/actions/userActions";

import Canvas from './Canvas';

class MainEditorArea extends Component {

    moveLogo(id, left, top, width, height) {
        this.props.addLogo({ id, left, top, width, height, clicked: false, render: true });
    }

    resizeLogo(id, deltaLeft, deltaTop, width, height) {
        let widthChg = width + deltaLeft;
        this.props.addLogo({ ...this.props.logos[id], width: widthChg, height: widthChg });
    }

    resizeText(id, deltaLeft, deltaTop, width, height) {
        let change = (deltaTop + deltaLeft) / 2;
        let fontSize = 20 + (-change);
        if (fontSize < 5) fontSize = 5;
        if (fontSize > 50) fontSize = 50;
        this.props.addText({ ...this.props.texts[id], fontSize });
    }

    moveText(id, left, top) {
        const text = this.props.texts[id];
        this.props.addText({ ...text, left, top });
    }

    handleLogoClick = (event) => {
        const element = event.target;
        const logo = this.props.logos[element.id];
        const clicked = !logo.clicked;
        this.props.addLogo({ ...logo, clicked: clicked });
    }

    handleLogoDelete = (event) => {
        const element = event.target;
        const logo = this.props.logos[element.id];
        const render = !logo.render;
        this.props.addLogo({ ...logo, render: render });
    }

    handleTextClick = (event) => {
        const element = event.target;
        const text = this.props.texts[element.id];
        const clicked = !text.clicked;
        this.props.addText({ ...text, clicked: clicked });
    }

    handleTextDelete = (event) => {
        const element = event.target;
        const text = this.props.texts[element.id];
        const render = !text.render;
        this.props.addText({ ...text, render: render });
    }

    downloadImage = () => {
        let editorArea = document.querySelector('.download');
        var a = document.createElement('a');
        html2canvas(editorArea).then((canvas) => {
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'myImage.jpg';
            a.click();
        });
    }
    saveImage = () => {
        let editorArea = document.querySelector('.download');
        html2canvas(editorArea).then((canvas) => {
            const thumbnail = canvas.toDataURL("image/jpeg", 0.5);

            this.props.saveUserImage({
                user: this.props.user,
                image: {
                    name: "Some name",
                    description: "Some description",
                    texts: this.props.texts,
                    logos: this.props.logos
                },
                thumbnail: thumbnail
            }).then(response => {
                const imageid = response._id;
                this.props.saveLogo({ logos: this.props.logoImages, image: imageid });
                this.props.saveBackgrounds({ backgrounds: this.props.backgroundImages, image: imageid });
            });
        });



    }

    render() {
        const style = {
            width: "400px",
            height: "400px",
            backgroundColor: "white",
            textAlign: "center",
            marginTop: "2em",
            backgroundImage: `url(${this.props.selectedBackground})`,
            position: "relative"
        };

        return (
            <div >
                <div className={`${styles.mainArea} download`} style={style}>
                    <Canvas logoImages={this.props.logoImages} />
                </div>
                <SimpleButton handleClick={this.downloadImage}>Download image</SimpleButton>
                <SimpleButton handleClick={this.saveImage}>Save image</SimpleButton>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        logos: state.logos,
        texts: state.texts,
        user: state.user && state.user.db && state.user.db.user,

    };
}

const mapDispatchToProps = {
    addLogo,
    deleteLogo,
    addText,
    deleteText,
    saveUserImage,
    saveLogo,
    saveBackgrounds,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainEditorArea);
