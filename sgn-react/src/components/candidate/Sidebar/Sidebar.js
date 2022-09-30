import React  from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'
import IntlMessages from '../../../Util/IntlMessages';
import { Nav } from "react-bootstrap";

function Sidebar({ color, image, user }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">   
            <div className="logo-img">
              <img
                src={Logo}
                alt="..."
              />
            </div>
          <a className="simple-text">
          <IntlMessages id="sgn_head" /> 
          </a>
        </div>
        <Nav>
          {console.log(user.role)}
          {(user.role.includes('candidate')) ?   <>
            <li className={activeRoute('/candidate/profile')}>
              <NavLink
                  to={'/candidate/profile'}
                  className="nav-link"
                  activeClassName="active"
              >
                <i className={'fa fa-user'} />
                <p><IntlMessages id="profile" /></p>
              </NavLink>
            </li>
          </> : ''}

        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
