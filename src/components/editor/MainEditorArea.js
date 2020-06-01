import React, { Component } from 'react';
import { DropTarget } from "react-dnd";
import html2canvas from 'html2canvas';
import ItemTypes from '../dnd/ItemTypes';
import SimpleButton from '../common/SimpleButton';
import LogoElement from '../logo/LogoElement';
import TextElement from '../text/TextElement';
import ResizeElement from '../logo/ResizeElement';
import ResizeText from '../text/ResizeText';
import styles from './MainEditorArea.module.css';
import { connect } from "react-redux";
import { addLogo, deleteLogo } from "../../redux/actions/logoActions";
import { addText, deleteText } from "../../redux/actions/textActions";
import Canvas from './Canvas';

class MainEditorArea extends Component {

    moveLogo(id, left, top, width, height) {
        this.props.addLogo({ id, left, top, width, height, clicked: false, render: true });
    }

    resizeLogo(id, deltaLeft, deltaTop, width, height) {
        let widthChg = width + deltaLeft;
        this.props.addLogo({ ...this.props.logos[id], width: widthChg, height: widthChg });
    }

    resizeText(id, deltaLeft, deltaTop, width, height) {
        let change = (deltaTop + deltaLeft) / 2;
        let fontSize = 20 + (-change);
        if (fontSize < 5) fontSize = 5;
        if (fontSize > 50) fontSize = 50;
        this.props.addText({ ...this.props.texts[id], fontSize });
    }

    moveText(id, left, top) {
        const text = this.props.texts[id];
        this.props.addText({ ...text, left, top });
    }

    handleLogoClick = (event) => {
        const element = event.target;
        const logo = this.props.logos[element.id];
        const clicked = !logo.clicked;
        this.props.addLogo({ ...logo, clicked: clicked });
    }

    handleLogoDelete = (event) => {
        const element = event.target;
        const logo = this.props.logos[element.id];
        const render = !logo.render;
        this.props.addLogo({ ...logo, render: render });
    }

    handleTextClick = (event) => {
        const element = event.target;
        const text = this.props.texts[element.id];
        const clicked = !text.clicked;
        this.props.addText({ ...text, clicked: clicked });
    }

    handleTextDelete = (event) => {
        const element = event.target;
        const text = this.props.texts[element.id];
        const render = !text.render;
        this.props.addText({ ...text, render: render });
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

    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        const { logos } = this.props;
        const logoImages = this.props.logoImages;
        const addedTexts = this.props.texts;


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
            fontSize: "20px",
        }

        const resizeStyle = {
            width: "12px",
            height: "12px",
            backgroundColor: 'black',
            position: "absolute",
            cursor: "pointer"
        }

        return connectDropTarget(
            <div >
                <div className={`${styles.mainArea} download`} style={style}>
                    <Canvas logoImages={this.props.logoImages} />
                    {Object.keys(logos).map(key => {
                        const { left, top, width, height, render, clicked } = logos[key];
                        if (!render) return false;
                        const elleft = left - 9 + width;
                        const eltop = top - 9 + height;
                        return (
                            <>
                                <LogoElement
                                    key={key} id={key} left={left} top={top} width={width} height={height} hideSourceOnDrag="true"
                                    image={logoImages[+key - 1]}
                                    element={{ ...imageStyle, left, top, width: width + "px", height: height + "px" }}
                                    handleClick={this.handleLogoClick}
                                />
                                <ResizeElement id={key} width={width} height={height} left={left - 9} top={top - 9} resizeStyle={{ ...resizeStyle, left: elleft, top: eltop }} />
                                {clicked && <button id={key} style={{ ...buttonStyle, left, top: (+top + height + 10), width }}
                                    onClick={this.handleLogoDelete}>Delete</button>}
                            </>
                        )
                    })}
                    {Object.keys(addedTexts).map(key => {
                        const { left, top, value, render, font, color, fontSize, clicked } = addedTexts[key];
                        if (!render) return false;
                        //const elleft = left - 9 + 30;
                        //const eltop = top - 9 + 20;
                        return (
                            <>
                                <TextElement id={key} top={top} left={left} textStyle={{ ...textStyle, top: top, left: left, fontFamily: font, color, fontSize: fontSize + "px" }}
                                    handleClick={this.handleTextClick}
                                >{value}</TextElement>
                                <ResizeText id={key} width={20} height={20} left={left + 9} top={top + 9} resizeStyle={{ ...resizeStyle, left, top }} />
                                {clicked && <button id={key} style={{ ...buttonStyle, left, top: (+top + 25) }}
                                    onClick={this.handleTextDelete}>Delete</button>}
                            </>
                        )
                    })}
                </div>

                <SimpleButton handleClick={this.downloadImage}>Download as image</SimpleButton>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        logos: state.logos,
        texts: state.texts
    };
}

const mapDispatchToProps = {
    addLogo,
    deleteLogo,
    addText,
    deleteText,
};

const dropService = DropTarget(ItemTypes,
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
                }
                else {
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
                component.resizeLogo(item.id, deltaLeft, deltaTop, item.width, item.height);
            }

            if (item.type === ItemTypes[3]) {
                const deltaLeft = delta.x;
                const deltaTop = delta.y;
                component.resizeText(item.id, deltaLeft, deltaTop, item.width, item.height);
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
            if (item.type === ItemTypes[3]) {
                const deltaLeft = delta.x;
                const deltaTop = delta.y;
                component.resizeText(item.id, deltaLeft, deltaTop, item.width, item.height);
            }
        },

    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
)(MainEditorArea);
export default connect(mapStateToProps, mapDispatchToProps)(dropService);
