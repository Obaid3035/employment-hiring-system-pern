import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import axios from "axios";
import {Modal} from "react-bootstrap";
import IntlMessages from '../../../../Util/IntlMessages';

const EmployeeChats = ( props) => {
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [wholeChat, setWholeChat] = useState(null);
    const messageChangeHandler = (e) => {
        setMessage(e.target.value);
        console.log(e.target.value)
    }
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    const messageHandleShow = (message, senderId) => {
        setShowMessage(!showMessage);
        setChatMessage(message)
        setWholeChat(senderId)
    }
    useEffect(() => {
        axios.get('/admin/messages', {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setChat(res.data)
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
    const replyHandler = (e) => {
        e.preventDefault();
        const formData = {
            message,
            wholeChat
        }
        console.log('DAMN NIGGA', wholeChat)
        axios.post('/reply', formData ,{headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setLoaded(false)
                setShowMessage(false)
                setMessage('')
                successNotify('Message sent!');

            })

    }

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
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div
                                    className="card-header d-flex justify-content-between align-items-center card-header-primary">
                                    <h4 className="card-title mb-0"><IntlMessages id="inbox" /></h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        {loaded ? chat && chat.length > 0 ?    <table className="table">
                                                <thead className="">
                                                <th>#</th>
                                                <th>
                                                <IntlMessages id="date" />    
                                                </th>
                                                <th>
                                                <IntlMessages id="sender" />    
                                                </th>
                                                <th>
                                                <IntlMessages id="action" />    
                                                </th>
                                                </thead>
                                                <tbody>
                                                {chat.map((chat) => (
                                                    <tr>
                                                        <td>
                                                            {chat.id}
                                                        </td>
                                                        <td>
                                                            {chat.createdAt}
                                                        </td>
                                                        <td>
                                                        <IntlMessages id="admin" />    
                                                        </td>
                                                        <td>
                                                            <button type="button" onClick={() => messageHandleShow(chat.message, chat.senderId)}
                                                                    className="btn btn-sm btn-primary">
                                                                <i className="fas fa-eye mr-2" /><IntlMessages id="view" /> 
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            : <h4 className={'text-center'}><IntlMessages id="no_msg" /></h4> : <div className={'text-center'}><Spinner /></div> }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showMessage}
                onHide={messageHandleShow}
                animation={false}
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><IntlMessages id="msg" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="view-message">
                        <div className="form-group">
                            <label htmlFor="team"
                                   className="col-form-label"><IntlMessages id="recipt" /></label>
                            <input type="text" className="form-control" readOnly
                                   id="team" name="team" value="Admin" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message"
                                   className="col-form-label"><IntlMessages id="msg" /></label>
                            <textarea className="form-control" rows="6" readOnly
                                      id="message" name="message">{chatMessage}</textarea>
                        </div>
                    </form>
                    <form onSubmit={replyHandler} className="reply-form" id="reply-form">
                        <div className="col-lg-12 mb-4">
                            <label htmlFor=""><IntlMessages id="reply" /></label>
                            <textarea onChange={messageChangeHandler} value={message} required
                                      className="form-control" />
                        </div>
                        <div className="pull-right">
                            <button type="submit"
                                    className="btn btn-primary btn-save"><IntlMessages id="replyy" />
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EmployeeChats;
