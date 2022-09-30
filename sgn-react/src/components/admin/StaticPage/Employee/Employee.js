import React, {useEffect, useState} from "react";
import './Employee.css'
import axios from "axios";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import {toast, ToastContainer} from "react-toastify";
import IntlMessages from '../../../../Util/IntlMessages';


const Employee = ( props ) => {
    const [loaded, setLoaded] = useState(false)
    const [activeUser, setActiveUser] = useState([]);
    const [inActiveUser, setInActiveUser] = useState([]);

    const Notify = () => toast.success('Application Updated Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    useEffect(() => {

        if(role.includes('subAdmin')) {
            axios.get('/subAdmin-employees', {headers: {"Authorization": `Bearer ${token}`}})
                .then((res) => {
                    setActiveUser(res.data.usersActive);
                    setInActiveUser(res.data.usersInActive);
                    setLoaded(true)
                })
        } else {
            axios.get('/admin/employees')
                .then((res) => {
                    setActiveUser(res.data.usersActive);
                    setInActiveUser(res.data.usersInActive);
                    setLoaded(true)
                })
        }

    }, [loaded]);

    const inActiveEmployeeHandler = ( id ) => {
        axios.put('/admin/employee/inactive/' + id, {})
            .then((res) => {
                console.log(res);
                setLoaded(false)
                Notify();
            })
    }

    return (
        <div className="container-fluid">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                            <div
                                className="card-header card-header-primary">
                                <h3 style={{fontWeight: "bold"}} className="card-title mb-0"><IntlMessages id="list_emp" /></h3>
                            </div>
                        <div className="card-body">

                            <div className="project-section">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a style={{ fontSize: '15px' }} className="nav-link btn btn-lg btn-outline btn-outline-success mr-2"
                                           id="activeEmp-tab" data-toggle="pill" href="#activeEmp" role="tab"
                                           aria-controls="activeEmp" aria-selected="false"><IntlMessages id="active" /></a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a style={{ fontSize: '15px' }} className="nav-link btn btn-lg btn-outline btn-outline-danger mr-2"
                                           id="inActiveEmp-tab" data-toggle="pill" href="#inActiveEmp" role="tab"
                                           aria-controls="inActiveEmp" aria-selected="true"><IntlMessages id="in_active" /></a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade active show" id="activeEmp" role="tabpanel"
                                         aria-labelledby="activeEmp">
                                        <EmployeeTable
                                            loaded={loaded}
                                            employee={activeUser}
                                            inActiveHandler={inActiveEmployeeHandler}
                                        />
                                    </div>
                                    <div className="tab-pane fade" id="inActiveEmp" role="tabpanel"
                                         aria-labelledby="inActiveEmp">
                                        <EmployeeTable
                                            fired={true}
                                            loaded={loaded}
                                            employee={inActiveUser}
                                        />
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

export default Employee;
