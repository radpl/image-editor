import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import Thumbnail from '../common/Thumbnail';
import styles from './container.module.css';

export default function ImageContainer(props) {
    return (
        <>
            <SimpleHeader size="smallCenter">Select background</SimpleHeader>
            <ul className={styles.imageList}>
                {props.backgroundImages.map((item, index) => {
                    //const id = index + 1;
                    return <li><Thumbnail image={item} id={index} width="35%" height="35%" handleClick={props.handleSelectBg} /></li>
                })}
            </ul>
        </>
    )
}
