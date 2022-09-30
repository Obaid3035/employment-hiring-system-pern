import React, {useEffect, useState} from "react";
import axios from "axios";
import { NavLink} from "react-router-dom";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import IntlMessages from '../../../../Util/IntlMessages';

const EmployeeTodoList = ( props ) => {

    const [TodoList, setTodoList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const token = localStorage.getItem('token');


    useEffect(() => {
        axios.get('/employee/approvednoticeofintent', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setTodoList(res.data);
                setLoaded(true)
            })
    }, [loaded])

    const successNotify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const changedToSuccessHandler  = (id) => {
        axios.put('/employee/successNoticeOfIntent/' + id, {}, {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setLoaded(false)
                successNotify('Task Updated SuccessFully')
            })
    }

    return (
        <div className="content">
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div
                                className="card-header card-header-primary">
                                <h4 className="card-title mb-0"><IntlMessages id="to_dos" /></h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {loaded ? TodoList.length > 0 ?
                                        <table className="table table-striped">
                                        <thead className="">
                                        <tr>
                                            <th><IntlMessages id="bus_name" /></th>
                                            <th><IntlMessages id="task_done" /></th>
                                            <th><IntlMessages id="action" /></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {TodoList.map((notice, index) => (
                                            <tr key={index}>
                                                <td>{notice.businessName}</td>
                                                <td>
                                                    <button onClick={() => changedToSuccessHandler(notice.id)} role="button"
                                                            className="btn btn-sm btn-success"><i className="fa fa-check" /></button>
                                                </td>
                                                <td>
                                                    <NavLink to={'noticeofintent/' + notice.id} role="button"
                                                             className="btn btn-sm btn-primary"><i className="far fa-eye" /></NavLink>
                                                </td>
                                            </tr>
                                        )) }

                                        </tbody>
                                    </table>  : <h4 className="text-center"><IntlMessages id="no_todos" /></h4>  : <div className="text-center"><Spinner /></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeTodoList;
