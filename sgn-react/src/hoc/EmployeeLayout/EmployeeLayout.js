import React, {useEffect, useState} from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import EmployeeNavbar from "../../components/employee/Navbars/AdminNavbar";
import Footer from "../../components/employee/Footer/Footer";
import Sidebar from "../../components/employee/Sidebar/Sidebar";
import UnAuthorize from "../../helpers/UnAuthorize/UnAuthorize";

import routes, {users} from "../../routes";

import sidebarImage from "../../assets/img/sidebar-3.jpg";
import getRoutes from "../../helpers/getRoutes";
import SubAdminForm from "../../components/admin/StaticPage/SubAdmin/SubAdminForm/SubAdminForm";
import SubAdmin from "../../components/admin/StaticPage/SubAdmin/SubAdmin";
import Dashboard from "../../components/admin/StaticPage/DashBoard/Dashboard";
import NotFound from "../../components/NotFound";
import EmployeeDetail from "../../components/admin/StaticPage/Employee/EmployeeDetail/EmployeeDetail";
import Employee from "../../components/admin/StaticPage/Employee/Employee";
import ViewJob from "../../components/admin/StaticPage/Jobs/ViewJob/ViewJob";
import Jobs from "../../components/admin/StaticPage/Jobs/Jobs";
import ApplicationReview from "../../components/admin/StaticPage/Application/ApplicationReview/ApplicationReview";
import Application from "../../components/admin/StaticPage/Application/Application";
import ViewNoticeOfIntent
  from "../../components/admin/StaticPage/NoticeOfIntents/ViewNoticeOfIntent/ViewNoticeOfIntent";
import ToDoLists from "../../components/admin/StaticPage/ToDoLists/ToDoLists";
import Project from "../../components/admin/StaticPage/Projects/Projects";
import Payments from "../../components/admin/StaticPage/Payments/Payments";
import BenefitForm from "../../components/admin/StaticPage/Benefit/BenefitForm/Benefit";
import Benefits from "../../components/admin/StaticPage/Benefit/Benefits";
import NoticeOfIntents from "../../components/admin/StaticPage/NoticeOfIntents/NoticeOfIntents";
import EmployeeNoticeOfIntents from "../../components/employee/StaticPage/NoticeOfIntents/NoticeOfIntents";
import axios from "axios";
import EmployeeTodoList from "../../components/employee/StaticPage/TodoList/TodoList";
import EmployeeProject from "../../components/employee/StaticPage/Project/Project";
import EmployeeHelp from "../../components/employee/StaticPage/Help/Help";
import EmployeeProfile from "../../components/employee/StaticPage/Profile/Profile";
import EmployeeReward from "../../components/employee/StaticPage/Rewards/Reward/Reward";
import EmployeeViewNoticeOfIntent
  from "../../components/employee/StaticPage/NoticeOfIntents/ViewNoticeOfIntent/ViewNoticeOfIntent";
import EmployeeRewards from "../../components/employee/StaticPage/Rewards/Rewards";
import EmployeeChats from "../../components/employee/StaticPage/Chats/Chats";
import ContractView from "../../components/admin/StaticPage/Application/ContractView/Contract";
import Chats from "../../components/admin/StaticPage/Chats/Chats";

function EmployeeLayout(  ) {
  console.log('LOGGED IN')
  const [roleDetail, setRoleDetail] = useState({});
  const [roles, setRoles] = useState([]);

const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/admin/role', { headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => {
          setRoles(res.data.roles)
          setRoleDetail(res.data.roleDetail);
        })
  }, [])

  const user = {
    role: roles,
    roleDetail
  }

  // let adminRoute;
  // let employeeRoute;
  // const [role, setRole] = useState({});
  // const admin = JSON.parse(localStorage.getItem('admin'))
  // if (admin.user.roles.includes('subAdmin') || admin.user.roles.includes('admin')) {
  //   id = admin.user.id
  //   if (id) {
  //     axios.get('/admin/role/' + id )
  //         .then((res) => {
  //           setRole(res.data)
  //         })
  //   }
  //   adminRoute = routes.filter(( i) => {
  //     if (i.name === 'Dashboard') {
  //       return true
  //     }
  //     if (role.application && i.name === 'Application') {
  //       return true
  //     }
  //     if (role.subAdmin && i.name === 'Sub Admin') {
  //       return true
  //     }
  //     if (role.job && i.name === 'Job') {
  //       return true
  //     }
  //     if (role.employee && i.name === 'Employee') {
  //       return true
  //     }
  //     if (role.project && i.name === 'Project') {
  //       return true
  //     }
  //     if (role.noticeOfIntent && i.name === 'Notice Of Intent') {
  //       return true
  //     }
  //     if (role.application && i.name === 'Application') {
  //       return true
  //     }
  //     if (role.toDoList && i.name === 'Todo List') {
  //       return true
  //     }
  //     if (role.payment && i.name === 'Payment') {
  //       return true
  //     }
  //     if (role.benefit && i.name === 'Benefit') {
  //       return true
  //     }
  //     return null
  //   })
  //   route.push(adminRoute);
  // }

  // if (admin.user.roles.includes('employee')){
  //   employeeRoute = routes.filter(( j) => {
  //     if (j.employee) {
  //       return true;
  //     }
  //   })
  //   route.push(employeeRoute);
  // }






  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);
  //let getRoutes;



    // getRoutes = (routes) => {
    //   return routes.map((prop, key) => {
    //     if (prop.layout === "/admin" || prop.layout === '/employee') {
    //       return (
    //           <Route
    //               path={prop.layout + prop.path}
    //               exact={prop.exact}
    //               render={(props) => user ? <prop.component {...props} /> : <Redirect to={'/unauthorized'}/>}
    //               key={key}
    //           />
    //       );
    //     } else {
    //       return null;
    //     }
    //   });
    // };
  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainPanel.current.scrollTop = 0;
  //   if (
  //       window.innerWidth < 993 &&
  //       document.documentElement.className.indexOf("nav-open") !== -1
  //   ) {
  //     document.documentElement.classList.toggle("nav-open");
  //     var element = document.getElementById("bodyClick");
  //     element.parentNode.removeChild(element);
  //   }
  // }, [location]);

  const role = localStorage.getItem('role')

  return (
      <><div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} user={user}/>
        <div className="main-panel" ref={mainPanel}>
          <EmployeeNavbar />
          <div className="content">
            <Switch>
              <Route path={'/employee/chat'} exact component={EmployeeChats} />
              <Route path={'/employee/reward/:id'} component={EmployeeReward}/>
              <Route path={'/employee/profile'} exact component={EmployeeProfile}/>
              <Route path={'/employee/help'} exact component={EmployeeHelp}/>
              <Route path={'/employee/project'} exact component={EmployeeProject}/>
              <Route path={'/employee/todoList'} exact component={EmployeeTodoList}/>
              <Route path={'/employee/noticeofintent/:id'} component={EmployeeViewNoticeOfIntent} />
              <Route path={'/employee/noticeofintent'} exact component={EmployeeNoticeOfIntents} />
              <Route path='/employee/subAdmin/:id' component={SubAdminForm}/>
              <Route path='/employee/employee/:id' component={EmployeeDetail}/>
              <Route path='/employee/job/:id' component={ViewJob}/>
              <Route path='/employee/contract/:id' exact component={ContractView}/>
              <Route path={'/employee/reward'} exact component={EmployeeRewards} />
              <Route path='/employee/application/:id' component={ApplicationReview}/>
              <Route path='/employee/noticeofintent-subadmin/:id' component={ViewNoticeOfIntent}/>
              <Route path='/employee/benefit/:id' component={BenefitForm}/>
              <Route path='/employee/benefit' exact component={Benefits}/>
              <Route path='/employee/payment' exact component={Payments}/>
              <Route path='/employee/project-subadmin' exact component={Project}/>
              <Route path='/employee/todoList-subadmin' exact component={ToDoLists}/>
              <Route path='/employee/noticeofintent-subadmin' exact component={NoticeOfIntents}/>
              <Route path='/employee/job' exact component={Jobs}/>
              <Route path={'/employee/chat-subadmin'} exact component={Chats} />
              <Route path='/employee/application' exact component={Application}/>
              <Route path='/employee/subAdmin' exact component={SubAdmin}/>
              <Route path='/employee/employee' exact component={Employee}/>
              <Route path='/employee/dashboard' exact component={Dashboard}/>
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
        </>
  );
}

export default EmployeeLayout;
