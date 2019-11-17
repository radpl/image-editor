import React, { useState } from 'react'
import SimpleHeader from '../common/SimpleHeader';
import InputField from '../common/InputField';
import RadioButtons from '../common/RadioButtons';
import SimpleButton from '../common/SimpleButton';

export default function AddText(props) {

    const [inputValue, setInput] = useState("Example text");
    const [fontFamily, setFont] = useState("Times New Roman");

    const handleChange = (event) => {
        const { value } = event.target;
        setInput(value);
    }

    const handleFont = (event) => {
        //event.preventDefault();
        const { value } = event.target;
        var mapping = {
            Arial: "Arial",
            Times: "Times New Roman",
            OpenSans: "Open Sans"
        }
        setFont(mapping[value]);
    }

    const addTextPosition = (event) => {
        event.preventDefault();
        props.handleAddText(true, true, inputValue, fontFamily)
    }

    return (
        <div>
            <SimpleHeader size="smallLeft">Add text</SimpleHeader>
            <InputField onChange={handleChange} value={inputValue} placeholder="Input your text" />
            <RadioButtons handleClick={handleFont} />
            <SimpleButton handleClick={addTextPosition}>Add Text</SimpleButton>
        </div>
    )
}
