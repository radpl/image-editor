import React from 'react';
import styles from './ImageEditor.module.css';
import SimpleHeader from '../common/SimpleHeader';
import MainEditorArea from './MainEditorArea';

export default function ImageEditor(props) {
    return (
        <div className={styles.mainContainer}>
            <SimpleHeader size="medium">Simple Editor</SimpleHeader>
            <MainEditorArea
                backgroundImages={props.backgroundImages}
                selectedBackground={props.selectedBackground}
                logoImages={props.logoImages}
            />
        </div>
    )
}
