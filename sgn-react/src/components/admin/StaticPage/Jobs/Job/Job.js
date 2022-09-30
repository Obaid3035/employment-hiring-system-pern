import React from 'react';
import {NavLink} from "react-router-dom";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../../Util/IntlMessages';

const Job = ( props ) => {

    return (
        <tr>
            <td>
                {props.id}
            </td>
            <td>
                {props.jobTitle}
            </td>
            <td>
                {`${props.jobCountry}/${props.jobCity}`}
            </td>
            <td>
                {`${props.createdAt}`}
            </td>
            <td>
                <NavLink to={'job/' + props.id} className="btn btn-primary"><IntlMessages id="edit_show" />
                </NavLink>
                {props.btnLoader ? <button type="button" onClick={props.jobDelete} className="btn btn-danger"><IntlMessages id="delete" />
                </button> : <Spinner />}
            </td>
        </tr>
    );
}

export default Job;
