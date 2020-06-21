import React, { useEffect } from 'react'
import SimpleHeader from '../common/SimpleHeader';
import { getUserImages } from "../../redux/actions/imageActions";
import ImageBrowser from "./ImageBrowser";
import { connect } from 'react-redux';

function BrowseContainer(props) {

  useEffect(() => {
    props.getUserImages(props.user).then(res => console.log(res));

  }, [])

  return (
    <div>
      <SimpleHeader size="medium">Browse Images</SimpleHeader>
      <ImageBrowser userImages={props.images} />
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user && state.user.db && state.user.db.user,
    images: state.images

  };
}

const mapDispatchToProps = {
  getUserImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);
