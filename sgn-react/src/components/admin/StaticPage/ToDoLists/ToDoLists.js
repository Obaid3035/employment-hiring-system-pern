import React, {useEffect, useState} from "react";
import axios from "axios";
import ToDoList from "./ToDoList/ToDoList";
import NoticeOfIntentModal from "./Modal/Modal";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";
import {Button, Modal} from "react-bootstrap";
import Input from "../../../UI/Input/Input";
import formConfig from "../../../../helpers/formConfig";
import IntlMessages from '../../../../Util/IntlMessages';

const ToDoLists = (props ) => {

    const [loaded, setLoaded] = useState(false)
    const [singleToDo, setSingleToDo] = useState({
        businessName: '',
        potential: '',
        planOnGoing: '',
        businessPhoneNumber: '',
        additionalInformation: '',
        points: ''
    });
    const [Viewshow, setViewShow] = useState(false);

    const [noticeOfIntentForm, setNoticeOfIntentForm] = useState({
        businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
        potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
        planOnGoing: formConfig('dateTime', 'col-md-6', 'text', 'Date'),
        businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
        additionalInformation: formConfig('input', 'col-md-6', 'text', 'Additional Info'),
        points: formConfig('input', 'col-md-6', 'number', 'Points', 0 ),
        users: formConfig('select', 'col-md-12', '', 'Select Employee', '', '', '',
            []),
    })
    const [toDoList, setToDoList] = useState([]);
    const [show, setShow] = useState(false);

    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    useEffect(() => {
        if(role.includes('subAdmin')) {
            axios.get('/successnotice-subadmin', {headers: {"Authorization": `Bearer ${token}`}})
                .then((res) => {
                    console.log('SUCCESS', res.data)
                    setToDoList(res.data.result);
                    setLoaded(true)
                });
        } else {
            axios.get('/admin/successnotice')
                .then((res) => {
                    setToDoList(res.data);
                    setLoaded(true)
                });
        }


    },[loaded])

    const handleShow = (id) => {
        setViewShow(!Viewshow);
        console.log(show)
        if (!Viewshow) {
            axios.get('/admin/noticeofintent/' + id)
                .then((res) => {
                    setSingleToDo(res.data)
                    console.log(singleToDo)
                })
        }
    }

    const toCompleted = (id) => {
        axios.put('/admin/toInProgress/' + id)
            .then((res) => {
                setLoaded(false)
                successNotify('Task Updated SuccessFully')
            })
    }

    const onDeleteHandler = (id) => {
        axios.delete('/admin/noticeofintent/' + id)
            .then((res) => {
                console.log(res)
                successNotify('Task Updated SuccessFully')
                setLoaded(false)
            })
    }

    const successNotify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });


    const table = (
        toDoList && toDoList.map((todo, index) => (
            <ToDoList
                key={index}
                name={todo.User.applicationForm.firstName}
                businessName={todo.businessName}
                status={todo.status}
                id={todo.id}
                handleShow={handleShow}
                toCompletedHandler={toCompleted}
                onDeleteHandler={onDeleteHandler}
            />
        ))
    )

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedNoticeForm = {
            ...noticeOfIntentForm
        }

        const updatedFormElement = {
            ...updatedNoticeForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedNoticeForm[inputIdentifier] = updatedFormElement;
        console.log(updatedNoticeForm)
        setNoticeOfIntentForm(updatedNoticeForm);
    }

    const formElementArray = [];
    for (const key in noticeOfIntentForm ) {
        formElementArray.push({
            id: key,
            config: noticeOfIntentForm[key],
        })
    }


    const toDoHandleShow = () => {

        setShow(!show)
        if(role.includes('subAdmin')) {
            axios.get('/subadmin-users', {headers: {"Authorization": `Bearer ${token}`}})
                .then((res) => {
                    const data = res.data;
                    data.unshift({label: 'Select', value: ''})
                    const updatedState = {
                        ...noticeOfIntentForm
                    }
                    const updatedElement = {
                        ...updatedState['users']
                    }
                    updatedElement.elementConfig.option = res.data;
                    updatedState['users'] = updatedElement
                    setNoticeOfIntentForm(updatedState)
                });
        } else {
            axios.get('/admin/users')
                .then((res) => {
                    const data = res.data;
                    data.unshift({label: 'Select', value: ''})
                    const updatedState = {
                        ...noticeOfIntentForm
                    }
                    const updatedElement = {
                        ...updatedState['users']
                    }
                    updatedElement.elementConfig.option = res.data;
                    updatedState['users'] = updatedElement
                    setNoticeOfIntentForm(updatedState)
                });
        }

    };

    const Notify = () => toast.success('Notice Of Intent Updated Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });



    const datePickerHandler =(date, inputIdentifier)=> {

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

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShow(false)
        const formData = {};
        for(const formElementIdentifier in noticeOfIntentForm) {
            formData[formElementIdentifier] = noticeOfIntentForm[formElementIdentifier].value;
        }

        axios.post('/admin/noticeofintent', formData)
            .then((res) => {
                console.log(res);
                Notify()
                setShow(false)
                setLoaded(false)
                setNoticeOfIntentForm({
                    businessName: formConfig('input', 'col-md-6', 'text', 'Business Name'),
                    potential: formConfig('input', 'col-md-6', 'text', 'Potential'),
                    planOnGoing: formConfig('date', 'col-md-6', 'text', 'Date', Date.now()),
                    businessPhoneNumber: formConfig('input', 'col-md-6', 'text', 'Phone Number'),
                    additionalInformation: formConfig('input', 'col-md-6', 'text', 'Additional Info'),
                    points: formConfig('input', 'col-md-6', 'number', 'Points', 0 ),
                    users: formConfig('select', 'col-md-12', '', 'Select Employee', '', '', '',
                        []),
                })
            })
    }
    const form = (
        <form onSubmit={formSubmitHandler}>
            <div className="form-row">
                {formElementArray.map(( formElement, index ) => (
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

    return (
        <>
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
                                    className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h3 style={{fontWeight: "bold"}} className="card-title mb-0"><IntlMessages id="to_dos" /></h3>
                                    <button style={{fontSize: "15px"}} type="button" onClick={toDoHandleShow}
                                            className="btn btn-primary btn-lg"><IntlMessages id="add_btn" />
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {loaded ? toDoList.length > 0 ? <table className="table">
                                            <thead className="">
                                            <tr>
                                                <th style={{fontWeight: "bold"}}><IntlMessages id="emp_name" /></th>
                                                <th style={{fontWeight: "bold"}}><IntlMessages id="bus_name" /></th>
                                                <th style={{fontWeight: "bold"}}><IntlMessages id="status" /></th>
                                                <th style={{fontWeight: "bold"}}><IntlMessages id="action" /></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {table}
                                            </tbody>
                                        </table> : <h3 className="text-center"><IntlMessages id="no_todo" /></h3>
                                            : <div className="text-center"> <Spinner /></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NoticeOfIntentModal
                show={Viewshow}
                handleShow={handleShow}
                businessName={singleToDo.businessName}
                potential={singleToDo.potential}
                planOnGoing={singleToDo.planOnGoing}
                businessPhoneNumber={singleToDo.businessPhoneNumber}
                additionalInformation={singleToDo.additionalInformation}
                points={singleToDo.points}
            />
            <Modal
                show={show}
                onHide={toDoHandleShow}
                animation={false}
                size={'lg'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><IntlMessages id="add_notice" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ToDoLists;
