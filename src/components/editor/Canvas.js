import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Text, Image } from "react-konva";
import { connect } from 'react-redux';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { addLogo, deleteLogo } from "../../redux/actions/logoActions";
import { addText, deleteText } from "../../redux/actions/textActions";

function Canvas(props) {

  const [lines, setLine] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [colors, setColor] = useState([]);
  const [selTextId, selectText] = useState(null);

  const _drawing = useRef(false);
  const stageRef = useRef();

  const handleMouseDown = () => {
    _drawing.current = true && !selectedId && props.tool && props.tool.freeline;
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
          return (<>
            {props.texts[key].render && <CustomText text={props.texts[key].value} draggable={true}
              fontFamily={props.texts[key].font}
              fontSize={props.texts[key].fontSize}
              fill={props.texts[key].color}
              isSelected={index === selTextId}
              onSelect={(e) => {
                selectText(index);
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
            {(index === selTextId) && props.texts[key].render && <Text onClick={() => props.addText({ id: key, render: false })} text="x" fontSize="15" strokeWidth="0.5" fontStyle="bold" fill="#000000" stroke="#FFFFFF" x={props.texts[key].x + props.texts[key].width + 5} y={props.texts[key].y - 15} />}
          </>)
        })}
        {props.logos && Object.keys(props.logos).map((key, index) => {
          return (
            <>
              {props.logos[key].render &&
                <CustomImage src={props.logoImages[+props.logos[key].logoid - 1]} draggable={true} x={props.logos[key].x} y={props.logos[key].y}
                  isSelected={index === selectedId}
                  onSelect={(e) => {
                    selectShape(index);
                    const width = e.target.width();
                    const height = e.target.height();
                    const x = e.target.x();
                    const y = e.target.y();
                    props.addLogo({ ...props.logos[key], x, y, width, height })
                  }}
                  onDragEnd={e => {
                    const width = e.target.width();
                    const height = e.target.height();
                    const x = e.target.x();
                    const y = e.target.y();
                    props.addLogo({ ...props.logos[key], x, y, width, height })
                  }} />}
              {(index === selectedId) && props.logos[key].render && <Text onClick={() => props.addLogo({ id: key, render: false })} text="x" fontSize="15" strokeWidth="0.5" fontStyle="bold" fill="#000000" stroke="#FFFFFF" x={props.logos[key].x + props.logos[key].width + 5} y={props.logos[key].y - 15} />}
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
    logos: state.logos,
    tool: state.settings.tool
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Canvas)