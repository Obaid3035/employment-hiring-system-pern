import React from 'react';

import Home from "./components/StaticPage/Home/Home";
import Dashboard from "./components/admin/StaticPage/DashBoard/Dashboard";
import About from "./components/StaticPage/About/About";
import Career from "./components/StaticPage/Career/Career";
import SubAdmin from "./components/admin/StaticPage/SubAdmin/SubAdmin";
import SubAdminForm from "./components/admin/StaticPage/SubAdmin/SubAdminForm/SubAdminForm";
import Employee from "./components/admin/StaticPage/Employee/Employee";
import EmployeeDetail from "./components/admin/StaticPage/Employee/EmployeeDetail/EmployeeDetail";
import Jobs from "./components/admin/StaticPage/Jobs/Jobs";
import Application from "./components/admin/StaticPage/Application/Application";
import ApplicationReview from "./components/admin/StaticPage/Application/ApplicationReview/ApplicationReview";
import NoticeOfIntents from "./components/admin/StaticPage/NoticeOfIntents/NoticeOfIntents";
import ViewNoticeOfIntent from "./components/admin/StaticPage/NoticeOfIntents/ViewNoticeOfIntent/ViewNoticeOfIntent";
import ViewJob from "./components/admin/StaticPage/Jobs/ViewJob/ViewJob";
import ToDoLists from "./components/admin/StaticPage/ToDoLists/ToDoLists";
import Project from "./components/admin/StaticPage/Projects/Projects";
import Payments from "./components/admin/StaticPage/Payments/Payments";
import Benefits from "./components/admin/StaticPage/Benefit/Benefits";
import BenefitForm from "./components/admin/StaticPage/Benefit/BenefitForm/Benefit";
import Contact from "./components/StaticPage/Contact/Contact";
import NotFound from "./components/NotFound";

const dashboardRoutes = [

    // {
    //       path: "/",
    //       component: Home,
    //       layout: "/",
    // },
    // {
    //     path: "about",
    //     component: About,
    //     layout: "/",
    // },
    // {
    //     path: "career",
    //     component: Career,
    //     layout: "/",
    // },
    // {
    //     path: "contact",
    //     component: Contact,
    //     layout: "/",
    // },

    // {
    //     path: "/project",
    //     exact: true,
    //     name: "Dashboard",
    //     icon: "nc-icon nc-alien-33",
    //     component: Project,
    //     layout: "/employee",
    //     employee: true,
    //     sideBar: true
    // },

    {
        path: "/dashboard",
        exact: true,
        name: "Dashboard",
        icon: "nc-icon nc-alien-33",
        component: Dashboard,
        layout: "/admin",
        sideBar: true
    },
    {
        path: "/subAdmin/:id",
        icon: "nc-icon nc-alien-33",
        component: SubAdminForm,
        layout: "/admin",
    },
    {
        path: "/subAdmin",
        name: "Sub Admin",
        icon: "nc-icon nc-alien-33",
        component: SubAdmin,
        layout: "/admin",
        sideBar: true
    },
    {
        path: "/employee/:id",
        icon: "nc-icon nc-alien-33",
        component: EmployeeDetail,
        layout: "/admin",
    },

    {
        path: "/employee",
        name: "Employee",
        icon: "nc-icon nc-alien-33",
        component: Employee,
        layout: "/admin",
        sideBar: true
    },
    {
        path: "/job/:id",
        icon: "nc-icon nc-alien-33",
        component: ViewJob,
        layout: "/admin",
    },
    {
        path: "/job",
        name: "Job",
        icon: "nc-icon nc-alien-33",
        component: Jobs,
        layout: "/admin",
        sideBar: true
    },
    {
        path: "/application/:id",
        icon: "nc-icon nc-alien-33",
        component: ApplicationReview,
        layout: "/admin",
    },
    {
        path: "/application",
        name: "Application",
        icon: "nc-icon nc-alien-33",
        component: Application,
        layout: "/admin",
        sideBar: true
    },

    {
        path: "/noticeofintent/:id",
        icon: "nc-icon nc-alien-33",
        component: ViewNoticeOfIntent,
        layout: "/admin",
    },

    {
        path: "/noticeofintent",
        name: "Notice Of Intent",
        icon: "nc-icon nc-alien-33",
        component: NoticeOfIntents,
        layout: "/admin",
        sideBar: true
    },

    {
        path: "/todoList",
        name: "Todo List",
        icon: "nc-icon nc-alien-33",
        component: ToDoLists,
        layout: "/admin",
        sideBar: true
    },
    {
        path: "/project",
        name: "Project",
        icon: "nc-icon nc-alien-33",
        component: Project,
        layout: "/admin",
        sideBar: true
    },
    {
        path: "/payment",
        name: "Payment",
        icon: "nc-icon nc-alien-33",
        component: Payments,
        layout: "/admin",
        sideBar: true
    },
    {
        path: "/benefit/:id",
        icon: "nc-icon nc-alien-33",
        component: BenefitForm,
        layout: "/admin",
    },
    {
        path: "/benefit",
        name: "Benefit",
        icon: "nc-icon nc-alien-33",
        component: Benefits,
        layout: "/admin",
        sideBar: true
    },



  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

const users = {
    role: 'subAdmin',
    application: true,
    job: false,
    subAdmin: true
}

export default dashboardRoutes;
export {users};
