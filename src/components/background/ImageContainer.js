import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import Thumbnail from '../common/Thumbnail';
import styles from './container.module.css';
//import background from '../../assets/bgAssets';


export default function ImageContainer(props) {
    return (
        <>
            <SimpleHeader size="smallCenter">Select background</SimpleHeader>
            <ul className={styles.imageList}>
                <li><Thumbnail image={props.backgroundImages[0]} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
                <li><Thumbnail image={props.backgroundImages[1]} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
                <li><Thumbnail image={props.backgroundImages[2]} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
                <li><Thumbnail image={props.backgroundImages[3]} width="50%" height="50%" handleClick={props.handleSelectBg} /></li>
            </ul>
        </>
    )
}
