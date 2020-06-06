import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Text, Image } from "react-konva";
import { connect } from 'react-redux';
//import useImage from 'use-image';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { addLogo, deleteLogo } from "../../redux/actions/logoActions";
import { addText, deleteText } from "../../redux/actions/textActions";

function Canvas(props) {

  const [colors, setColor] = useState([]);
  const [lines, setLine] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [selTextId, selectText] = useState(null);

  const _drawing = useRef(false);
  const stageRef = useRef();

  const handleMouseDown = () => {
    _drawing.current = true && !selectedId;
    setColor([...colors, props.color]);
    setLine([...lines, []]);
  }

  const handleMouseUp = () => {
    _drawing.current = false;
  };

  const handleMouseMove = e => {
    if (!_drawing.current) {
      return;
    }
    const stage = stageRef.current.getStage();
    const point = stage.getPointerPosition();

    let lastLine = lines[lines.length - 1];
    lastLine = lastLine.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLine(lines.concat());
  };

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      selectText(null);
    }
  };

  return (
    <Stage
      width={400}
      height={400}
      onContentMousedown={handleMouseDown}
      onContentMousemove={handleMouseMove}
      onContentMouseup={handleMouseUp}
      ref={stageRef}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {lines && lines.map((line, i) => (
          <Line key={i} points={line} stroke={colors[i]} draggable={true} />
        ))}
        {props.texts && Object.keys(props.texts).map((key, index) => {
          return <CustomText text={props.texts[key].value} draggable={true}
            fontFamily={props.texts[key].font}
            fontSize={props.texts[key].fontSize}
            fill={props.texts[key].color}
            isSelected={index === selTextId}
            onSelect={() => {
              selectText(index);
            }}
            onDragEnd={e => {
              const x = e.target.x();
              const y = e.target.y();
              props.addText({ ...props.texts[key], x, y })
            }}

          />
        })}
        {props.logos && Object.keys(props.logos).map((key, index) => {
          return (
            <>
              <CustomImage src={props.logoImages[props.logos[key].logoid]} draggable={true} x={props.logos[key].top} y={props.logos[key].left}
                isSelected={index === selectedId}
                onSelect={() => {
                  selectShape(index);
                }} />
              {(index === selectedId) && <Text text="X" x={props.logos[key].top} y={props.logos[key].left} />}
            </>
          )
        })}

      </Layer>
    </Stage>
  )

}

const mapDispatchToProps = {
  addLogo,
  deleteLogo,
  addText,
  deleteText,
};

function mapStateToProps(state, ownProps) {
  return {
    color: state.color,
    texts: state.texts,
    logos: state.logos
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Canvas)