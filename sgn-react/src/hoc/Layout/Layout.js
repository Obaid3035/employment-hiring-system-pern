import React, {useState} from 'react';
import { connect } from "react-redux";

import Aux from "../wrapper/Wrapper";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from '../../routes'
import Home from "../../components/StaticPage/Home/Home";
import Contact from "../../components/StaticPage/Contact/Contact";
import Career from "../../components/StaticPage/Career/Career";
import About from "../../components/StaticPage/About/About";
import NotFound from "../../components/NotFound";
import ApplicationStatus from "../../components/StaticPage/ApplicationStatus/ApplicationStatus";
import JobReview from "../../components/StaticPage/Career/JobReview/JobReview";
import ApplicationForm from "../../components/StaticPage/ApplicationForm/ApplicationForm";
import Welcome from "../../components/StaticPage/Welcome";
import Questionare from "../../components/StaticPage/Questionare/Questionare";
import Survey from "../../components/StaticPage/Survey/Survey";
import SurveyForm from "../../components/StaticPage/SurveyForm/SurveyForm";
import { IntlProvider } from 'react-intl';
import AppLocale from '../../lang/index';


const Layout = ( props ) => {
    const loggedIn = localStorage.getItem('loggedIn')
    const [welcome, setWelcome] = useState(true)
    const { locale, languages } = props.locale;
    const currentAppLocale = AppLocale[locale.locale];

    console.log(currentAppLocale)

    // const getRoutes = (routes) => {
    //     return routes.map((prop, key) => {
    //         if (!prop.redirect) {
    //             return (
    //                 <Route
    //                     path={prop.layout + prop.path}
    //                     exact
    //                     render={(props) => <prop.component {...props} />}
    //                     key={key}
    //                 />
    //             );
    //         } else {
    //             return null;
    //         }
    //     });
    // };
    // //{getRoutes(routes)}
    return (
        <>
        <Navigation />
            <main>
                <IntlProvider
        locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
        >
               <Switch>
                   <Route path={'/welcome'} exact component={Welcome}/>
                   <Route path={'/survey-form/:id'} exact component={SurveyForm}/>
                   <Route path={'/survey/:id'} exact component={Survey} />
                   <Route path={'/questionare'} exact component={Questionare} />
                   <Route path={'/application/:id'} exact component={ApplicationForm}/>
                   <Route path={'/about'} exact component={About} />
                   <Route path={'/career'} exact  component={Career} />
                   <Route path={'/contact'} exact component={Contact} />
                   <Route path={'/job/:id'} exact component={JobReview} />
                   {loggedIn ? <Route path={'/applicationStatus'} exact component={ApplicationStatus} /> : ''}
                   <Route path={'/'} exact component={Home} />
                   <Route component={NotFound} />
               </Switch>
               </IntlProvider>
            </main>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        locale: state.language
    }
}



export default connect(mapStateToProps, null)(Layout);
