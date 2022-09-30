import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Modal, Form} from "react-bootstrap";
import Aux from "../../../../hoc/wrapper/Wrapper";
import Input from "../../../UI/Input/Input";
import formConfig from "../../../../helpers/formConfig";
import NoticeOfIntent from "./NoticeOfIntent/NoticeOfIntent";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import IntlMessages from '../../../../Util/IntlMessages';

const NoticeOfIntents = () => {

    const [noticeOfIntent, setNoticeOfIntent] = useState([]);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    useEffect(() => {

        if(role.includes('subAdmin')) {
            axios.get('/subadmin-noticeofintents', {headers: {"Authorization": `Bearer ${token}`}})
                .then((res) => {
                    console.log('NEW ', res.data)
                    setNoticeOfIntent(res.data.result);
                    console.log('MY NOTICE',res.data)
                    setLoaded(true)
                })
        } else {
            axios.get('/admin/noticeofintents')
                .then((res) => {
                    setNoticeOfIntent(res.data);
                    console.log('NOTICE OF INTENT',res.data)
                    setLoaded(true)
                })
        }


    }, [loaded])



    const table =  noticeOfIntent && noticeOfIntent.length > 0 && noticeOfIntent.map((notice, index) => {
        if(notice.User) {
            console.log('FIRSTNAME',notice.User.applicationForm)
        }
        return (
            notice.User && notice.User.applicationForm ?
            <NoticeOfIntent
                key={index}
                id={notice.id}
                firstName={notice.User.applicationForm.firstName}
                businessName={notice.businessName}
                createdAt={notice.createdAt}
                status={notice.status}
            /> : null
        )
    })

    return (
        <Aux>
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
                                <div className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h3 style={{fontWeight: "bold"}} className="card-title mb-0"><IntlMessages id="notice_intent" /></h3>

                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {loaded ? noticeOfIntent.length > 0 ? <table className="table table-striped">
                                            <thead className="">
                                            <tr>
                                                <th>#</th>
                                                <th><IntlMessages id="created_by" /></th>
                                                <th><IntlMessages id="business_time" /></th>
                                                <th><IntlMessages id="date_time" /></th>
                                                <th><IntlMessages id="status" /></th>
                                                <th><IntlMessages id="action" /></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {table}
                                            </tbody>
                                        </table> : <h4 className={'text-center'}><IntlMessages id="no_notice" /></h4> : <div className="text-center"><Spinner /></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default NoticeOfIntents;
