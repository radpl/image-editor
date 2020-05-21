import React from 'react'
import AddLogo from './AddLogo';
import AddText from '../text/AddText';

export default function LogoContainer(props) {
    return (
        <div>
            <AddLogo logos={props.logos} />
            <AddText handleAddText={props.handleAddText} />
        </div>
    )
}
