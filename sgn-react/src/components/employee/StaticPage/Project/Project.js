import React, {useEffect, useState} from "react";
import ProjectTable from "./ProjectTable/ProjectTable";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../Util/IntlMessages';

const EmployeeProject = ( props ) => {

    const token = localStorage.getItem('token')

    const [successProject, setSuccessProject] = useState([]);
    const [commissionedProject, setCommissionedProject] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('/employee/projects', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setSuccessProject(res.data.SuccessNotice)
                setCommissionedProject(res.data.CommissionedNotice)
                setLoaded(true)
            })
    }, [loaded])

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h3 style={{fontWeight: "bold"}} className="card-title mb-0"><IntlMessages id="comp_proj" /></h3>
                            </div>

                            <div className="card-body">
                                <div className="project-section">
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a style={{fontSize: "15px"}} className="nav-link btn btn-sm btn-outline btn-outline-warning active mr-2"
                                               id="all-tab" data-toggle="pill" href="#all" role="tab"
                                               aria-controls="all" aria-selected="false"><IntlMessages id="completed" /></a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a style={{fontSize: "15px"}} className="nav-link btn btn-sm btn-outline btn-outline-success mr-2"
                                               id="completed-tab" data-toggle="pill" href="#completed" role="tab"
                                               aria-controls="completed" aria-selected="true"><IntlMessages id="commission" /></a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade active show" id="all" role="tabpanel"
                                             aria-labelledby="all-tab">
                                            <div className="table-responsive">
                                                {loaded ? successProject.length > 0
                                                    ? <ProjectTable project={successProject}/>
                                                    : <h4 className="text-center"><IntlMessages id="no_proj" /></h4>
                                                        : <div className="text-center"><Spinner /></div>
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="completed" role="tabpanel"
                                             aria-labelledby="completed-tab">
                                            <div className="table-responsive">
                                                {loaded ? commissionedProject.length > 0
                                                    ? <ProjectTable project={commissionedProject}/>
                                                    : <h4 className="text-center"><IntlMessages id="no_proj" /></h4>
                                                    : <div className="text-center"><Spinner /></div>
                                                }
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
    )
}

export default EmployeeProject;
