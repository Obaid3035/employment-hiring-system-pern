import React, {useEffect, useState} from "react";
import axios from "axios";
import IntlMessages from '../../../../../Util/IntlMessages';

const RewardView = ( props ) => {

    const [rewardData, setRewardData] = useState();
    const id = props.match.params.id
    console.log(id)
    useEffect(() => {
        axios.get('/admin/reward/' + id)
            .then((res) => {
                setRewardData(res.data);
            })
    }, [])
    return (
        <div className="content">
            {rewardData ? <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">{rewardData.reward.name}</h4>
                                <p className="card-category">{ rewardData.reward.description}</p>
                            </div>

                            <div className="card-body">
                                <div className="row mt-2 align-items-start">
                                    <div className="col-lg-8">
                                        <div className="card rounded shadow border mb-4 project-view-card">
                                            <div className="card-header"><IntlMessages id="employe" /></div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-striped to-do-list">
                                                        <thead className="">
                                                        <th><IntlMessages id="main_id" /></th>
                                                        <th><IntlMessages id="name" /></th>
                                                        <th><IntlMessages id="pro_score" /></th>
                                                        </thead>
                                                        <tbody>
                                                        {rewardData.employee.map((user) => (
                                                            <tr>
                                                                <td>{user.id}</td>
                                                                <td>{user.firstName}</td>
                                                                <td>{user.totalPoint > 0 ? user.totalPoint : 0}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : '' }
        </div>
    )
}

export default RewardView;
