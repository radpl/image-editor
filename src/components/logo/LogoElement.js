import React from 'react'
import { DragSource } from "react-dnd";
import ItemTypes from "../dnd/ItemTypes";

function LogoElement({ hideSourceOnDrag = false, left, top, connectDragSource, isDragging, ...props }) {

    // if (isDragging && hideSourceOnDrag) {
    //     return null;
    // }

    return connectDragSource(
        <img id={props.id} src={props.image} alt={props.alt} style={props.element} onClick={props.handleClick} />
    );
}

export default DragSource(
    ItemTypes[0],
    {
        beginDrag(props) {
            const { id, left, top } = props;
            return { id, left, top, type: ItemTypes[0] };
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(LogoElement);
