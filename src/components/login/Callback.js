import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Callback extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    console.log("Callback");
    // await auth0Client.handleAuthentication();
    // saveSignUp().then(result => {
    //     console.log(result);
    // }).catch(error => {
    //     console.log(error);
    // });

    // const redirectLocation = localStorage.getItem("REDIRECT_AFTER_LOGIN") ? JSON.parse(localStorage.getItem("REDIRECT_AFTER_LOGIN")) : "/";
    // this.props.history.replace(redirectLocation);

  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);