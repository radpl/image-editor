import React from "react";
import { Text } from 'react-konva';
import CustomLine from './CustomLine';

export default function CanvasLines(props) {
  return (
    <>
      {props.lines && props.lines.map((line, index) => {
        const y = line.filter((el, index) => index % 2 !== 0);
        const x = line.filter((el, index) => index % 2 === 0);
        //const minX = Math.min( ...x );
        const maxX = Math.max(...x);
        const minY = Math.min(...y);
        //const maxY = Math.max( ...x );
        return (<>
          {<CustomLine key={index} draggable={true} points={line} stroke={props.colors[index]}
            isSelected={index === props.selLineId}
            onSelect={(e) => {
              props.selectLine(index);
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
          {(index === props.selLineId) && <Text onClick={() => { props.removeLine(index) }} text="x" fontSize="15" strokeWidth="0.5" fontStyle="bold" fill="#000000" stroke="#FFFFFF" x={maxX + 5} y={minY - 15} />}
        </>)
      })}
    </>
  )
}