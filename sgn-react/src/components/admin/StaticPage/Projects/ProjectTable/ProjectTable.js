import React from "react";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {Button} from "react-bootstrap";
import axios from "axios";
import IntlMessages from '../../../../../Util/IntlMessages';

const ProjectTable = ( props ) => {
    console.log(
        console.log('PROJECT',props.project)

    )


    return (
        <div className="table-responsive">
            <table className="table">
                    <thead className="">
                    <tr>
                        <th>#</th>
                        <th><IntlMessages id="emp_name" /></th>
                        <th><IntlMessages id="bus_name" /></th>
                        <th><IntlMessages id="status" /></th>
                        {/*<th><IntlMessages id="approve_btn" /></th>*/}
                        {props.payment ? '' : (
                            <>
                                <th><IntlMessages id="points" /></th>
                                <th><IntlMessages id="action" /></th>
                            </>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    { props.project.map((project, index) => {
                        return (
                            <tr key={index}>
                                <td>{project.id}</td>
                                <td>{project.User.applicationForm ? project.User.applicationForm.firstName : 'Admin'}</td>
                                <td>{project.businessName}</td>
                                <td className="">
                                    <span>{project.status}</span>
                                </td>
                                {/*<button className=" mx-4 mb-4" onClick={(id) => props.onSubmit(project.id)}>*/}
                                {/*    <i className="far fa-eye" /></button>*/}
                                {props.payment ? '' :
                                    <>
                                        <td>{project.points}</td>
                                        <td>
                                            <button
                                                role="button"
                                                onClick={() => props.handleShow(project.id)}
                                                className="btn btn-sm btn-primary">
                                                <i className="far fa-eye" /></button>
                                            { project.status !== 'commissioned'
                                                ? project.User.applicationForm ? props.changeStatus  ?
                                                    props.allProject ?
                                                        <button onClick={() => props.changeStatus(project.id, project.status)} className="btn btn-sm btn-warning"><IntlMessages id="change" />
                                                            <IntlMessages id="status" /></button> :
                                                        <button onClick={() => props.changeStatus(project.id)} className="btn btn-sm btn-warning"><IntlMessages id="change" />
                                                            <IntlMessages id="status" /></button> : '' : ''
                                                : ''
                                            }
                                        </td>
                                    </>
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    );
};

export default ProjectTable;
