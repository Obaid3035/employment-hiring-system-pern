import React, {useEffect, useState} from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import AdminNavbar from "../../components/admin/Navbars/AdminNavbar";
import Footer from "../../components/admin/Footer/Footer";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import FixedPlugin from "../../components/admin/FixedPlugin/FixedPlugin.js";
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
import Reward from "../../components/admin/StaticPage/Reward/Reward";
import RewardView from "../../components/admin/StaticPage/Reward/RewardView/RewardView";
import ContractView from "../../components/admin/StaticPage/Application/ContractView/Contract";
import Report from "../../components/admin/StaticPage/Report/Report";
import Chats from "../../components/admin/StaticPage/Chats/Chats";
import Quote from "../../components/admin/StaticPage/Quote/Quote";
import QuoteView from "../../components/admin/StaticPage/Quote/QuoteView/QuoteView";
import GetInTouch from "../../components/admin/StaticPage/GetInTouch/GetInTouch";
import SubAdminView from "../../components/admin/StaticPage/SubAdmin/SubAdminView/SubAdminView";

function Admin(  ) {
    const admin = {
        role: ['admin'],
    }
    console.log('IM AMD DMIN')
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
    return (
        <><div className="wrapper">
            <Sidebar color={color} image={hasImage ? image : ""} user={admin}/>
            <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                    <Switch>
                        <Route path={'/admin/getInTouch'} exact component={GetInTouch} />
                        <Route path={'/admin/quote/:id'} exact component={QuoteView} />
                        <Route path='/admin/quote' exact component={Quote}/>
                        <Route path='/admin/subAdmin-view/:id' component={SubAdminView}/>
                        <Route path='/admin/subAdmin/:id' component={SubAdminForm}/>
                        <Route path='/admin/employee/:id' component={EmployeeDetail}/>
                        <Route path='/admin/job/:id' component={ViewJob}/>
                        <Route path='/admin/application/:id' component={ApplicationReview}/>
                        <Route path='/admin/reward/:id' component={RewardView}/>
                        <Route path='/admin/noticeofintent-subadmin/:id' component={ViewNoticeOfIntent}/>
                        <Route path='/admin/benefit/:id' component={BenefitForm}/>
                        <Route path={'/admin/chat-subadmin'} exact component={Chats} />
                        <Route path='/admin/contract/:id' exact component={ContractView}/>
                        <Route path={'/admin/report'} exact component={Report} />
                        <Route path='/admin/benefit' exact component={Benefits}/>
                        <Route path='/admin/payment' exact component={Payments}/>
                        <Route path='/admin/project' exact component={Project}/>
                        <Route path='/admin/todoList' exact component={ToDoLists}/>
                        <Route path='/admin/reward' exact component={Reward}/>
                        <Route path='/admin/noticeofintent' exact component={NoticeOfIntents}/>
                        <Route path='/admin/job' exact component={Jobs}/>
                        <Route path='/admin/application' exact component={Application}/>
                        <Route path='/admin/subAdmin' exact component={SubAdmin}/>
                        <Route path='/admin/employee' exact component={Employee}/>
                        <Route path='/admin/dashboard' exact component={Dashboard}/>
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
            <FixedPlugin
                hasImage={hasImage}
                setHasImage={() => setHasImage(!hasImage)}
                color={color}
                setColor={(color) => setColor(color)}
                image={image}
                setImage={(image) => setImage(image)}
            /> </>
    );
}

export default Admin;
