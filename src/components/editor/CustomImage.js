import React, { useRef, useEffect } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

function CustomImage(props) {

  const [image] = useImage(props.src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (props.isSelected) {
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected]);

  return (
    <>
      <Image
        onClick={props.onSelect}
        onTap={props.onSelect}
        x={props.x}
        y={props.y}
        image={image}
        draggable={true}
        ref={shapeRef}
        onDragEnd={e => props.onDragEnd(e)}
      />
      {props.isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );

}

export default CustomImage;

