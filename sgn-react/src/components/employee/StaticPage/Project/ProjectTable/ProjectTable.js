import React from "react";
import IntlMessages from '../../../../../Util/IntlMessages';

const ProjectTable = ( props ) => {
    return (
        <table className="table">
            <thead className="">
            <tr>
                <th>#</th>
                <th><IntlMessages id="assign_by" /></th>
                <th><IntlMessages id="bus_name" /></th>
                <th><IntlMessages id="status" /></th>
            </tr>
            </thead>
            <tbody>
            {props.project.map((project, index) => (
                <tr key={index}>
                    <td>{project.id}</td>
                    <td>{project.User.applicationForm.firstName}</td>
                    <td>{project.businessName}</td>
                    <td className="">
                        {project.status}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProjectTable;
