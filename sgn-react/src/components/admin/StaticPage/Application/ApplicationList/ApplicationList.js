import React from "react";
import {NavLink} from "react-router-dom";

const ApplicationList = (props ) => {
    const dummy = () => {
        console.log('hello world')
    }

    const onClick = () => {
        if (props.hired) {
            props.hired(props.id)
        } else if(props.active) {
            props.active(props.id)
        } else {dummy();}
    }

    const role = localStorage.getItem('role')
    let btn = <NavLink to={'/admin/contract/'+ props.id} className="btn btn-sm btn-warning"><i
        className="fas fa-eye"/></NavLink>
if (role.includes('subAdmin')) {
    btn = <NavLink to={'/employee/contract/'+ props.id} className="btn btn-sm btn-warning"><i
        className="fas fa-eye"/></NavLink>
}
    return (
        <>
            <tr>
                <td>
                    {props.id}
                </td>
                <td>
                    {props.firstName}
                </td>
                <td>
                    {props.jobCountry}
                </td>
                <td>
                    {props.jobTitle}
                </td>
                {props.status ? <td>{props.status}</td> : ''}
                <td>
                    {props.createdAt}
                </td>
                <td>
                    {props.Hired ?  btn : <NavLink to={"application/" + props.id}
                                                                      className="btn btn-sm btn-primary"><i
                        className="fas fa-eye"/></NavLink>}
                    {props.all ? '': <>
                        {
                            !props.rejected ? (
                                <button role="button" onClick={onClick} className="btn btn-sm btn-success"><i
                                    className="fas fa-check text-white"/></button>
                            ) : null
                        }
                        {
                            props.Decline ? '' : <button role="button" onClick={props.decline ? () => props.decline(props.id) : dummy} className="btn btn-sm btn-danger"><i
                                className="fas fa-times text-white"/></button>
                        }
                    </> }
                </td>
            </tr></>
    );
}
export default ApplicationList;
