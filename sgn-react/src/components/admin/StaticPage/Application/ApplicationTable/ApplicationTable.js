import React from "react";
import ApplicationList from "../ApplicationList/ApplicationList";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../../Util/IntlMessages';

const ApplicationTable = ( props ) => (
    <div className="table-responsive">
        {props.loaded ? (props.applicationForm.length > 0 ? <table className="table" id="applications-list-table">
            <thead className="">
            <tr>
                <th style={{fontWeight: "bold"}}>
                <IntlMessages id="main_id" />
                </th>
                <th style={{fontWeight: "bold"}}>
                <IntlMessages id="appli_name" />
                </th>
                <th style={{fontWeight: "bold"}}>
                <IntlMessages id="loc" />
                </th>
                <th style={{fontWeight: "bold"}}>
                <IntlMessages id="applied_for" />
                </th>
                {props.all ? <th style={{fontWeight: "bold"}}><IntlMessages id="status" /></th>: ''}
                <th style={{fontWeight: "bold"}}>
                <IntlMessages id="applied_on" />
                </th>
                <th style={{fontWeight: "bold"}}>
                <IntlMessages id="action" />
                </th>
            </tr>

            </thead>
            <tbody>
            {props.applicationForm.map((application, index) => (
                <ApplicationList
                    key={index}
                    id={application.id}
                    rejected={props.rejected}
                    all={props.all}
                    firstName={application.firstName}
                    status={application.applicationStatus}
                    Hired={props.hired}
                    Decline={props.decline}
                    jobCountry={application.jobListing.jobCountry}
                    jobTitle={application.jobListing.jobTitle}
                    createdAt={application.createdAt}
                    hired={props.accept}
                    decline={props.declineApp}
                    active={props.activeApp}
                />
            ))}
            </tbody>
        </table> : <h3 className={'text-center'}><IntlMessages id="no_appli_found" /></h3>) : <div className="text-center"><Spinner /></div>}
    </div>
)

export default ApplicationTable;
