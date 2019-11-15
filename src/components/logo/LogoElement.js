import React from 'react'
import { DragSource } from "react-dnd";
import ItemTypes from "../dnd/ItemTypes";

function LogoElement({ hideSourceOnDrag = false, left, top, connectDragSource, isDragging, ...props }) {

    if (isDragging && hideSourceOnDrag) {
        return null;
    }

    return connectDragSource(
        <img src={props.image} alt={props.alt} className={props.element} />
    );
}

export default DragSource(
    ItemTypes.LOGO,
    {
        beginDrag(props) {
            const { id, left, top } = props;
            return { id, left, top };
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(LogoElement);
