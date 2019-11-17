import React from 'react'
import { DragSource } from "react-dnd";
import ItemTypes from "../dnd/ItemTypes";
import './resize.css';

function ResizeElement({ hideSourceOnDrag = true, left, top, width, height, connectDragSource, isDragging, ...props }) {

    if (isDragging && hideSourceOnDrag) {
        return null;
    }

    return connectDragSource(
        <div
            id={props.id}
            style={props.resizeStyle}
            className="mainResize"
        ></div>
    );
}

export default DragSource(
    ItemTypes[2],
    {
        beginDrag(props) {
            const { id, left, top, width, height } = props;
            return { id, left, top, width, height, type: ItemTypes[2] };
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(ResizeElement);