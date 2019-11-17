import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import styles from './colors.module.css';

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '#000',
        };

    }

    render() {
        return (<div className={styles.pickerMain}><CompactPicker width="200px"
            color={this.props.color}
            onChangeComplete={this.props.handleColorChange} />
        </div>);
    }
}

export default ColorPicker;