import React, {useEffect, useState} from 'react';
import './Career.css'
import axios from "axios";
import {NavLink} from "react-router-dom";
import Spinner from "../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../Util/IntlMessages';

const Career = ( props ) => {

    const [jobData, setJobData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [queryForm, setQueryForm] = useState();

    useEffect(() => {
        axios.get('/jobs')
            .then((res) => {
                setJobData(res.data);
                setLoaded(true)
            })
    }, [loaded])

    const allJobs = jobData.map((job) => (
        <tr className="">
            <td>
                <span><IntlMessages id="position_title" /></span> {job.jobTitle}
            </td>
            <td>
                <span><IntlMessages id="location" /></span> {job.jobCity}, {job.jobCountry}

            </td>
            <td>
                <span><IntlMessages id="date_posted" /></span> {job.createdAt}
            </td>
            <td className="view-more-btn">
                <NavLink to={'/job/' + job.id}><IntlMessages id="view_more" /></NavLink>
            </td>
        </tr>
    ))

    const filterData = (e) => {
        e.preventDefault();
        const queryParams = [];
        for (let i in queryForm) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(queryForm[i]))
        }
        const queryString = queryParams.join('&');
        axios.get(`/jobs?${queryString}`)
            .then((res) => {
                console.log(res.data)
                setJobData(res.data)
            })
    }
    const queryChangeHandler = (e) => {
        const {name, value} = e.target
        const updated = {...queryForm}
        updated[name] = value
        setQueryForm(updated)
        console.log(queryForm)
    }

    return (
        <>
            <section className="career-banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="header-content">
                                <h1 ><IntlMessages id="career_head" /></h1>
                                <p><IntlMessages id="career_para" />
                                </p>
                                <a className="custom-scroll" href="#job-area" role="button" data-target="#job-area">
                                <IntlMessages id="scroll" /> 
                                    <span>
							<img src="img/arrow-scroll.png" alt="scroll-arrow"
                                 className="img-fluid pt-3 pr-1" />
						</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="job-area" id="job-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center mb-5">
                            <h3><IntlMessages id="recent_jobs" /></h3>
                        </div>
                        <div className="col-md-10 mb-4">
                            <form onSubmit={filterData} action="">
                                <div className="career-row">
                                    <div className="col-lg-4 col-md-6 mb-4 mr-2">
                                        <input type="text" className="form-control" id="" name={'jobTitle'} required onChange={(e) => queryChangeHandler(e)}
                                               placeholder="Job title, keywords, or company" />
                                    </div>
                                    <div className="col-lg-2 col-md-6 mb-4 mr-2">
                                        <input type="text" className="form-control" id="" name={'jobCountry'} required onChange={(e) => queryChangeHandler(e)} placeholder="Country" />
                                    </div>
                                    <div className="col-lg-2 col-md-6 mb-4 mr-2">
                                        <input type="text" className="form-control" id=""  name={'jobState'} required onChange={(e) => queryChangeHandler(e)}
                                               placeholder="Province" />
                                    </div>
                                    <div className="col-lg-2 col-md-6 mb-4 mr-2">
                                        <input type="text" className="form-control" id="" name={'jobCity'} required onChange={(e) => queryChangeHandler(e)} placeholder="City" />
                                    </div>
                                    <div className="col-lg-2 col-md-6 mb-4 mr-2">
                                        <button type="submit" className="btn btn-lg btn-primary mt-2"><IntlMessages id="find_jobs" /></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="job-table table table-borderless" cellSpacing="0">
                                    <tbody>
                                    {loaded ? jobData.length > 0 ? allJobs : (<h3 className={'text-center'}><IntlMessages id="noJobs_found" /></h3>) : <div className={'text-center'}><Spinner /></div>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Career;
