import React from 'react'

export default function InputText({ name, placeholder, value, onChange, type = "text" }) {
    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
