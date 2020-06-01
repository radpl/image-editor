import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import styles from './colors.module.css';
import { connect } from 'react-redux';
import { changeColor } from "../../redux/actions/colorActions"

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '#000',
        };

    }
    handleColorChange = (color) => {
        this.props.changeColor(color.hex);
    }

    render() {
        return (<div className={styles.pickerMain}><CompactPicker width="200px"
            color={this.props.color}
            onChangeComplete={this.handleColorChange} />
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        color: state.color
    };
}

const mapDispatchToProps = {
    changeColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)
