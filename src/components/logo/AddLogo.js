import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import styles from './logoimages.module.css';
//import logos from '../../assets/logoAssets';
import LogoElement from './LogoElement';

export default function AddLogo(props) {
    const style = {
        width: "100%",
        height: "100%"
    }

    return (
        <div>
            <SimpleHeader size="smallLeft">Add logo</SimpleHeader>
            <ul className={styles.imageList}>
                <li className={styles.element}><LogoElement id="1" image={props.logos[0]} element={style} alt="image1" /></li>
                <li className={styles.element} ><LogoElement id="2" image={props.logos[1]} element={style} alt="image2" /></li>
                <li className={styles.element} ><LogoElement id="3" image={props.logos[2]} element={{ ...style, backgroundColor: "#aaa" }} alt="image3" /></li>

            </ul>
        </div>
    )
}
