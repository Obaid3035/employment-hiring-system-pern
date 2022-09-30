import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../Util/IntlMessages';

const Payments = ( props ) => {

    const [commissionedProject, setCommissionedProject] = useState([]);
    const [loaded, setLoaded] = useState(false)

    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    useEffect(() => {

        if(role.includes('subAdmin')) {
            axios.get('/subadmin-commissioned', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setCommissionedProject(res.data.commissionedIntent);
                console.log(res.data)
                setLoaded(true)
            })
        } else {
            axios.get('/admin/commissioned')
                .then((res) => {
                    setCommissionedProject(res.data.commissionedIntent);
                    console.log(res.data.commissionedIntent)
                    setLoaded(true)
                })
        }
    },[loaded])

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h3 style={{fontWeight: "bold"}} className="card-title mb-0"><IntlMessages id="payment" /></h3>
                            </div>
                            <div className="card-body">
                                <div className="project-section">
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade active show" id="all" role="tabpanel"
                                             aria-labelledby="all-tab">
                                            <div className="table-responsive">
                                                {loaded ?commissionedProject && commissionedProject.length > 0
                                                    ? <table className="table">
                                                        <thead className="">
                                                        <tr>
                                                            <th>#</th>
                                                            <th><IntlMessages id="emp_name" /></th>
                                                            <th><IntlMessages id="status" /></th>
                                                            <th><IntlMessages id="created_at" /></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        { commissionedProject.map((project, index) => (
                                                            <tr key={index}>
                                                                <td>{project.id}</td>
                                                                <td>{project.User.applicationForm.firstName}</td>
                                                                <td><button disabled className={'btn-warning'} style={{'border-radius': '20px'}}><IntlMessages id="commisioned" /></button></td>
                                                                <td>{project.createdAt}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                    : <h3 className="text-center"><IntlMessages id="no_project" /></h3>
                                                    : <div className="text-center"><Spinner /></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payments;
