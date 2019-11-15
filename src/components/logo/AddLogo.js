import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import styles from './logoimages.module.css';
import background from '../../assets/bgAssets';
import LogoElement from './LogoElement';

export default function AddLogo() {
    return (
        <div>
            <SimpleHeader size="smallLeft">Add logo</SimpleHeader>
            <ul className={styles.imageList}>
                <li className={styles.element}><LogoElement image={background.bg1} element={styles.image} alt="image1" /></li>
                <li className={styles.element} ><LogoElement image={background.bg2} element={styles.image} alt="image2" /></li>
                <li className={styles.element} ><LogoElement image={background.bg3} element={styles.image} alt="image3" /></li>

            </ul>
        </div>
    )
}
