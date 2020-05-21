import React, { useState } from 'react'
import SimpleHeader from '../common/SimpleHeader';
import InputField from '../common/InputField';
import RadioButtons from './RadioButtons';
import SimpleButton from '../common/SimpleButton';
import ColorPicker from './ColorPicker';

export default function AddText(props) {

    const [inputValue, setInput] = useState("Example text");
    const [fontFamily, setFont] = useState("Times New Roman");
    const [fontColor, setColor] = useState("#000");

    const handleChange = (event) => {
        const { value } = event.target;
        setInput(value);
    }

    const handleFont = (event) => {
        const { value } = event.target;
        var mapping = {
            Arial: "Arial",
            Times: "Times New Roman",
            OpenSans: "Open Sans"
        }
        setFont(mapping[value]);
    }

    const handleColorChange = (color, event) => {
        setColor(color.hex);

    }

    const addTextPosition = (event) => {
        event.preventDefault();
        props.handleAddText(inputValue, fontFamily, fontColor);
    }

    return (
        <div>
            <SimpleHeader size="smallLeft">Add text</SimpleHeader>
            <InputField onChange={handleChange} value={inputValue} placeholder="Input your text" />
            <RadioButtons handleClick={handleFont} />
            <ColorPicker color={fontColor} handleColorChange={handleColorChange} />
            <SimpleButton handleClick={addTextPosition}>Add Text</SimpleButton>
        </div>
    )
}
