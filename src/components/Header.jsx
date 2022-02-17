import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import gravatar from "../utils/gravatar";
import classNames from "classname";
import { logoutRequest } from "../actions/index";
import "../assets/styles/components/Header.scss";
import logo from "../assets/static/logo-videos.svg";
import userIcon from "../assets/static/user-icon.png";

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});
  };

  const headerClass = classNames("header", {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to="/">
        {/* <img className="header__img" src={logo} alt="Logo Video" /> */}
        <h3 className="header-logo">Logo Video</h3>
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          {hasUser ? (
            <img src={gravatar(user.email)} alt={user.email} />
          ) : (
            <img src={userIcon} alt="" />
          )}
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ? (
            <li>
              <a href="/">{user.name}</a>
            </li>
          ) : null}
          {hasUser ? (
            <li>
              <a href="#logout" onClick={handleLogout}>
                Cerrar sesión
              </a>
            </li>
          ) : (
            <Link to="/login">Iniciar sesión</Link>
          )}
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  type: propTypes.string,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
