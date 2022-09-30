import React from 'react';
import {NavLink} from "react-router-dom";
import IntlMessages from '../../../../../Util/IntlMessages';
const NoticeOfIntent = (props) => {
    console.log("FUCK UUU")
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.firstName}</td>
            <td>{props.businessName}</td>
            <td>{props.createdAt}</td>
            <td><span className="badge badge-pill badge-secondary">{props.status==='underReview'
                ? 'Under Review'
                : props.status}</span></td>
            <td>
                <NavLink to={'noticeofintent-subadmin/' + props.id} role="button" className="btn btn-lg btn-primary "><IntlMessages id="View" /></NavLink>
            </td>
        </tr>
    )
}
export default NoticeOfIntent;
