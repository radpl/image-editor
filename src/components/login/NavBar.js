import React, { useEffect, useState } from "react";
//import { useAuth0 } from "../../react-auth0-spa";
import { Link, withRouter } from 'react-router-dom';
import styles from './navbar.module.css';
import { connect } from "react-redux";
import { getUser, signIn, signOut } from "../../redux/actions/userActions";
import LoginForm from "./LoginForm";

function NavBar(props) {

  const [isVisible, setVisible] = useState(false);

  const userSignIn = () => {
    //props.signIn();
    setVisible(true);
  }

  const hideLogin = (event) => {
    console.log("Hide Login");
    setVisible(false);
  }

  useEffect(() => {
    props.getUser();
  }, [])

  return (
    <>
      <nav className={styles.navMenu}>
        <ul className={styles.ulMenu}>
          <li ><Link to="/" className={styles.liMenu}>Home</Link></li>
          <li ><Link to="/profile" className={styles.liMenu}>My Profile</Link></li>
        </ul>
        {
          !(props.user && props.user.isAuthenticated) &&
          <button onClick={userSignIn}>Sign In</button>
        }
        {
          props.user && props.user.isAuthenticated &&
          <div>
            <label>Welcome, {props.user && props.user.email}</label>
            <button onClick={() => { props.signOut({ returnTo: window.location.origin }) }}> Sign Out</button>
          </div>
        }
      </nav>
      {isVisible && <LoginForm hideLogin={hideLogin} />}
    </>
  );
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  getUser,
  signIn,
  signOut
};
const navBarWithRouter = withRouter(NavBar)
export default connect(mapStateToProps, mapDispatchToProps)(navBarWithRouter);
