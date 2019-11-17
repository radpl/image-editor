import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import styles from './logoimages.module.css';
import background from '../../assets/bgAssets';
import LogoElement from './LogoElement';

export default function AddLogo() {
    const style = {
        width: "100%",
        height: "100%"
    }

    return (
        <div>
            <SimpleHeader size="smallLeft">Add logo</SimpleHeader>
            <ul className={styles.imageList}>
                <li className={styles.element}><LogoElement id="1" image={background.bg1} element={style} alt="image1" /></li>
                <li className={styles.element} ><LogoElement id="2" image={background.bg2} element={style} alt="image2" /></li>
                <li className={styles.element} ><LogoElement id="3" image={background.bg3} element={style} alt="image3" /></li>

            </ul>
        </div>
    )
}
