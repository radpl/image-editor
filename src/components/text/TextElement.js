import React from 'react'
import { DragSource } from "react-dnd";
import ItemTypes from "../dnd/ItemTypes";

function TextElement({ hideSourceOnDrag = false, left, top, connectDragSource, isDragging, ...props }) {

    // if (isDragging && hideSourceOnDrag) {
    //     return null;
    // }

    return connectDragSource(
        <div id={props.id} style={props.textStyle} onClick={props.handleClick}>{props.children}</div>
    );
}

export default DragSource(
    ItemTypes[1],
    {
        beginDrag(props) {
            const { id, left, top } = props;
            return { id, left, top, type: ItemTypes[1] };
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(TextElement);
