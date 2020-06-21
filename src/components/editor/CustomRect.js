import React from 'react';
import { Rect, Transformer } from 'react-konva';

const CustomRect = ({ shapeProps, isSelected, onSelect, onChange, ...props }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill={props.fill}
        onDragEnd={(e) => { props.onDragEnd(e) }}

      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default CustomRect;