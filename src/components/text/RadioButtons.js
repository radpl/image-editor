import React from 'react'
import styles from './radio.module.css';

export default function RadioButtons(props) {
    return (
        <div className={styles.radioMain} onChange={props.handleClick} >
            <input type="radio" name="text" value="Arial" /> Arial<br />
            <input type="radio" name="text" value="Times" /> Times New Roman <br />
            <input type="radio" name="text" value="OpenSans" /> Open Sans <br />
        </div>
    )
}
