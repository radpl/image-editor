import React from 'react'
//import styles from './MainEditorArea.module.css';
import SimpleButton from '../common/SimpleButton';
export default function MainEditorArea(props) {

    const style = {
        width: "400px",
        height: "400px",
        backgroundColor: "white",
        textAlign: "center",
        marginTop: "2em",
        backgroundImage: `url(${props.selectedBackground})`
    };
    return (
        <>
            <div style={style}>
            </div>
            <SimpleButton>Download as image</SimpleButton>
        </>
    )
}
