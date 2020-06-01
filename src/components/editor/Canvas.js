import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Text, Image } from "react-konva";
import { connect } from 'react-redux';
//import useImage from 'use-image';
import CustomImage from './CustomImage';

function Canvas(props) {

  const [colors, setColor] = useState([]);
  const [lines, setLine] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const _drawing = useRef(false);
  const stageRef = useRef();

  const handleMouseDown = () => {
    _drawing.current = true && !selectedId;
    setColor([...colors, props.color]);
    setLine([...lines, []]);

    // this.setState({
    //   colors: [...this.state.colors, this.props.color],
    //   lines: [...this.state.lines, []]
    // });
  };

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
        {props.texts && Object.keys(props.texts).map(key => {
          return <Text text={props.texts[key].value} draggable={true} fontSize={props.texts[key].fontSize} />
        })}
        {props.logoImages && props.logoImages.map((logo, index) => {

          return <CustomImage src={logo} draggable={true} x={100} y={100}
            isSelected={index === selectedId}
            onSelect={() => {
              selectShape(index);
            }} />
        })}
      </Layer>
    </Stage>
  )

}

function mapStateToProps(state, ownProps) {
  return {
    color: state.color,
    texts: state.texts,
    logos: state.logos
  };
}


export default connect(mapStateToProps)(Canvas)