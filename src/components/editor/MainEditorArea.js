import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../dnd/ItemTypes';
import SimpleButton from '../common/SimpleButton';
export default function MainEditorArea(props) {

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.LOGO,
        drop: () => ({ name: 'MainEditorArea' }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;

    const style = {
        width: "400px",
        height: "400px",
        backgroundColor: "white",
        textAlign: "center",
        marginTop: "2em",
        backgroundImage: `url(${props.selectedBackground})`
    };

    return (
        <>
            <div ref={drop} style={style}>
                {isActive ? 'Release to drop' : 'Drag a logo here'}
            </div>
            <SimpleButton>Download as image</SimpleButton>
        </>
    )
}

