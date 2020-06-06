import React from 'react'
import { connect } from 'react-redux';
import { addLogo } from "../../redux/actions/logoActions";

function LogoElement(props) {

    const addLogoPosition = (event) => {
        event.preventDefault();
        const id = Object.keys(props.logos).length + 1;
        props.addLogo({ id, logoid: props.id, x: 100, y: 100, clicked: false, render: true });
    }

    return (
        <img
            id={props.id}
            src={props.image}
            alt={props.alt}
            style={props.element}
            onClick={addLogoPosition} />
    );
}

function mapStateToProps(state, ownProps) {
    return {
        logos: state.logos,
    };
}

const mapDispatchToProps = {
    addLogo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoElement);
