import React, {useState} from 'react';
import EmployeeList from "./EmployeeList/EmployeeList";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../../Util/IntlMessages';


const EmployeeTable = ( props ) => {
    console.log(props.loaded)

    return (
        props.loaded ? props.employee.length > 0 ? <div className="table-responsive">
            <table className="table table-striped to-do-list">
                <thead className="">
                <tr>
                    <th><IntlMessages id="main_id" /></th>
                    <th><IntlMessages id="name" /></th>
                    <th><IntlMessages id="position" /></th>
                    <th><IntlMessages id="location" /></th>
                    <th><IntlMessages id="role" /></th>
                    <th><IntlMessages id="status" /></th>
                    {
                        props.fired ? null :
                            <>
                                <th><IntlMessages id="benefits" /></th>
                                <th><IntlMessages id="Action" /></th>
                            </>
                    }
                </tr>
                </thead>
                <tbody>
                { props.employee.map((employee, index) => (
                    <EmployeeList
                        key={index}
                        id={employee.id}
                        role={employee.roles}
                        referralID={employee.applicationForm.referralID}
                        firstName={employee.applicationForm.firstName}
                        jobTitle={employee.applicationForm.jobListing.jobTitle}
                        jobCountry={employee.applicationForm.jobListing.jobCountry}
                        jobCity={employee.applicationForm.jobListing.jobCity}
                        applicationStatus={employee.applicationForm.applicationStatus}
                        inActive={props.inActiveHandler}
                        fired={props.fired}
                    />
                ))}
                </tbody>
            </table>
        </div> : <h4 className="text-center"><IntlMessages id="no_emp" /></h4> : <div className="text-center"><Spinner /></div>
    );
}
export default EmployeeTable;
