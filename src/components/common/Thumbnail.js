import React from 'react'

export default function Thumbnail(props) {
    return (
        <div >
            {props.image ? (<img
                src={props.image}
                alt="background"
                style={{ width: props.width, height: props.height }}
                onClick={() => props.handleClick(props.image)} />)
                : <div>Image loading</div>
            }
        </div>
    )
}
