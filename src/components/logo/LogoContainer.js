import React from 'react'
import SimpleHeader from '../common/SimpleHeader';
import AddLogo from './AddLogo';
import AddText from './AddText';

export default function LogoContainer() {
    return (
        <div>
            <SimpleHeader size="medium">Right sidebar</SimpleHeader>
            <AddLogo />
            <AddText />
        </div>
    )
}
