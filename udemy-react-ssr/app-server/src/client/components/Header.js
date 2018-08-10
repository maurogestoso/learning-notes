import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const styles = {
  header: {
    display: "flex"
  },
  title: {},
  nav: {}
};

const Header = ({ auth }) => {
  const authButton = auth ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/auth/google">Login</a>
  );

  return (
    <header style={styles.header}>
      <Link to="/">React SSR</Link>
      <nav>
        <Link to="/users">Users</Link>
        <Link to="/admins">Admins</Link>
        {authButton}
      </nav>
    </header>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
