import React from 'react'
import styles from './radio.module.css';

export default function RadioButtons() {
    return (
        <div className={styles.radioMain}>
            <input type="radio" name="text" value="Arial" /> Arial<br />
            <input type="radio" name="text" value="Times" /> Times New Roman <br />
            <input type="radio" name="text" value="OpenSans" /> Open Sans <br />
        </div>
    )
}
