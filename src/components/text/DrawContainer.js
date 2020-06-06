import React, { useState } from 'react'
import SimpleHeader from "../common/SimpleHeader";
import { connect } from "react-redux";
import { selected } from "../../redux/actions/settingsActions";

function DrawContainer(props) {

  // const [inputValue, setInput] = useState(false);

  const handleChange = (event) => {
    const { checked, value } = event.target;
    // setInput(inputValue);
    props.selected({ [value]: checked })
  }

  return <>
    <SimpleHeader size="smallLeft">Draw</SimpleHeader>
    <form style={{ textAlign: "left" }}>
      <input type="checkbox" id="draw1" name="drawLine" value="freeline" checked={props.tool} onChange={handleChange} />
      <label for="draw1">Free line</label><br />
    </form>
  </>

}

function mapStateToProps(state, ownProps) {
  return {
    tool: state.settings && state.settings.tool && state.settings.tool.freeline
  };
}

const mapDispatchToProps = {
  selected,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer);