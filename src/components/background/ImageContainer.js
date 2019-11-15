import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import Thumbnail from '../common/Thumbnail';
import styles from './container.module.css';
import background from '../../assets/bgAssets';

export default function ImageContainer(props) {
    return (
        <>
            <SimpleHeader size="smallCenter">Select background</SimpleHeader>
            <ul className={styles.imageList}>
                <li><Thumbnail image={background.bg1} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
                <li><Thumbnail image={background.bg2} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
                <li><Thumbnail image={background.bg3} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
                <li><Thumbnail image={background.bg4} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
            </ul>
        </>
    )
}
