import React, { Component } from 'react';
//import { useDrop } from 'react-dnd';
import { DropTarget } from "react-dnd";
import ItemTypes from '../dnd/ItemTypes';
import SimpleButton from '../common/SimpleButton';
import LogoElement from '../logo/LogoElement';
import background from '../../assets/bgAssets';
import TextElement from '../text/TextElement';

class MainEditorArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logos: {},
            text: { id: "t1", top: 100, left: 100, clicked: false }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTextDelete = this.handleTextDelete.bind(this);
        this.handleTextClick = this.handleTextClick.bind(this);
    }

    moveLogo(id, left, top) {
        //refarctor to use prevstate
        const temp = Object.assign({}, this.state.logos);
        temp[id] = { left, top, clicked: false, render: true };
        this.setState({
            logos: { ...temp }
        });
    }
    moveText(id, left, top) {
        //refarctor to use prevstate
        //const temp = Object.assign({}, this.state.text);
        const obj = Object.assign({}, this.state.text, { id, left, top });
        this.setState({
            text: obj
        });
    }

    handleClick(event) {
        const element = event.target;
        const temp = Object.assign({}, this.state.logos);
        const el = temp[element.id];
        el.clicked = !el.clicked;

        this.setState({
            logos: { ...temp }
        });
    }

    handleDelete(event) {
        const element = event.target;
        const temp = Object.assign({}, this.state.logos);
        const el = temp[element.id];
        el.render = !el.render;

        this.setState({
            logos: { ...temp }
        });
    }

    handleTextClick(event) {
        //const element = event.target;    
        const el = Object.assign({}, this.state.text);
        el.clicked = !el.clicked;

        this.setState({
            text: el
        });
    }

    handleTextDelete() {
        this.props.handleAddText(false, this.props.renderText.value, this.props.renderText.font);

        const el = Object.assign({}, this.state.text);
        el.clicked = false;

        this.setState({
            text: el
        });
    }


    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        console.log(isOver, canDrop);
        const { logos } = this.state;

        const style = {
            width: "400px",
            height: "400px",
            backgroundColor: "white",
            textAlign: "center",
            marginTop: "2em",
            backgroundImage: `url(${this.props.selectedBackground})`,
            position: "relative"
        };

        const imageStyle = {
            position: "absolute",
            width: "100px",
            height: "100px",
        }

        const buttonStyle = {
            position: "absolute",
            width: "100px",
            height: "20px",
        }

        const textStyle = {
            position: "absolute",
            width: "100px",
            height: "50px",
            fontFamily: `${this.props.renderText.font}`,
            fontSize: "20px",
            color: "black"

        }
        return connectDropTarget(
            <div>
                <div style={style}>
                    {Object.keys(logos).map(key => {
                        const { left, top, render } = logos[key];
                        if (!render) return false;
                        return (
                            <LogoElement
                                key={key}
                                id={key}
                                left={left}
                                top={top}
                                hideSourceOnDrag="true"
                                image={background["bg" + key]}
                                element={{ ...imageStyle, left, top }}
                                buttonStyle={{ ...buttonStyle, left, top: (+top + 110) }}
                                mainStyle={{ ...imageStyle, left, top }}
                                handleClick={this.handleClick}
                            />
                        )
                    })}
                    {Object.keys(logos).map(key => {
                        const { left, top, clicked, render } = logos[key];
                        if (!render) return false;
                        return (
                            clicked && <button id={key}
                                style={{ ...buttonStyle, left, top: (+top + 110) }}
                                onClick={this.handleDelete}
                            >Delete</button>
                        )
                    })}
                    {this.props.renderText.status
                        && <TextElement
                            id={this.state.text.id}
                            top={this.state.text.top}
                            left={this.state.text.left} t
                            textStyle={{ ...textStyle, top: this.state.text.top, left: this.state.text.left }}
                            handleClick={this.handleTextClick}
                        >{this.props.renderText.value}</TextElement>
                    }
                    {this.props.renderText.status && this.state.text.clicked && (<button id={this.state.text.id}
                        style={{ ...buttonStyle, left: this.state.text.left, top: (+this.state.text.top + 110) }}
                        onClick={this.handleTextDelete}
                    >Delete</button>)}
                </div>
                <SimpleButton>Download as image</SimpleButton>
            </div>
        );
    }
}
export default DropTarget(ItemTypes,
    {
        drop(props, monitor, component) {
            if (!component) {
                return;
            }
            const item = monitor.getItem();
            const delta = monitor.getDifferenceFromInitialOffset();
            if (item.type === ItemTypes[0]) {
                if (item.id && item.left & item.top) {
                    const left = Math.round(item.left + delta.x);
                    const top = Math.round(item.top + delta.y);
                    component.moveLogo(item.id, left, top);
                } else {
                    component.moveLogo(item.id, 100, 100);
                }
            }
            if (item.type === ItemTypes[1]) {
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
                component.moveText(item.id, left, top);
            }

        }

    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
)(MainEditorArea);
