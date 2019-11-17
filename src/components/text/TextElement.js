import React from 'react'
import { DragSource } from "react-dnd";
import ItemTypes from "../dnd/ItemTypes";

function TextElement({ hideSourceOnDrag = false, left, top, connectDragSource, isDragging, ...props }) {

    return connectDragSource(
        <div id={props.id} style={{ ...props.textStyle }} onClick={props.handleClick}>{props.children}</div>
    );
}

export default DragSource(
    ItemTypes[1],
    {
        beginDrag(props) {
            const { id, left, top, elementSize } = props;
            return { id, left, top, elementSize, type: ItemTypes[1] };
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(TextElement);
