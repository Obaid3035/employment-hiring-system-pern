import React, {useEffect, useState} from "react";
import './ApplicationStatus.css'
import axios from "axios";
import Spinner from "../../UI/ProgressBar/ProgressBar";
import moment from 'moment-timezone';
import IntlMessages from '../../../Util/IntlMessages';


const ApplicationStatus = ( props ) => {

    const token = localStorage.getItem('token')
    const [ApplicationData, setApplicationData] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        axios.get('/application', {headers: {"Authorization": token}})
            .then((res) => {
                console.log(res.data)
                setApplicationData(res.data)
                setLoaded(true)
            })
    }, [loaded])

    return (
        <section className="job-area" id="job-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center mb-5">
                        <h3><IntlMessages id="app_formStatus" /></h3>
                    </div>
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="app-table app-status app-status table table-borderless" cellSpacing="0">
                                <tbody>
                                {loaded ? ApplicationData.map((application, index) => (
                                    <tr className="" key={index}>
                                        <td>
                                            <span><IntlMessages id="applied_for" /></span> {application.jobListing.jobTitle}
                                        </td>
                                        <td>
                                            <span><IntlMessages id="location" /></span> {application.jobListing.jobCity}, {application.jobListing.jobCountry}
                                        </td>
                                        <td>
                                            <span><IntlMessages id="applied_on" /></span> {moment.tz(application.createdAt, 'America/New_York').format()}
                                        </td>
                                        <td className="status status-approved">
                                            <a href="#">{application.applicationStatus}</a>
                                        </td>
                                    </tr>
                                )) : <div className={'text-center'}><Spinner /></div>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ApplicationStatus;
