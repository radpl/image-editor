import React from 'react'

export default function Thumbnail(props) {
    return (
        <div >
            {props.image ? (<img
                id={props.id}
                src={props.image}
                alt="background"
                style={{ width: props.width, height: props.height }}
                onClick={() => props.handleClick(props.id)} />)
                : <div>Image loading</div>
            }
        </div>
    )
}
