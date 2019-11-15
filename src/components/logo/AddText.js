import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import InputField from '../common/InputField';
import RadioButtons from '../common/RadioButtons';
import SimpleButton from '../common/SimpleButton';
export default function AddText() {
    return (
        <div>
            <SimpleHeader size="smallLeft">Add text</SimpleHeader>
            <InputField />
            <RadioButtons />
            <SimpleButton>Add Text</SimpleButton>
        </div>
    )
}
