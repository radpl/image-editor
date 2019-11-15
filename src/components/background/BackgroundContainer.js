import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import ImageContainer from './ImageContainer';
import SimpleButton from '../common/SimpleButton';

export default function BackgroundContainer(props) {
    return (
        <div>
            <SimpleHeader size="medium">Left sidebar</SimpleHeader>
            <ImageContainer
                handleSelectBg={props.handleSelectBg}
            />
            <SimpleButton handleClick={props.handleDeleteBg}>Delete Background</SimpleButton>
        </div>
    )
}
