import React from 'react'
import { DragSource } from "react-dnd";
import ItemTypes from "../dnd/ItemTypes";
import '../logo/resize.css';

function ResizeText({ hideSourceOnDrag = true, left, top, width, height, connectDragSource, isDragging, ...props }) {

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
  ItemTypes[3],
  {
    beginDrag(props) {
      const { id, left, top, width, height } = props;
      return { id, left, top, width, height, type: ItemTypes[3] };
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(ResizeText);