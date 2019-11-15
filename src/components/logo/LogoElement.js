import React from 'react'

export default function LogoElement(props) {
    return (
        <img src={props.image} alt={props.alt} className={props.element} />
    );
}
