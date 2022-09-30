import React from "react";
import {NavLink} from "react-router-dom";

const SubAdminList = (props) => {
    console.log(props.status)
    let btn = <button to={'subAdmin-view/' + props.id}
                      onClick={() => props.onDelete(props.id)}
                      className="btn btn-sm btn-danger"><i
        className="fas fa-cross text-primary" /></button>

    if (props.status === 'Disabled') {
        btn = <button to={'subAdmin-view/' + props.id}
                      onClick={() => props.onEnable(props.id)}
                      className="btn btn-sm btn-success"><i
            className="fas fa-cross text-primary" /></button>
    }

    let btn2 = null;

    console.log('Status',props.status)
    if(props.status === 'Enabled') {
        btn2 = <NavLink to={'subAdmin-view/' + props.id}
                        className="btn btn-sm btn-warning"><i
            className="fas fa-edit text-primary" /></NavLink>
    }

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.email}</td>
            <td>{props.roles[0]},{props.roles[1]}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.phoneNumber}</td>
            <td className="">
                {
                    btn2
                }

                {
                   btn
                }
            </td>
            <td>
                {/*<NavLink to={'employee/' + props.id}*/}
                {/*         className="btn btn-sm btn-primary"><i*/}
                {/*    className="far fa-eye" /></NavLink>*/}
                {/*<a role="button" className="btn btn-sm btn-danger"><i*/}
                {/*    className="far fa-trash-alt" /></a>*/}
            </td>
        </tr>
    )
}

export default SubAdminList;
