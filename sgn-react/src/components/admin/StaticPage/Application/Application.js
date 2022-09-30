import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicationTable from "./ApplicationTable/ApplicationTable";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../Util/IntlMessages';
import { Button, Form, Modal } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

const Application = () => {
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false);
    const [underReviewApplication, setUnderReviewApplication] = useState([])
    const [declinedApplication, setDeclinedApplication] = useState([])
    const [hiredApplication, setHiredApplication] = useState([])
    const [allApplication, setAllApplication] = useState([]);
    const [userId, setUserId] = useState();
    const [isRequire, setIsRequire] = useState('');
    const [formData, setFormData] = useState({
        referralID: '',
        showSubAdmin: false,
    });
    const [subAdmin, setSubAdmin] = useState([]);
    const [user, setUser] = useState([]);

    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    useEffect(() => {

        if (role.includes('subAdmin')) {
            axios.get('/subAdmin-application', { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    setUnderReviewApplication(res.data.applicationForm)
                    setDeclinedApplication(res.data.declinedApplicant)
                    setHiredApplication(res.data.hiredApplicant);
                    setAllApplication(res.data.allApplicant)
                    setLoaded(true)
                });
        } else {
            axios.get('/admin/applications')
                .then((res) => {
                    setUnderReviewApplication(res.data.applicationForm)
                    setDeclinedApplication(res.data.declinedApplicant)
                    setHiredApplication(res.data.hiredApplicant);
                    setAllApplication(res.data.allApplicant)
                    setLoaded(true)
                });
        }

        axios.get('/subAdmin-select')
            .then((res) => {
                setSubAdmin(res.data)
            })
    }, [loaded])


    const Notify = () => toast.success('Application Updated Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });


    const hiredApplicationHandler = (id) => {
        setUserId(id);
        axios.get('/get-app/' + id)
            .then((res) => {
                if (res.data.required) {
                    setIsRequire(res.data.required)
                }
            })
        setShow(!show)
    }

    const declineApplicationHandler = (id) => {
        axios.put('/admin/application/decline/' + id, {})
            .then((res) => {
                console.log(res);
                setLoaded(false)
                Notify();
            })
    }

    const activeApplicationHandler = (id) => {
        axios.put('/admin/application/active/' + id, {})
            .then((res) => {
                console.log(res);
                setLoaded(false)
                Notify();
            })
    }

    const handleShow = () => setShow(!show);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formData)
        axios.put('/admin/application/hired/' + userId, formData)
            .then((res) => {
                console.log("RECEIVED")
                setShow(false)
                setLoaded(false)
                Notify();
            })
    }
    const inputChangeHandler = (e) => {
        console.log(e.target.value)
        setFormData({ ...formData, referralID: e.target.value })
    }

    const showSubAdminHandler = (e) => {
        setFormData({ ...formData, showSubAdmin: e.target.value })
    }
    const servicesPromiseHandler = () =>
        new Promise(resolve => {
            axios.get('/subAdmin-select')
                .then((services) => {
                    resolve(services.data)
                })
        });

    const handleInputChange = (newValue) => {
        setFormData({
            ...formData,
            subAdmins: newValue
        })
    };


    const form = (
        <Form className="my-5" onSubmit={onSubmitHandler}>
            <Form.Group >
                <Form.Label><IntlMessages id="main_id" /></Form.Label>
                <Form.Control type="number" className="form-control" required placeholder="Enter ID" onChange={(e) => inputChangeHandler(e)} value={formData.referralID} />
            </Form.Group>
            {
                isRequire === 'true' ? <div className="form-group row align-items-center">
                    <label htmlFor="haveAnyFriendsAtSGN" className="col-sm-8 col-form-label">Assign it to Sub Admin</label>
                    <div className="col-sm-4">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" name="showSubAdmin" type="radio" id="yes"
                                value={true} onChange={showSubAdminHandler} />
                            <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" name="showSubAdmin" type="radio" id="no"
                                value={false} onChange={showSubAdminHandler} />
                            <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                        </div>
                    </div>
                </div> : ''
            }

            {formData.showSubAdmin === 'true' ?
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label><IntlMessages id="user" /></Form.Label>
                    <AsyncSelect
                        name="services"
                        cacheOptions
                        defaultOptions
                        value={formData.subAdmins}
                        onChange={handleInputChange}
                        loadOptions={servicesPromiseHandler}
                    />                </Form.Group> : null}
            <Button type={'submit'} href="" variant={'primary'} size={'lg'}><IntlMessages id="enter" /></Button>
        </Form>
    )


    return (
        <>
            <Modal
                show={show}
                onHide={handleShow}
                animation={false}
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><IntlMessages id="ref_id" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
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
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h3 style={{fontWeight: "bold"}} className="card-title mb-0"><IntlMessages id="appli_list" /></h3>
                                </div>
                                <div className="card-body">
                                    <div className="project-section">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a style={{ fontSize: '15px' }} className="nav-link btn btn-sm btn-outline btn-outline-primary active mr-2"
                                                    id="all-tab" data-toggle="pill" href="#all" role="tab"
                                                    aria-controls="all" aria-selected="false"><IntlMessages id="all" /></a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a style={{ fontSize: '15px' }} className="nav-link btn btn-sm btn-outline btn-outline-warning mr-2"
                                                    id="review-tab" data-toggle="pill" href="#review" role="tab"
                                                    aria-controls="review" aria-selected="false"><IntlMessages id="under_rev" /></a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a style={{ fontSize: '15px' }} className="nav-link btn btn-sm btn-outline btn-outline-success mr-2"
                                                    id="hired-tab" data-toggle="pill" href="#hired" role="tab"
                                                    aria-controls="hired" aria-selected="false"><IntlMessages id="hired" /></a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a style={{ fontSize: '15px' }} className="nav-link btn btn-sm btn-outline btn-outline-danger mr-2"
                                                    id="rejected-tab" data-toggle="pill" href="#rejected" role="tab"
                                                    aria-controls="rejected" aria-selected="false"><IntlMessages id="rejected" /></a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade active show" id="all" role="tabpanel"
                                                aria-labelledby="all-tab">
                                                {loaded ? <ApplicationTable applicationForm={allApplication} all={'all'} loaded={loaded} accept={hiredApplicationHandler} declineApp={declineApplicationHandler} />
                                                    : <div className="text-center"><Spinner /></div>}
                                            </div>
                                            <div className="tab-pane fade" id="review" role="tabpanel"
                                                aria-labelledby="review-tab">
                                                {loaded ? <ApplicationTable applicationForm={underReviewApplication} loaded={loaded} accept={hiredApplicationHandler} declineApp={declineApplicationHandler} />
                                                    : <div className="text-center"><Spinner /></div>}
                                            </div>
                                            <div className="tab-pane fade" id="hired" role="tabpanel"
                                                aria-labelledby="hired-tab">
                                                {loaded ? <ApplicationTable applicationForm={hiredApplication} loaded={loaded} hired={true} declineApp={declineApplicationHandler} activeApp={activeApplicationHandler} /> : <div className="text-center"><Spinner /></div>}
                                            </div>
                                            <div className="tab-pane fade" id="rejected" role="tabpanel"
                                                aria-labelledby="rejected-tab">
                                                {loaded ? <ApplicationTable applicationForm={declinedApplication} rejected={true}  decline={true} loaded={loaded} accept={hiredApplicationHandler} /> : <div className="text-center"><Spinner /></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Application;
