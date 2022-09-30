import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'
import IntlMessages from '../../../Util/IntlMessages';
import { Nav } from "react-bootstrap";

function Sidebar({ color, image, user }) {
  console.log(user)
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
          {(user.role.includes('subAdmin') || user.role.includes('employee')) ? <>
            {user.roleDetail.dashboard ?
              <li className={activeRoute('/employee/dashboard')}>
                <NavLink
                  to={'/employee/dashboard'}
                  className="nav-link"
                  activeClassName="active">
                  <i className={'fa fa-home'} />
                  <p><IntlMessages id="Dashboard" /></p>
                </NavLink>
              </li> : ''}


            {user.roleDetail.subAdmin ?
              <li className={activeRoute('/employee/subAdmin')}>
                <NavLink
                  to={'/employee/subAdmin'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={'fas fa-user-tie'} />
                  <p><IntlMessages id="sub_admin" /></p>
                </NavLink>
              </li> : ''
            }

            {
              user.roleDetail.chat ?
                <li className={activeRoute('/employee/chat-subadmin')}>
                  <NavLink
                    to={'/employee/chat-subadmin'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fas fa-comment-dots'} />
                    <p><IntlMessages id="message" /></p>
                  </NavLink>
                </li> : ''
            }

            {
              user.roleDetail.employee ?
                <li className={activeRoute('/employee/employee')}>
                  <NavLink
                    to={'/employee/employee'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fas fa-users'} />
                    <p><IntlMessages id="ad_employee" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.roleDetail.job ?
                <li className={activeRoute('/employee/job')}>
                  <NavLink
                    to={'/employee/job'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fas fa-briefcase'} />
                    <p><IntlMessages id="ad_job" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.roleDetail.application ?
                <li className={activeRoute('/employee/application')}>
                  <NavLink
                    to={'/employee/application'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fas fa-clipboard-list'} />
                    <p><IntlMessages id="application" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.roleDetail.project ?
                <li className={activeRoute('/employee/project-subadmin')}>
                  <NavLink
                    to={'/employee/project-subadmin'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fas fa-project-diagram'} />
                    <p><IntlMessages id="project" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.roleDetail.noticeOfIntent ?
                <li className={activeRoute('/employee/noticeofintent-subadmin')}>
                  <NavLink
                    to={'/employee/noticeofintent-subadmin'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fas fa-clipboard-check'} />
                    <p><IntlMessages id="intent" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.roleDetail.toDoList ?
                <li className={activeRoute('/employee/todoList-subadmin')}>
                  <NavLink
                    to={'/employee/todoList-subadmin'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fas fa-list'} />
                    <p><IntlMessages id="to_do" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.roleDetail.payment ?
                <li className={activeRoute('/employee/payment')}>
                  <NavLink
                    to={'/employee/payment'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fa fa-credit-card'} />
                    <p><IntlMessages id="payment" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.roleDetail.benefit ?
                <li className={activeRoute('/employee/benefit')}>
                  <NavLink
                    to={'/employee/benefit'}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={'fa fa-magic'} />
                    <p><IntlMessages id="benefit" /></p>
                  </NavLink>
                </li>
                : ''
            }

            {
              user.role.includes('employee') ?
                (
                  <>
                    <li className={activeRoute('/employee/profile')}>
                      <NavLink
                        to={'/employee/profile'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={'fa fa-user'} />
                        <p><IntlMessages id="profile" /></p>
                      </NavLink>
                    </li>
                    <li className={activeRoute('/employee/noticeofintent')}>
                      <NavLink
                        to={'/employee/noticeofintent'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={'fas fa-clipboard-check'} />
                        <p><IntlMessages id="curr_notice" /></p>
                      </NavLink>
                    </li>

                    <li className={activeRoute('/employee/todoList')}>
                      <NavLink
                        to={'/employee/todoList'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={'nc-icon nc-alien-33'} />
                        <p><IntlMessages id="curr_todo" /></p>
                      </NavLink>
                    </li>
                    <li className={activeRoute('/employee/project')}>
                      <NavLink
                        to={'/employee/project'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={'fas fa-list'} />
                        <p><IntlMessages id="curr_proj" /></p>
                      </NavLink>
                    </li>
                    <li className={activeRoute('/employee/reward')}>
                      <NavLink
                        to={'/employee/reward'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={'fas fa-trophy'} />
                        <p><IntlMessages id="curr_rewards" /></p>
                      </NavLink>
                    </li>

                    <li className={activeRoute('/employee/chat')}>
                      <NavLink
                        to={'/employee/chat'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={'fas fa-comment-dots'} />
                        <p><IntlMessages id="curr_msg" /></p>
                      </NavLink>
                    </li>

                    <li className={activeRoute('/employee/help')}>
                      <NavLink
                        to={'/employee/help'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={'fa fa-question-circle'} />
                        <p><IntlMessages id="help" /></p>
                      </NavLink>
                    </li>
                  </>
                ) : ''
            }

          </> : ''}

        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
