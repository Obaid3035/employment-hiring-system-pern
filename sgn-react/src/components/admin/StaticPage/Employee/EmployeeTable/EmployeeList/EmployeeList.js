import React from 'react';
import {NavLink} from "react-router-dom";
import IntlMessages from '../../../../../../Util/IntlMessages';
const EmployeeList = ( props ) => {



    return (
        <tr>
            <td>{props.referralID}</td>
            <td>{props.firstName}</td>
            <td>{props.jobTitle}</td>
            <td>{`${props.jobCountry}/${props.jobCity}`}</td>
            <td>{props.role[0]}, {props.role[1]}</td>
            <td>{props.applicationStatus}</td>
            {
                props.fired ? null
                    : <>
                        <td className="">
                            <NavLink to={'benefit/' + props.id}
                                     className="btn btn-sm btn-info"><i
                                className="fas fa-trophy text-primary mr-2" /><IntlMessages id="benefits" /></NavLink>
                        </td>
                        <td>
                            <NavLink to={'employee/' + props.id}
                                     className="btn btn-sm btn-primary"><i
                                className="far fa-eye" /></NavLink>
                            {props.inActive ?
                                <button role="button" onClick={() => props.inActive(props.id)} className="btn btn-sm btn-danger"><i
                                    className="far fa-trash-alt" /></button>
                                : ''}
                        </td>
                    </>
            }
        </tr>
    )
}

export default EmployeeList;
