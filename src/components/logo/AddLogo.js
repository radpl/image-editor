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
                {props.logos.map((logo, index) => {
                    const id = index + 1;
                    return <li className={styles.element} ><LogoElement id={id} image={logo} element={style} alt={"image" + id} /></li>
                })}
            </ul>
        </div>
    )
}
