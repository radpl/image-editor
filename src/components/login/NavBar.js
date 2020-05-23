import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Link, withRouter } from 'react-router-dom';
import styles from './navbar.module.css';

function NavBar(props) {

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  const signOut = () => {
    logoutWithRedirect();
    //props.history.replace('/');
  };

  const signIn = () => {
    //localStorage.setItem("REDIRECT_AFTER_LOGIN", JSON.stringify(props.history.location));
    loginWithRedirect({});
  }

  return (
    <nav className={styles.navMenu}>
      <ul className={styles.ulMenu}>
        <li ><Link to="/" className={styles.liMenu}>Home</Link></li>
        <li ><Link to="/profile" className={styles.liMenu}>My Profile</Link></li>
      </ul>
      {
        !isAuthenticated &&
        <button onClick={signIn}>Sign In</button>
      }
      {
        isAuthenticated &&
        <div>
          <label>Welcome, {user && user.email}</label>
          <button onClick={() => { signOut() }}> Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);
