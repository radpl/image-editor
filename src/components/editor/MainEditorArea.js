import React from 'react';
import html2canvas from 'html2canvas';
import SimpleButton from '../common/SimpleButton';
import styles from './MainEditorArea.module.css';
import { connect } from "react-redux";
import { addLogo, deleteLogo, saveLogo } from "../../redux/actions/logoActions";
import { saveBackgrounds } from "../../redux/actions/backgroundActions";
import { addText, deleteText } from "../../redux/actions/textActions";
import { saveUserImage } from "../../redux/actions/userActions";
import Canvas from './Canvas';

function MainEditorArea(props) {

    const downloadImage = () => {
        let editorArea = document.querySelector('.download');
        var a = document.createElement('a');
        html2canvas(editorArea).then((canvas) => {
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'myImage.jpg';
            a.click();
        });
    }
    const saveImage = () => {
        let editorArea = document.querySelector('.download');
        html2canvas(editorArea).then((canvas) => {
            const thumbnail = canvas.toDataURL("image/jpeg", 0.5);

            props.saveUserImage({
                user: props.user,
                image: {
                    name: "Some name",
                    description: "Some description",
                    texts: props.texts,
                    logos: props.logos,
                    selectedBg: props.selectedBg,
                },
                thumbnail: thumbnail,
            }).then(response => {
                const imageid = response._id;
                props.saveLogo({ logos: props.logoImages, image: imageid });
                props.saveBackgrounds({ backgrounds: props.backgroundImages, image: imageid });
            });
        });

    }
    const style = {
        width: "400px",
        height: "400px",
        backgroundColor: "white",
        textAlign: "center",
        marginTop: "2em",
        backgroundImage: `url(${props.selectedBackground})`,
        position: "relative"
    };

    return (
        <div >
            <div className={`${styles.mainArea} download`} style={style}>
                <Canvas logoImages={props.logoImages} />
            </div>
            <SimpleButton handleClick={downloadImage}>Download image</SimpleButton>
            <SimpleButton handleClick={saveImage}>Save image</SimpleButton>
        </div>
    );

}

function mapStateToProps(state, ownProps) {
    return {
        logos: state.logos,
        texts: state.texts,
        user: state.user && state.user.db && state.user.db.user,
        selectedBg: state.backgrounds.selected,
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
