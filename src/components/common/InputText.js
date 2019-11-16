import React from 'react'

export default function InputText(props) {
    return (
        <div>
            <input
                type="text"
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}
