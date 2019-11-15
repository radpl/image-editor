import React from "react";

const InputField = (props) => {
    return (
        <div className="input-main">
            <textarea
                id="text-input"
                rows="3" cols="30"
                name={props.name}
                className="input-text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange} />
        </div>);
};

export default InputField;