import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../UI/ProgressBar/ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";
import IntlMessages from '../../../../Util/IntlMessages';

const EmployeeProfile = (props) => {

    const [profileData, setProfileData] = useState();
    const [contract, setContract] = useState(null);
    const [contractData, setContractData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [benefits, setBenefits] = useState([])
    const [contractShow, setContractShow] = useState(false);
    const [payment, setPayment] = useState([]);
    const [userId, setUserId] = useState();

    const token = localStorage.getItem('token');


    useEffect(() => {
        axios.get('/role', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data.role)
                setUserId(res.data.id)
                if (res.data.role.includes('candidate')) {
                    Notify('Welcome to SGN! You can now upload a profile picture.' +
                        ' Please make sure your picture is clear and it must be a portrait.' +
                        ' Please do not add any photo filter and make sure to smile as this picture may also be used to make your business card');
                }
            })


    }, [])

    useEffect(() => {
        axios.get('/profile', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setProfileData(res.data);
                setLoaded(true)

            })
        axios.get('/contracts', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setContractData(res.data);
                setLoaded(true)
            })

        axios.get('/employee/benefit', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setBenefits(res.data)
                setLoaded(true)
            })

        axios.get('/payment', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setLoaded(true)
                setPayment(res.data)
            })
    }, [loaded])

    const Notify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    // const signedContract = (id) => {
    //     console.log(loaded)
    //     axios.put('/contract/'+ id, {})
    //         .then((res) => {
    //             setLoaded(false)
    //             Notify('Application Updated Successfully');
    //         })
    // }

    const contractShowHandler = () => {

        setContractShow(!contractShow);
    }

    const notify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    const contractSelectHandler = (e) => {
        let files = e.target.files[0];
        setContract(files);
    }


    const contractUploadHandler = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('contract', contract)
        data.append('status', 'Employee')
        axios.post('/upload/' + userId, data, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then((res) => {
                console.log(res.data)
                notify('Contract Uploaded Successfully');
                setContract(null);
                setLoaded(false);
                setContractShow(false)
            })
    }



    return (
        <>
            <Modal
                show={contractShow}
                onHide={contractShowHandler}
                animation={false}
                size={'md'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><IntlMessages id="add_contract" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={contractUploadHandler} className={'mb-4'}>
                        <Form.File
                            label={'Upload Contract'}
                            onChange={contractSelectHandler}
                            custom
                            style={{ fontSize: "15px" }}
                        />
                        <div className="float-right mt-3">
                            {contract ? <Button type="submit" style={{ fontSize: "15px" }} variant={'outline-warning'}><IntlMessages id="send" /></Button> : <Button type="submit" style={{ fontSize: "15px" }} disabled variant={'outline-warning'}><IntlMessages id="send" /></Button>}
                        </div>
                    </Form>
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
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title"><IntlMessages id="edit_pro" /></h4>
                                </div>
                                {loaded ? profileData ? <div className="card-body">
                                    <form action="" className="pt-5" id="reviewApplication">
                                        <div className="form-row">
                                            <div className="col-lg-4 ">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="first_name" /></label>
                                                    <input style={{ fontSize: "15px" }} type="text" className="form-control" readOnly id=""
                                                        value={profileData.profile.firstName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 ">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="middle_name" /></label>
                                                    <input style={{ fontSize: "15px" }} type="text" className="form-control" readOnly id=""
                                                        value={profileData.profile.middleName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 ">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="last_name" /></label>
                                                    <input style={{ fontSize: "15px" }} type="text" className="form-control" readOnly id=""
                                                        value={profileData.profile.lastName} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 ">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="street_address" /></label>
                                                    <input style={{ fontSize: "15px" }} type="text" className="form-control" readOnly id=""
                                                        value={profileData.profile.streetAddress} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 ">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="city_state" /></label>
                                                    <input style={{ fontSize: "15px" }} type="text" className="form-control" readOnly id=""
                                                        value={profileData.profile.zipCode} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 ">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="phone_no" /></label>
                                                    <input style={{ fontSize: "15px" }} type="tel" className="form-control" id="" name="phoneNumber"
                                                        readOnly value={profileData.profile.phoneNumber} />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 ">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="email" /></label>
                                                    <input style={{ fontSize: "15px" }} type="text" className="form-control" id="" name="email" readOnly
                                                        value={profileData.email} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div> : <h3 className={'text-center'}><IntlMessages id="no_profile" /></h3> : <div className="text-center"><Spinner /></div>}
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="card">
                                <div className="card-header card-header-primary d-flex justify-content-between">
                                    <h4 className="card-title "><IntlMessages id="contract" /></h4>
                                    <button style={{ fontSize: "15px" }} type="button" onClick={contractShowHandler}
                                        className="btn btn-attachment btn-warning mx-4">
                                        <IntlMessages id="add_contract" />
                                    </button>
                                </div>
                                <div className="card-body">
                                    {
                                        loaded ? contractData.length > 0 ? <div className="table-responsive">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <tr>
                                                        <th>
                                                            <IntlMessages id="main_id" />
                                                        </th>
                                                        <th>
                                                            <IntlMessages id="name" />
                                                        </th>
                                                        <th>
                                                            <IntlMessages id="date" />
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {contractData.map((i, index) => (
                                                        <tr key={index}>
                                                            <td>{i.id}</td>
                                                            <td className="text-primary">
                                                                <a href={'https://sgn-backend.herokuapp.com/upload/' + i.id}>{i.name}</a>
                                                            </td>
                                                            <td>{i.createdAt}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                            : <h5 className="text-center"><IntlMessages id="no_contract" /></h5>
                                            : <div className="text-center"><Spinner /></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={'col-lg-6'}>
                            {loaded ? benefits.length > 0
                                ? <table className="table">
                                    <thead className="">
                                        <tr>
                                            <th>#</th>
                                            <th><IntlMessages id="title" /></th>
                                            <th><IntlMessages id="description" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {benefits.map((benefit, index) => (
                                            <tr key={index}>
                                                <td>{benefit.benefit.id}</td>
                                                <td>{benefit.benefit.title}</td>
                                                <td>{benefit.benefit.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> : <h4><IntlMessages id="no_benefit" /> </h4>
                                : <div className="text-center"><Spinner /></div>
                            }
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header card-header-primary d-flex justify-content-between">
                                    <h4 className="card-title "><IntlMessages id="pay_receipt" /></h4>
                                </div>
                                <div className="card-body">
                                    {
                                        loaded ? payment.length > 0 ? <div className="table-responsive">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <tr>
                                                        <th>
                                                            <IntlMessages id="main_id" />
                                                        </th>
                                                        <th>
                                                            <IntlMessages id="name" />
                                                        </th>
                                                        <th>
                                                            <IntlMessages id="date" />
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {payment.map((i, index) => (
                                                        <tr key={index}>
                                                            <td>{i.id}</td>
                                                            <td className="text-primary">
                                                                <a href={'https://sgn-backend.herokuapp.com/payment/' + i.id}>{i.name}</a>
                                                            </td>
                                                            <td>{i.createdAt}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                            : <h5 className="text-center"><IntlMessages id="no_pay" /></h5>
                                            : <div className="text-center"><Spinner /></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeProfile;
