import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'
import font from '@fortawesome/fontawesome-free'
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
          <div
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={Logo}
                alt="..."
              />
            </div>
          </div>
          <h5 className="simple-text text-center">
            <IntlMessages id="sgn_head" />
          </h5>
        </div>
        <Nav>
          {user.role.includes('admin') ? (
            <>
              {/* <li className={activeRoute('/admin/dashboard')}>
                  <NavLink
                      to={'/admin/dashboard'}
                      className="nav-link"
                      activeClassName="active"
                  >
                    <i className={'fa fa-home'} />
                    <p><IntlMessages id="Dashboard" /></p>
                  </NavLink>
                </li> */}

              <li className={activeRoute('/admin/subAdmin')}>
                <NavLink
                  to={'/admin/subAdmin'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-user-tie'} />
                  <p><IntlMessages id="sub_admin" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/employee')}>
                <NavLink
                  to={'/admin/employee'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-users'} />
                  <p><IntlMessages id="ad_employee" /></p>
                </NavLink>
              </li>

              <li className={activeRoute('/admin/job')}>
                <NavLink
                  to={'/admin/job'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-briefcase'} />
                  <p><IntlMessages id="ad_job" /></p>
                </NavLink>
              </li>

              <li className={activeRoute('/admin/application')}>
                <NavLink
                  to={'/admin/application'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-clipboard-list'} />
                  <p><IntlMessages id="application" /></p>
                </NavLink>
              </li>

              <li className={activeRoute('/admin/project')}>
                <NavLink
                  to={'/admin/project'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-project-diagram'} />
                  <p><IntlMessages id="project" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/noticeofintent')}>
                <NavLink
                  to={'/admin/noticeofintent'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-clipboard-check'} />
                  <p><IntlMessages id="intent" /></p>
                </NavLink>
              </li>

              <li className={activeRoute('/admin/todoList')}>
                <NavLink
                  to={'/admin/todoList'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-list'} />
                  <p><IntlMessages id="to_do" /></p>
                </NavLink>
              </li>

              <li className={activeRoute('/admin/payment')}>
                <NavLink
                  to={'/admin/payment'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fa fa-credit-card'} />
                  <p><IntlMessages id="payment" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/benefit')}>
                <NavLink
                  to={'/admin/benefit'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fa fa-magic'} />
                  <p><IntlMessages id="benefit" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/reward')}>
                <NavLink
                  to={'/admin/reward'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-trophy'} />
                  <p><IntlMessages id="reward" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/chat-subadmin')}>
                <NavLink
                  to={'/admin/chat-subadmin'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-comment-dots'} />
                  <p><IntlMessages id="message" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/report')}>
                <NavLink
                  to={'/admin/report'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-receipt'} />
                  <p><IntlMessages id="report" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/quote')}>
                <NavLink
                  to={'/admin/quote'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-question-circle'} />
                  <p><IntlMessages id="quote" /></p>
                </NavLink>
              </li>
              <li className={activeRoute('/admin/getInTouch')}>
                <NavLink
                  to={'/admin/getInTouch'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-question-circle'} />
                  <p><IntlMessages id="in_touch" /></p>
                </NavLink>
              </li>
            </>
          ) : ''}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
