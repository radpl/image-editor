import React, { Component } from 'react';
//import { useDrop } from 'react-dnd';
import { DropTarget } from "react-dnd";
import ItemTypes from '../dnd/ItemTypes';
import SimpleButton from '../common/SimpleButton';
import LogoElement from '../logo/LogoElement';
import background from '../../assets/bgAssets';
import update from 'immutability-helper'

class MainEditorArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logos: {}
        }
    }

    moveBox(id, left, top) {
        // this.setState(
        //     update(this.state, {
        //         logos: {
        //             [id]: {
        //                 $merge: { left, top },
        //             },
        //         },
        //     }),
        // )
    }


    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        const { logos } = this.state;
        console.log(isOver, canDrop);
        const style = {
            width: "400px",
            height: "400px",
            backgroundColor: "white",
            textAlign: "center",
            marginTop: "2em",
            backgroundImage: `url(${this.props.selectedBackground})`
        };

        const imageStyle = {
            position: "absolute",
            width: "100px",
            height: "100px",
        }
        return connectDropTarget(
            <div>
                <div style={style}>
                    {Object.keys(logos).map(key => {
                        const { left, top } = logos[key]
                        return (
                            <LogoElement
                                key={key}
                                id={key}
                                left={left}
                                top={top}
                                hideSourceOnDrag="true"
                                element={imageStyle}
                            />
                        )
                    })}
                </div>
                <SimpleButton>Download as image</SimpleButton>
            </div>
        );
    }
}
export default DropTarget(ItemTypes.LOGO,
    {
        drop(props, monitor, component) {
            if (!component) {
                return;
            }
            const item = monitor.getItem();
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            component.moveBox(item.id, left, top);
        }
    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
)(MainEditorArea);
