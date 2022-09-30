import React from 'react';
import Aux from "../../../hoc//wrapper/Wrapper";
import './About.css'
import IntlMessages from '../../../Util/IntlMessages';
import {NavLink} from "react-router-dom";

const About = ( props ) => {
    return (
        <Aux>
            <section className="about-banner-area">
                <div className="container">
                        <div>
                            <div className="header-content home__banner__text">
                                <h1><IntlMessages id="About_us" /></h1>
                                <p ><IntlMessages id="sgn_newyork" /></p>
                            </div>
                        </div>
                </div>
            </section>

            <section className="bg-circle-image">
                <img src="img/r2.png" alt="circle" className="img-fluid" />
            </section>


            <section className="detail-section" id="detail-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pb-5 mb-5">
                            <h3><IntlMessages id="save" /> <span><IntlMessages id="with_us" /></span></h3>
                        </div>
                    </div>
                </div>
                <section className="about-cta-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-3 text-center">
                                <NavLink to={'/questionare'}><a className={'btn btn-warning btn-lg quote-btn'}><IntlMessages id="get_quote" /></a></NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className="pt-5 mt-5 pb-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <img className="card-img-top img-fluid" src="img/about-card-1.jpg" alt="Card" />
                                    <div className="card-body about-card-body">
                                        <p className="card-text"><IntlMessages id="card_text1" /></p>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <img className="card-img-top img-fluid" src="img/about-card-2.jpg" alt="Card" />
                                    <div className="card-body about-card-body">
                                        <p className="card-text"><IntlMessages id="card_text2" /></p>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <img className="card-img-top img-fluid" src="img/about-card-3.jpg" alt="Card" />
                                    <div className="card-body about-card-body">
                                        <p className="card-text"><IntlMessages id="card_text3" /></p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Aux>
    );
};

export default About;
