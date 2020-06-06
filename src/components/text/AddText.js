import React, { useState } from 'react'
import SimpleHeader from '../common/SimpleHeader';
import InputField from '../common/InputField';
import RadioButtons from './RadioButtons';
import SimpleButton from '../common/SimpleButton';
import ColorPicker from './ColorPicker';
import { connect } from 'react-redux';
import { addText } from "../../redux/actions/textActions";

function AddText(props) {

    const [inputValue, setInput] = useState("Example text");
    const [fontFamily, setFont] = useState("Times New Roman");

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

    // const handleColorChange = (color, event) => {
    //     setColor(color.hex);

    // }

    const addTextPosition = (event) => {
        event.preventDefault();
        const id = Object.keys(props.texts).length + 1;
        props.addText({ id, x: 200, y: 120, clicked: false, render: true, value: inputValue, font: fontFamily, color: props.color, fontSize: 20 });
    }

    return (
        <div>
            <SimpleHeader size="smallLeft">Add text</SimpleHeader>
            <InputField onChange={handleChange} value={inputValue} placeholder="Input your text" />
            <RadioButtons handleClick={handleFont} />
            <ColorPicker />
            <SimpleButton handleClick={addTextPosition}>Add Text</SimpleButton>
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        texts: state.texts,
        color: state.color
    };
}

const mapDispatchToProps = {
    addText,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddText)
