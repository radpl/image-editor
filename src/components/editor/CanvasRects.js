import React from "react";
import { Text } from 'react-konva';
import CustomRect from './CustomRect';

export default function CanvasRects(props) {
  return (
    <>
      {props.rects && props.rects.map((rect, index) => {
        const { x, y, width, height, fill } = rect;
        return (<>
          {<CustomRect draggable={true} fill={fill} x={x} y={y} width={width} height={height}
            isSelected={index === props.selRectId}
            onSelect={(e) => {
              props.selectRect(index);
              // const width = e.target.width();
              // const height = e.target.height();
              // const x = e.target.x();
              // const y = e.target.y();
              // props.addText({ ...props.texts[key], x, y, width, height })
            }}
            onDragEnd={e => {
              // const width = e.target.width();
              // const height = e.target.height();
              // const x = e.target.x();
              // const y = e.target.y();
              // props.addText({ ...props.texts[key], x, y, width, height })
            }}

          />}
          {(index === props.selRectId) && <Text onClick={() => { props.removeRect(index) }} text="x" fontSize="15" strokeWidth="0.5" fontStyle="bold" fill="#000000" stroke="#FFFFFF" x={x + width + 5} y={y - 15} />}
        </>)
      })}
    </>
  )
}