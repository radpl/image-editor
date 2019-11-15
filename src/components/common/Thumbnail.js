import React from 'react'

export default function Thumbnail(props) {
    return (
        <div >
            <img
                src={props.image}
                alt="background"
                style={{ width: props.width, height: props.height }}
                onClick={() => props.handleClick(props.image)} />
        </div>
    )
}
