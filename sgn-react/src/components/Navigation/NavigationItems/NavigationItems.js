import React, { useState } from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import { Button, Form, Modal } from "react-bootstrap";
import { IconButton, Drawer, AppBar, Toolbar, Tooltip }from '@material-ui/core';
import { useAuth } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../UI/ProgressBar/ProgressBar";
import LanguageProvider from '../LanguageProvider';
import IntlMessages from '../../../Util/IntlMessages';
import "./NavigationItems.css";
import {NavLink} from "react-router-dom";
//gROpNls
const NavigationItems = (props) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loaded, setLoaded] = useState(true);
    const { login, logout } = useAuth();
    const loggedIn = localStorage.getItem('loggedIn')
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

    const handleShow = () => setShow(!show);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        setLoaded(false)
        login(data, errorNotify, setEmail, setPassword, setLoaded)
        setShow(false)

        // axios.post('/login', data)
        //     .then((res) => {
        //         console.log(res.data.token)
        //         setIsAuth(true)
        //         localStorage.setItem('user', res.data.token);
        //         if (res.data.token) {
        //             window.location.href = '/admin'
        //         }
        //     })
        //     .catch((err) => {
        //         window.location.reload()
        //         alert(err)
        //     })
    }
    const emailChangeHandler = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value.toLowerCase())
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    const form = (
        <Form className="my-5" onSubmit={onSubmitHandler}>
            <Form.Group >
                <Form.Label><IntlMessages id="main_email" /></Form.Label>
                <Form.Control style={{fontSize: "15px"}} type="email" className="form-control" required placeholder="Enter Email/Username" onChange={(e) => emailChangeHandler(e)} value={email} />
            </Form.Group>
            <Form.Group>
                <Form.Label><IntlMessages id="main_password" /></Form.Label>
                <Form.Control style={{fontSize: "15px"}} type="password" className="form-control" required placeholder="Enter Password" onChange={(e) => passwordChangeHandler(e)} value={password} />
            </Form.Group>
            <Button style={{fontSize: "15px"}} type={'submit'} href="" variant={'primary'} size={'lg'}><IntlMessages id="main_login" /></Button>
            <NavLink
                style={{
                    cursor: 'pointer',
                    'text-decoration': 'none',
                    textAlign: "center"
                }}
                to={'/admin/forgot-password'}>
                <p className={'text-muted'}>
                    Forgot Password?
                </p>
            </NavLink>
        </Form>
    )
    return (
        <>
            <ul className={'nav navbar-nav align-items-center ml-auto'}>
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
                <NavigationItem className={'main-nav'} link={'/'} exact><IntlMessages id="home_nav" /></NavigationItem>
                <NavigationItem className={'main-nav'} link={'/about'} ><IntlMessages id="home_about" /></NavigationItem>
                <NavigationItem className={'main-nav'} link={'/career'} ><IntlMessages id="home_career" /></NavigationItem>
                <NavigationItem className={'main-nav'} link={'/contact'}><IntlMessages id="home_contact" /></NavigationItem>
                {(loggedIn === 'true') ? <NavigationItem link={'/applicationStatus'}><IntlMessages id="home_application" /></NavigationItem> : ''}
                {(loggedIn !== 'true') ? loaded ? <button onClick={handleShow} className={'btn btn-lg btn-warning'} ><IntlMessages id="sign_in" /></button> : <Spinner /> : <button onClick={() => logout(setEmail, setPassword)} className={'btn btn-lg btn-warning'} ><IntlMessages id="sign_out" /></button>}

            </ul>

            <ul className="lang-prov list-inline mb-0">
                <LanguageProvider />
                <li className="list-inline-item">
                    <IconButton aria-label="settings" >
                        <i className="zmdi zmdi-power" />
                    </IconButton>
                </li>
            </ul>

            <Modal
                show={show}
                onHide={handleShow}
                animation={false}
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><IntlMessages style={{fontSize: "15px", fontWeight: "bold"}} id="login_btn" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </>
    );
}



export default NavigationItems;
