import React from "react";
import {NavLink} from "react-router-dom";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../../Util/IntlMessages';

const Rewards = ( props ) => {
    return(
        <div className="table-responsive">
            {props.loaded ? props.RewardData.length > 0 ? <table className="table table-striped to-do-list">
                <thead className="">
                <tr>
                    <th><IntlMessages id="main_id" /></th>
                    <th><IntlMessages id="title" /></th>
                    <th><IntlMessages id="description" /></th>
                    <th><IntlMessages id="date" /></th>
                    <th><IntlMessages id="action" /></th>
                </tr>
                </thead>
                <tbody>
                {props.RewardData.map((reward) => (
                    <tr>
                        <td>{reward.id}</td>
                        <td>{reward.name}</td>
                        <td>{reward.description}</td>
                        <td>{reward.createdAt}</td>
                        <NavLink to={'/admin/reward/'+ reward.id}
                                 className="btn btn-sm btn-primary ml-4 mt-3"><i
                            className="far fa-eye" /></NavLink>
                        {
                            reward.status === 'onGoing' ?
                                (
                                    <>
                                        <button className={"btn btn-sm btn-warning ml-4 mt-3"} onClick={() => props.editHandleShow(reward.id)}><i className={'far fa-bell'}/></button>
                                        <button className={"btn btn-sm btn-primary ml-4 mt-3"} onClick={() => props.inActiveHandler(reward.id)}><i className={'far fa-bell'}/></button>
                                    </>
                                )
                                : null
                        }
                    </tr>
                ))}
                </tbody>
            </table> : <h4 className="text-center"><IntlMessages id="no_reward" /></h4>
                : <div className="text-center"><Spinner /></div>}

        </div>
    )
}

export default Rewards;
