import './App.css';
import React, {useEffect, useState} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import EmployeeLayout from "./hoc/EmployeeLayout/EmployeeLayout";
import AdminLayout from "./hoc/AdminLayout/AdminLayout";
import Login from "./components/admin/Login/Login";
import UnAuthorize from "./helpers/UnAuthorize/UnAuthorize";
import NotFound from "./components/NotFound";
import {useAuth} from "./context/AuthContext";
import Layout from "./hoc/Layout/Layout";
import CandidateLayout from "./hoc/CandidateLayout/CandidateLayout";
import Welcome from "./components/StaticPage/Welcome";
import { IntlProvider } from 'react-intl';
import { connect } from "react-redux";
import AppLocale from './lang/index';
import {setLanguage} from "./store/action/language";
import ForgotPassword from "./components/admin/Login/ForgotPassword";
import NewPassword from "./components/admin/Login/newPassword";

//rehman3904561@cloud.neduet.edu.pk
//bY09UH7

//obaid3035@gmail.com
//S9CV9K1

const App = ( props ) => {

    useEffect(() => {
        const lang = localStorage.getItem('lang');

        if(lang) {
            props.setLanguage(JSON.parse(lang))
        }
    }, [])
    const { locale, languages } = props.locale;
    const currentAppLocale = AppLocale[locale.locale];

    console.log(currentAppLocale)
    let {loggedIn} = useAuth();
    if (!loggedIn) {
         loggedIn = localStorage.getItem('loggedIn')
    }

    const role = localStorage.getItem('role')

  return (
    <IntlProvider
    locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
    >
      <Switch>
          <Route exact path='/unauthorized' component={UnAuthorize} />
          {loggedIn && role.includes('admin') ? <Route path={'/admin'} render={(props) =><AdminLayout {...props} />  }/> : ''}
          {loggedIn && (role.includes('employee') || role.includes('subAdmin') ) ? <Route path={'/employee'} render={(props) =><EmployeeLayout {...props} />  }/> : ''}
          {loggedIn && role.includes('candidate') ? <Route path={'/candidate'} render={(props) =><CandidateLayout {...props} />  }/> : ''}
          <Route path={'/admin/resetPassword/:id'} exact component={NewPassword} />
          <Route path={'/admin/forgot-password'} exact component={ForgotPassword} />
          <Route path={'/admin/login'} exact component={Login} />
          <Route render={(props) => <Layout {...props}/>} />
          <Route component={NotFound} />
      </Switch>
      </IntlProvider>
  );
}

const mapStateToProps = state => {
    return {
        locale: state.language
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => dispatch(setLanguage(lang))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);


