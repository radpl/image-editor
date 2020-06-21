import React from "react";
import { Text } from "react-konva";
import CustomText from './CustomText';

function CanvasTexts(props) {
  return (
    <>
      {props.texts && Object.keys(props.texts).map((key, index) => {
        return (<>
          {props.texts[key].render && <CustomText text={props.texts[key].value} draggable={true}
            fontFamily={props.texts[key].font}
            fontSize={props.texts[key].fontSize}
            fill={props.texts[key].color}
            isSelected={index === props.selTextId}
            onSelect={(e) => {
              props.selectText(index);
              const width = e.target.width();
              const height = e.target.height();
              const x = e.target.x();
              const y = e.target.y();
              props.addText({ ...props.texts[key], x, y, width, height })
            }}
            onDragEnd={e => {
              const width = e.target.width();
              const height = e.target.height();
              const x = e.target.x();
              const y = e.target.y();
              props.addText({ ...props.texts[key], x, y, width, height })
            }}

          />}
          {(index === props.selTextId) && props.texts[key].render && <Text onClick={() => props.addText({ id: key, render: false })} text="x" fontSize="15" strokeWidth="0.5" fontStyle="bold" fill="#000000" stroke="#FFFFFF" x={props.texts[key].x + props.texts[key].width + 5} y={props.texts[key].y - 15} />}
        </>)
      })}
    </>
  )
}


export default CanvasTexts;
