import React from 'react'
import PropTypes from "prop-types";
import styles from './SimpleHeader.module.css';

function SimpleHeader(props) {
    return (
        <header className={styles.header}>
            <div className={styles[props.size]}>{props.children}</div>
        </header>
    );
}

SimpleHeader.propTypes = {
    children: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
};

export default SimpleHeader;