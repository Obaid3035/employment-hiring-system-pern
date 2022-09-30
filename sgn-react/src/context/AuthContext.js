import React, {createContext, useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from "axios";

const AuthContext = createContext({})


const AuthProvider = ( props ) => {
    const history = useHistory();
    console.log(history)
    const [loggedIn, setLoggedIn] = useState(false)
    const login = (data, notify, email, password, loader) => {
        console.log('hello')
        axios.post('/login', data)
            .then((res) => {
                console.log('DAMN')
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('loggedIn', 'true')
                localStorage.setItem('role', res.data.role)
                setLoggedIn(true)
                loader(true);
                const status = res.data.status;
                if (status === 'underReview') {
                    history.replace('/applicationStatus')
                } else if (status === 'Active') {
                    history.replace('/employee/profile')
                } else if(status === 'Hired') {
                    history.replace('/candidate/profile')
                } else if (status === 'SubAdmin') {
                    history.replace('/employee');
                }

            })
            .catch((err) => {
                loader(true);
                console.log(err.message)
                if(err && err.response && err.response.status) {
                    notify(err.response.status);
                }
                email('');
                password('')
            })
    }

    const logout = (email, password) => {
        localStorage.clear();
        setLoggedIn(false)
        history.replace('/')
        email('');
        password('')
    }

    const adminLogin = ( data, notify, email, password, loader ) => {
        axios.post('/admin/login', data)
            .then((res) => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('role', 'admin')
                localStorage.setItem('loggedIn', 'true')
                setLoggedIn(true)
                loader(true);
                history.replace('/admin/dashboard')
            })
            .catch((err) => {
                notify(err.response.status);
                loader(true);
                email('');
                password('')
            })
    }

    const semiAdminLogin = ( data, notify, email, password, loader ) => {
        axios.post('/semiAdmin/login', data)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('role', 'semiAdmin')
                localStorage.setItem('loggedIn', 'true')
                setLoggedIn(true)
                loader(true);
                history.replace('/semiAdmin')
            })
            .catch((err) => {
                notify(err.response.status);
                loader(true);
                email('');
                password('')
            })
    }

    const authContextValue = {
        login,
        loggedIn,
        logout,
        adminLogin,
        semiAdminLogin
    };

    return <AuthContext.Provider value={authContextValue} {...props} />
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth}
