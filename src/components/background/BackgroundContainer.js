import React, { useState } from 'react'
import SimpleHeader from '../common/SimpleHeader';
import ImageContainer from './ImageContainer';
import SimpleButton from '../common/SimpleButton';
import InputText from '../common/InputText';

export default function BackgroundContainer(props) {
    const [inputValue, setInput] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setInput(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSearchImages(inputValue);
    }

    return (
        <div>
            <SimpleHeader size="smallCenter">Search topic</SimpleHeader>
            <form onSubmit={handleSubmit}>
                <InputText onChange={handleChange} value={inputValue} placeholder="Search and enter" />
            </form>
            <ImageContainer
                handleSelectBg={props.handleSelectBg}
                backgroundImages={props.backgroundImages}
            />
            <SimpleButton handleClick={props.handleDeleteBg}>Delete Background</SimpleButton>
        </div>
    )
}
