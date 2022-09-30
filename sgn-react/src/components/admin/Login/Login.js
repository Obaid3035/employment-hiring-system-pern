import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../Util/IntlMessages';
import {NavLink} from "react-router-dom";


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaded, setLoaded] = useState(true);
    const { adminLogin } = useAuth();


    const data = {
        email,
        password
    }

    const errorNotify = (msg) => toast.error(msg === 401 || msg === 400 ? 'Invalid Email or Password' : '', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });



    const onSubmitHandler = (e) => {
        e.preventDefault();
        setLoaded(false)
        adminLogin(data, errorNotify, setEmail, setPassword, setLoaded);
    }

    const emailChangeHandler = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value.toLowerCase())
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    return (
        <section className="wrapper">
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
            <div className="container h-100 align-items-center">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-md-5">
                        <div className="card text-center">
                            <div className="card-header card-header-primary">
                                <h2 style={{ fontWeight: "bold" }} className="card-title font-weight-bold"><IntlMessages id="login_btn" /></h2>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={onSubmitHandler} className="my-5" >
                                    <Form.Group className="mb-4">
                                        <Form.Label><IntlMessages id="Email" /></Form.Label>
                                        <Form.Control style={{fontSize: "15px"}} type="email" required className="form-control" placeholder="Enter Email/Username" onChange={(e) => emailChangeHandler(e)} value={email} />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label><IntlMessages id="main_password" /></Form.Label>
                                        <Form.Control style={{fontSize: "15px"}} type="password" required className="form-control" placeholder="Enter Password" onChange={(e) => passwordChangeHandler(e)} value={password} />
                                    </Form.Group>
                                    <NavLink
                                        style={{
                                            cursor: 'pointer',
                                            'text-decoration': 'none'
                                        }}
                                        to={'/admin/forgot-password'}>
                                        <p className={'text-muted'}>
                                            Forgot Password?
                                        </p>
                                    </NavLink>
                                    {loaded ? <Button style={{fontSize: "15px"}} type={'submit'} href="" variant={'primary'} size={'lg'}><IntlMessages id="main_login" /></Button> : <Spinner />}
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Login;
