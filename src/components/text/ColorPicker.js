import React from 'react';
import { CompactPicker } from 'react-color';
import styles from './colors.module.css';
import { connect } from 'react-redux';
import { changeColor } from "../../redux/actions/colorActions"

function ColorPicker(props) {

    const handleColorChange = (color) => {
        props.changeColor(color.hex);
    }

    return (<div className={styles.pickerMain}><CompactPicker width="200px"
        color={props.color}
        onChangeComplete={handleColorChange} />
    </div>);
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
