import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Aux from "../../../../hoc//wrapper/Wrapper";
import axios from "axios";
import Input from "../../../UI/Input/Input";
import formConfig from "../../../../helpers/formConfig";
import { NavLink } from "react-router-dom";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import IntlMessages from '../../../../Util/IntlMessages';

const EmployeeNoticeOfIntents = (props) => {
    const [noticeOfIntent, setNoticeOfIntent] = useState([]);
    const [show, setShow] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [noticeOfIntentForm, setNoticeOfIntentForm] = useState({
        businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
        potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
        planOnGoing: formConfig('dateTime', 'col-md-6', 'text', 'Date'),
        businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
        additionalInformation: formConfig('input', 'col-md-12', 'text', 'Additional Info'),
    })

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/employee/noticeofintent', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setNoticeOfIntent(res.data);
                setLoaded(true)
            })
    }, [loaded])

    const Notify = () => toast.success('Notice Created Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });


    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedNoticeForm = {
            ...noticeOfIntentForm
        }
        const updatedFormElement = {
            ...updatedNoticeForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedNoticeForm[inputIdentifier] = updatedFormElement;

        setNoticeOfIntentForm(updatedNoticeForm);
    }

    const formElementArray = [];
    for (const key in noticeOfIntentForm) {
        formElementArray.push({
            id: key,
            config: noticeOfIntentForm[key],
        })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShow(false)
        const formData = {};
        for (const formElementIdentifier in noticeOfIntentForm) {
            formData[formElementIdentifier] = noticeOfIntentForm[formElementIdentifier].value;
        }
        console.log(formData)

        axios.post('/employee/noticeofintent', formData, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data)
                Notify()
                setShow(false)
                setLoaded(false)
                setNoticeOfIntentForm({
                    businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
                    potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
                    planOnGoing: formConfig('date', 'col-md-6', 'text', 'Date', Date.now()),
                    businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
                    additionalInformation: formConfig('input', 'col-md-12', 'text', 'Additional Info'),
                })
            })
    }

    const datePickerHandler = (date, inputIdentifier) => {

        const updatedNoticeForm = {
            ...noticeOfIntentForm
        }

        const updatedFormElement = {
            ...updatedNoticeForm[inputIdentifier]
        }

        updatedFormElement.value = date;
        updatedNoticeForm[inputIdentifier] = updatedFormElement;

        setNoticeOfIntentForm(updatedNoticeForm);
    }

    const form = (
        <form onSubmit={formSubmitHandler}>
            <div className="form-row">
                {formElementArray.map((formElement, index) => (
                    <Input
                        key={index}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => inputChangeHandler(event, formElement.id)}
                        datePickerHandler={(e) => datePickerHandler(e, formElement.id)}
                        label={formElement.config.elementConfig.placeholder}
                        class={formElement.config.elementCol}
                    />
                ))}
            </div>
            <Button type={'submit'} size={'lg'} variant={'warning'} className={'px-5'}><IntlMessages id="create_intent" /></Button>
        </form>
    )

    const handleShow = () => {
        setShow(!show)
    };

    const table = noticeOfIntent.map((notice, index) => {
        return (
            <tr key={index}>
                <td >{notice.id}</td>
                <td >{notice.businessName}</td>
                <td >{notice.planOnGoing}</td>
                <td >{notice.createdAt}</td>
                <td ><span className="badge badge-pill badge-secondary">{notice.status === 'underReview'
                    ? 'Under Review'
                    : notice.status}</span></td>
                <td>
                    <NavLink to={'noticeofintent/' + notice.id} role="button" className="btn btn-lg btn-primary "><IntlMessages id="view" /></NavLink>
                </td>
            </tr>
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
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h3 style={{ fontWeight: "bold" }} className="card-title mb-0"><IntlMessages id="intent" /></h3>
                                    <button style={{ fontSize: "15px" }} type="button" onClick={handleShow}
                                        className="btn btn-primary btn-lg"><IntlMessages id="add" />
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {loaded ? noticeOfIntent.length > 0 ? <table className="table table-striped">
                                            <thead className="">
                                                <tr>
                                                    <th>#</th>
                                                    <th><IntlMessages id="bus_name" /></th>
                                                    <th><IntlMessages id="date_time" /></th>
                                                    <th><IntlMessages id="status" /></th>
                                                    <th><IntlMessages id="action" /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {table}
                                            </tbody>
                                        </table> : <h4 className="text-center"><IntlMessages id="no_notice" /></h4> : <div className="text-center"><Spinner /></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleShow}
                animation={false}
                size={'lg'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><IntlMessages id="add_details" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </Aux>
    )
}

export default EmployeeNoticeOfIntents;
