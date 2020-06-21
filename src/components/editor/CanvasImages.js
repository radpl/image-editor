import React from "react";
import { Text } from "react-konva";
import CustomImage from './CustomImage';


export default function CanvasImages(props) {
  return (
    <>
      {props.logos && Object.keys(props.logos).map((key, index) => {
        return (
          <>
            {props.logos[key].render &&
              <CustomImage src={props.logoImages[+props.logos[key].logoid - 1]} draggable={true} x={props.logos[key].x} y={props.logos[key].y}
                isSelected={index === props.selectedId}
                onSelect={(e) => {
                  props.selectShape(index);
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
            {(index === props.selectedId) && props.logos[key].render && <Text onClick={() => props.addLogo({ id: key, render: false })} text="x" fontSize="15" strokeWidth="0.5" fontStyle="bold" fill="#000000" stroke="#FFFFFF" x={props.logos[key].x + props.logos[key].width + 5} y={props.logos[key].y - 15} />}
          </>
        )
      })}
    </>
  )

}

// const mapDispatchToProps = {
//   addLogo,
//   deleteLogo,
// };

// function mapStateToProps(state, ownProps) {
//   return {
//     logos: state.logos,
//   };
// }


//export default connect(mapStateToProps, mapDispatchToProps)(CanvasImages)