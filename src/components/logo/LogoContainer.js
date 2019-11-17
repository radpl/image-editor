import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
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
