import React from 'react'
import { DragSource } from "react-dnd";
import ItemTypes from "../dnd/ItemTypes";

function TextElement({ hideSourceOnDrag = false, left, top, connectDragSource, isDragging, ...props }) {

    // if (isDragging && hideSourceOnDrag) {
    //     return null;
    // }
    // const [size, setSize] = useState({});
    //let firstRender = true;

    // useEffect(() => {
    //     const el = document.getElementById("t1");
    //     const width = el.offsetWidth;
    //     const height = el.offsetHeight;
    //     console.log(width, height);
    //     setSize({ width, height });

    // }, [props.children]);

    // if (props.renderText.initial && size && size.width > 2) {
    //     props.handleInitial(false);
    return connectDragSource(
        <div id={props.id} style={{ ...props.textStyle }} onClick={props.handleClick}>{props.children}</div>
    );
    // } else {
    //     return connectDragSource(
    //         <div id={props.id} style={{ ...props.textStyle }} onClick={props.handleClick}>{props.children}</div>
    //     );
    // }
}

export default DragSource(
    ItemTypes[1],
    {
        beginDrag(props) {
            const { id, left, top, elementSize } = props;
            return { id, left, top, elementSize, type: ItemTypes[1] };
        }
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)(TextElement);
