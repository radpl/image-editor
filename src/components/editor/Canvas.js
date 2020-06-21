import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Text, Rect } from "react-konva";
import { connect } from 'react-redux';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { addLogo, deleteLogo } from "../../redux/actions/logoActions";
import { addText, deleteText } from "../../redux/actions/textActions";
import CanvasImages from "./CanvasImages";
import CanvasTexts from "./CanvasTexts";
import CanvasRects from "./CanvasRects";

function Canvas(props) {

  const [lines, setLine] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [colors, setColor] = useState([]);
  const [selTextId, selectText] = useState(null);
  const [rects, setRects] = useState([]);
  const [selRectId, selectRect] = useState(null);

  const _drawing = useRef(false);
  const stageRef = useRef();

  const handleMouseDown = () => {
    if (props.tool && props.tool.freeline) {
      _drawing.current = true && !selectedId && props.tool && props.tool.freeline;
      setColor([...colors, props.color]);
      setLine([...lines, []]);
    }
    if (props.tool && props.tool.rectangle) {
      _drawing.current = true && (selRectId === null) && props.tool && props.tool.rectangle;
      const stage = stageRef.current.getStage();
      const point = stage.getPointerPosition();
      const rect = { x: point.x, y: point.y, width: 0, height: 0, fill: props.color };
      setRects([...rects, rect]);
    }
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

    if (props.tool && props.tool.freeline) {
      let lastLine = lines[lines.length - 1];
      lastLine = lastLine.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLine(lines.concat());
    }
    if (props.tool && props.tool.rectangle) {
      const rectsCopy = [...rects];
      let lastRect = rectsCopy[rectsCopy.length - 1];
      lastRect.width = point.x - lastRect.x;
      lastRect.height = point.y - lastRect.y;
      setRects(rectsCopy);
    }
  };

  const checkDeselect = e => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      selectText(null);
      selectRect(null);
    }
  };

  const removeRect = (id) => {
    const rectsCopy = rects.filter((rect, index) => index !== id);
    setRects(rectsCopy);
    selectRect(null);
  }

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
        <CanvasImages selectedId={selectedId} selectShape={selectShape} {...props} />
        <CanvasTexts selTextId={selTextId} selectText={selectText} {...props} />
        {lines && lines.map((line, i) => (<Line key={i} points={line} stroke={colors[i]} draggable={true} />))}
        <CanvasRects selRectId={selRectId} selectRect={selectRect} {...props} rects={rects} removeRect={removeRect} />
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