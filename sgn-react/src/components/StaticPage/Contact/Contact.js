import React from 'react';
import './Contact.css'
import {NavLink} from "react-router-dom";
import IntlMessages from '../../../Util/IntlMessages';


const Contact = ( props ) => {

    return (
        <>
            <section className="contact-banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="header-content">
                                <h1><IntlMessages id="contact_us" /></h1>
                                <p><IntlMessages id="contact_para" />
                                </p>
                                <a className="custom-scroll" href="#contact-details" role="button"
                                   data-target="#contact-details">
                                   <IntlMessages id="scroll" />
                                    <span>
							<img src="img/arrow-scroll.png" alt="scroll-arrow" className="img-fluid pt-3 pr-1" />
						</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-details">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <NavLink to={'/questionare'} className=" get-form-btn btn get-quote " ><IntlMessages id="fill_form" /></NavLink>
                        </div>
                        <div className="col-md-9">
                            <div className="card div_1 p-5 text-left bg-primary">
                                <h3><IntlMessages id="contact_us" /></h3>
                                <img src="img/contact-page-border-bottom.png" alt="border image"
                                     className="w-75" />
                                    <p><IntlMessages id="contactus_para" /></p>
                                    <div className="d-flex align-items-center mb-5">
                                        <div>
                                            <img src="img/phone-icon.png" alt="phone icon"
                                                 className="w-75 pr-3" />
                                        </div>
                                        <div>
                                            <h6><IntlMessages id="call_us" /></h6>
                                            <a href="tel:+123456789"><IntlMessages id="foot_number" /></a>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-5">
                                        <div>
                                            <img src="img/envelope-icon.png" alt="phone icon"
                                                 className="w-75 pr-3" />
                                        </div>
                                        <div>
                                            <h6><IntlMessages id="mail_head" /></h6>
                                            <a href="mailto:loremipsum@gmail.com"><IntlMessages id="foot_email" /></a>
                                        </div>
                                    </div>

                                    {/*<div className="d-flex align-items-center">*/}
                                    {/*    <div>*/}
                                    {/*        <img src="img/location-mark-icon.png" alt="phone icon"*/}
                                    {/*             className="w-75 pr-3" />*/}
                                    {/*    </div>*/}
                                    {/*    <div>*/}
                                    {/*        <h6><IntlMessages id="contact_address" /></h6>*/}
                                    {/*        <p className="m-0"><IntlMessages id="contact_addressPara" /></p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
