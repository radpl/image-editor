import React, { Component } from 'react';
import { DropTarget } from "react-dnd";
import html2canvas from 'html2canvas';
import ItemTypes from '../dnd/ItemTypes';
import SimpleButton from '../common/SimpleButton';
import LogoElement from '../logo/LogoElement';
import logoImages from '../../assets/logoAssets';
import TextElement from '../text/TextElement';
import ResizeElement from '../logo/ResizeElement';
import styles from './MainEditorArea.module.css';

class MainEditorArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logos: {},
            text: { id: "t1", top: 180, left: 120, clicked: false, value: "", font: "", initial: true }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTextDelete = this.handleTextDelete.bind(this);
        this.handleTextClick = this.handleTextClick.bind(this);
    }

    moveLogo(id, left, top, width, height) {
        const temp = Object.assign({}, this.state.logos);
        temp[id] = { left, top, width, height, clicked: false, render: true };
        this.setState({
            logos: { ...temp }
        });
    }

    resizeLogo(id, deltaLeft, deltaTop, width, height) {

        let widthChg = width + deltaLeft;
        if (widthChg > 150) widthChg = 150;
        if (widthChg < 30) widthChg = 30;
        const temp = Object.assign({}, this.state.logos);
        temp[id] = { left: temp[id].left, top: temp[id].top, width: widthChg, height: widthChg, clicked: false, render: true };

        this.setState({
            logos: { ...temp }
        });
    }

    moveText(id, left, top) {
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
        const el = Object.assign({}, this.state.text);
        el.clicked = !el.clicked;

        this.setState({
            text: el
        });
    }

    handleTextDelete() {
        this.props.handleAddText(false, false, this.props.renderText.value, this.props.renderText.font);

        const el = Object.assign({}, this.state.text);
        el.clicked = false;

        this.setState({
            text: el
        });
    }

    downloadImage = () => {
        let editorArea = document.querySelector('.download');
        var a = document.createElement('a');
        html2canvas(editorArea).then((canvas) => {
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'myImage.jpg';
            a.click();
        });
    }

    componentDidUpdate() {
        if (this.props.renderText.initial && this.props.renderText.status) {
            const el = document.getElementById("t1");
            const width = el.offsetWidth;
            const height = el.offsetHeight;
            if (this.state.text.initial) {
                const obj = Object.assign({}, this.state.text,
                    {
                        value: this.props.renderText.value,
                        font: this.props.renderText.font
                    });

                this.setState({
                    text: obj
                });
            }
            if (this.state.text.initial && width > 2) {
                const el = Object.assign({}, this.state.text,
                    {
                        top: (200 - (height / 2)),
                        left: (200 - (width / 2)),
                        value: this.props.renderText.value,
                        font: this.props.renderText.font,
                        initial: false,
                        width,
                        height
                    });

                this.setState({
                    text: el
                });
            }
        }
    }

    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
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
            cursor: "grab"
        }

        const buttonStyle = {
            position: "absolute",
            height: "20px",
            fontSize: "0.7rem",
            margin: 0,
            padding: "0.1em"
        }

        const textStyle = {
            position: "absolute",
            maxWidth: "250px",
            maxHeight: "100px",
            fontFamily: `${this.props.renderText.font}`,
            fontSize: "20px",
            color: `${this.props.renderText.color}`,
        }

        const resizeStyle = {
            width: "12px",
            height: "12px",
            backgroundColor: this.props.renderText.color ? `${this.props.renderText.color}` : 'black',
            position: "absolute",
            cursor: "pointer"
        }

        return connectDropTarget(
            <div >
                <div className={`${styles.mainArea} download`} style={style}>
                    {Object.keys(logos).map(key => {
                        const { left, top, width, height, render } = logos[key];
                        if (!render) return false;
                        const elleft = left - 9 + width;
                        const eltop = top - 9 + height;
                        return (
                            <>
                                <LogoElement
                                    key={key}
                                    id={key}
                                    left={left}
                                    top={top}
                                    width={width}
                                    height={height}
                                    hideSourceOnDrag="true"
                                    image={logoImages["logo" + key]}
                                    element={{ ...imageStyle, left, top, width: width + "px", height: height + "px" }}
                                    handleClick={this.handleClick}
                                />
                                <ResizeElement
                                    id={key}
                                    width={width}
                                    height={height}
                                    left={left - 9}
                                    top={top - 9}
                                    resizeStyle={{ ...resizeStyle, left: elleft, top: eltop }}
                                />
                            </>
                        )
                    })}
                    {Object.keys(logos).map(key => {
                        const { left, top, height, width, clicked, render } = logos[key];
                        if (!render) return false;
                        return (
                            clicked && <button id={key}
                                style={{ ...buttonStyle, left, top: (+top + height + 10), width }}
                                onClick={this.handleDelete}
                            >Delete</button>
                        )
                    })}
                    {this.props.renderText.status && <TextElement
                        id={this.state.text.id}
                        top={this.state.text.top}
                        left={this.state.text.left}
                        textStyle={{
                            ...textStyle,
                            top: this.state.text.top,
                            left: this.state.text.left,
                        }}
                        handleClick={this.handleTextClick}
                    >{this.props.renderText.value}</TextElement>
                    }
                    {this.props.renderText.status && this.state.text.clicked &&
                        (<button id={this.state.text.id}
                            style={{
                                ...buttonStyle,
                                left: this.state.text.left,
                                top: (+this.state.text.top + this.state.text.height),
                                width: this.state.text.width
                            }}
                            onClick={this.handleTextDelete}
                        >Delete</button>)}
                </div>

                <SimpleButton handleClick={this.downloadImage}>Download as image</SimpleButton>
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
                    component.moveLogo(item.id, left, top, item.width, item.height, item.mouseOver);
                } else {
                    component.moveLogo(item.id, 100, 100, 100, 100);
                }
            }
            if (item.type === ItemTypes[1]) {
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
                component.moveText(item.id, left, top);
            }

            if (item.type === ItemTypes[2]) {
                const deltaLeft = delta.x;
                const deltaTop = delta.y;
                //const left = Math.round((item.left - item.width) + delta.x);
                //const top = Math.round((item.top - item.height) + delta.y);
                component.resizeLogo(item.id, deltaLeft, deltaTop, item.width, item.height);
            }
        },
        hover(props, monitor, component) {
            if (!component) {
                return;
            }
            const item = monitor.getItem();
            const delta = monitor.getDifferenceFromInitialOffset();
            if (item.type === ItemTypes[2]) {
                const deltaLeft = delta.x;
                const deltaTop = delta.y;
                component.resizeLogo(item.id, deltaLeft, deltaTop, item.width, item.height);
            }
        },

    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
)(MainEditorArea);
