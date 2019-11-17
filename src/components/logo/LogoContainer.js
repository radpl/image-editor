import React from 'react'
import AddLogo from './AddLogo';
import AddText from '../text/AddText';

export default function LogoContainer(props) {
    return (
        <div>
            <AddLogo />
            <AddText handleAddText={props.handleAddText} />
        </div>
    )
}
