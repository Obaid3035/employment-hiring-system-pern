import React, {useEffect, useState} from 'react';
import axios from "axios";
import Input from "../../../../UI/Input/Input";
import {NavLink} from "react-router-dom";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {Button, Form, Modal} from "react-bootstrap";
import IntlMessages from '../../../../../Util/IntlMessages';
import AsyncSelect from "react-select/async/dist/react-select.esm";

const ApplicationReview = ( props ) => {
    const [show, setShow] = useState(false);

    const [application, setApplication] = useState();
    const [loaded, setLoaded] = useState(false);
    const [referralID, setReferralID] = useState();
    const [formData, setFormData] = useState({
        referralID: '',
        showSubAdmin: false,

    });
    const [isRequire, setIsRequire] = useState('');

    const id = props.match.params.id;
    console.log('IDDD',id)
    useEffect(() => {

        axios.get('/admin/application/' + id)
            .then((res) => {
                setLoaded(true)
                console.log(res.data);
                setApplication(res.data);
            })
    }, [])

    const hiredApplicationHandler = () => {
        axios.get('/get-app/' + id)
            .then((res) => {
                if (res.data.required) {
                    setIsRequire(res.data.required)
                }
            })
        setShow(!show)
    }


    const inputChangeHandler = (e) => {
        setFormData({...formData, referralID: e.target.value})
    }
    const role = localStorage.getItem('role')

    const onSubmitHandler =(e) => {
        e.preventDefault();
        axios.put('/admin/application/hired/' + id, formData)
            .then((res) => {
                console.log(res);
                setShow(false)
                if (role.includes('subAdmin')) {
                    props.history.replace('/employee/application')
                } else {
                    props.history.replace('/admin/application')

                }
                setLoaded(false)
            })
    }

    const declineApplicationHandler = (  ) => {
        axios.put('/admin/application/decline/' + id, {})
            .then((res) => {
                console.log(res);
                setLoaded(false)
                if (role.includes('subAdmin')) {
                    props.history.replace('/employee/application')
                } else {
                    props.history.replace('/admin/application')
                }
            })
    }

    const showSubAdminHandler = (e) => {
        setFormData({...formData, showSubAdmin: e.target.value})

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
                <Form.Control type="number" className="form-control" required placeholder="Enter ID" onChange={(e) => inputChangeHandler(e)}  value={formData.referralID} />
            </Form.Group>
            {isRequire === 'true' ? <div className="form-group row align-items-center">
                <label htmlFor="haveAnyFriendsAtSGN" className="col-sm-8 col-form-label">Assign it to Sub Admin</label>
                <div className="col-sm-4">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" name="showSubAdmin" required type="radio" id="yes"
                               value={true} onChange={showSubAdminHandler} />
                        <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" name="showSubAdmin" required type="radio" id="no"
                               value={false} onChange={showSubAdminHandler} />
                        <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                    </div>
                </div>
            </div> : ''}
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
                    />                </Form.Group> : null }
            <Button type={'submit'} href="" variant={'primary'} size={'lg'}><IntlMessages id="enter" /></Button>
        </Form>
    )

    const handleShow = () => setShow(!show);

    let btn = <NavLink to={'/admin/application'} className="btn btn-warning"><IntlMessages id="back" /></NavLink>
    if(role.includes('subAdmin')) {
        btn =  <NavLink to={'/employee/application'} className="btn btn-warning"><IntlMessages id="back" /></NavLink>
    }


    return (
        loaded ? application ?
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 mb-5">
                            { btn }
                        </div>
                        {application.User.resume ?  <div className="col-md-4 mb-5">
                            <p><IntlMessages id="resume" /></p>
                            <a href={'https://sgn-backend.herokuapp.com/resume/'+application.User.resume.id}>{application.User.resume.name}</a>
                        </div> : ''}
                        <div className="col-md-12 job-list">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title mb-0"><IntlMessages id="review_form" /></h4>
                                </div>
                                <div className="card-body">
                                    <form action="" className="pt-5" id="reviewApplication">
                                        <div className="form-row">

                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="first_name" /></label>
                                                    <input type="text" className="form-control" readOnly name="firstName"
                                                           value={application.firstName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="middle_name" /></label>
                                                    <input type="text" className="form-control" readOnly name="middleName"
                                                           value={application.middleName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="last_name" /></label>
                                                    <input type="text" className="form-control" readOnly name="lastName"
                                                           value={application.lastName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="street_address" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="streetAddress" value={application.streetAddress}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="city_state" /></label>
                                                    <input type="text" className="form-control" readOnly name="zipCode"
                                                           value={application.zipCode} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="phone_no" /></label>
                                                    <input type="tel" className="form-control" name="phoneNumber" readOnly
                                                           value={application.phoneNumber}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="email" /></label>
                                                    <input type="text" className="form-control" name="email" readOnly
                                                           value={application.User.email}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="applied_worked" /></label>
                                                    <input type="text" className="form-control" name="workedForSGN" readOnly
                                                           value={application.workedForSGN ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="explanation" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="workedForSGNExplain" value={application.workedForSGNExplain}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="friends_working" /></label>
                                                    <input type="text" className="form-control" name="haveAnyFriendsAtSGN"
                                                           readOnly value={application.haveAnyFriendsAtSGN ? 'yes': 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="explanation" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="haveAnyFriendAtSGNName" value={application.haveAnyFriendAtSGNName}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="age_18" /></label>
                                                    <input type="text" className="form-control" name="overAge" readOnly
                                                           value={application.overAge ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="identification" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="presentYourIdentificationCard" value={application.presentYourIdentificationCard ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="convicted_pleaded" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="pleadedFelony" value={application.pleadedFelony ? 'yes' : 'no'}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="state_nature" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="pleadedFelonyExplain" value={application.pleadedFelonyExplain} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="speak_foreign" /></label>
                                                    <input type="text" className="form-control" name="isForeignLanguage"
                                                           readOnly value={'yes'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="list_langs" /></label>
                                                    <input type="text" className="form-control" name="foreignLanguage"
                                                           readOnly value={application.foreignLanguage}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="month_sal" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="desiredSalary" value={application.desiredSalary} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="part_time" /></label>
                                                    <input type="text" className="form-control" readOnly name="partTimeWork"
                                                           value={application.partTimeWork ? 'yes' : 'no'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="full_time" /></label>
                                                    <input type="text" className="form-control" readOnly name="fullTimeWork"
                                                           value={application.fullTimeWork ? 'yes' : 'no'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="avail_time" /></label>
                                                    <div className="form-row">
                                                        <div className="col-lg-6">
                                                            <input type="text" className="form-control" readOnly
                                                                   name="timeFrom" value={application.timeRangeAvailableFrom} />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <input type="text" className="form-control" readOnly
                                                                   name="timeTo" value={application.timeRangeAvailableTo} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="date_start" /></label>
                                                    <input type="text" className="form-control" id="start-date"
                                                           name="start-date" readOnly value={application.startWorkingDate} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-4">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="perform_job" /></label>
                                                    <input type="text" className="form-control" readOnly
                                                           name="essentialFunction" value={application.essentialFunction ? 'yes' : 'no'} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label htmlFor=""><IntlMessages id="des_func" /></label>
                                                    <input type="text" className="form-control"
                                                           name="essentialFunctionExplain" readOnly value={application.essentialFunctionExplain} />
                                                </div>
                                            </div>
                                            <h3><IntlMessages id="edu_history" /></h3>
                                            {application.educationHistories.map((school) => (
                                                <><br/>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor=""><IntlMessages id="school_name" /></label>
                                                            <input type="text" className="form-control" name="schoolName" readOnly
                                                                   value={school.schoolName} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor=""><IntlMessages id="school_address" /></label>
                                                            <input type="text" className="form-control" name="schoolAddress"
                                                                   readOnly value={school.schoolAddress} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor=""><IntlMessages id="school_city" /></label>
                                                            <input type="text" className="form-control" name="schoolZipCode"
                                                                   readOnly value={school.schoolZipCode} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor=""><IntlMessages id="years_completed" /></label>
                                                            <input type="number" className="form-control" name="yearsCompleted"
                                                                   readOnly value={school.yearsCompleted} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor=""><IntlMessages id="graduated" /></label>
                                                            <input type="text" className="form-control" name="isGraduate" readOnly
                                                                   value={school.isGraduate ? 'yes' : 'no'} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4">
                                                        <div className="form-group">
                                                            <label htmlFor=""><IntlMessages id="degree_earned" /></label>
                                                            <input type="text" className="form-control" name="degree" readOnly
                                                                   value={school.degree} />
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            <h3><IntlMessages id="emp_history" /></h3>
                                            {application.employmentHistories.map((employee) => (
                                                <>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="are_emp" /></label>
                                                            <input type="text " className="form-control "
                                                                   name="isCurrentlyEmployed " readOnly value={employee.isCurrentlyEmployed ? 'yes' : 'no'}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="may_con" /></label>
                                                            <input type="text " className="form-control " name="contactEmployer"
                                                                   readOnly value="yes "/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="emp_name" /></label>
                                                            <input type="text " className="form-control " name="employerName "
                                                                   readOnly value={employee.employerName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="emp_number" /></label>
                                                            <input type="tel " className="form-control " name="telephoneName "
                                                                   readOnly value={employee.telephoneName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="emp_business" /></label>
                                                            <input type="text " className="form-control " name="businessType"
                                                                   readOnly value={employee.businessType}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="emp_address" /></label>
                                                            <input type="text " className="form-control " name="address" readOnly
                                                                   value={employee.address}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="emp_city" /></label>
                                                            <input type="text " className="form-control " name="zipCode " readOnly
                                                                   value={employee.zipCode}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="length_emp" /></label>
                                                            <input type="text " className="form-control " name="employmentLength" readOnly
                                                                   value={employee.employmentLength}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="sal_hour" /></label>
                                                            <input type="text " className="form-control " name="salary " readOnly
                                                                   value={employee.salary}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="emp_position" /></label>
                                                            <input type="text " className="form-control " name="position " readOnly
                                                                   value={employee.position}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="reason_leave" /></label>
                                                            <input type="text " className="form-control " name="reasonOfLeaving "
                                                                   readOnly value={employee.reasonOfLeaving}/>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}


                                            <h3><IntlMessages id="reference_head" /></h3>
                                            {application.references.map((reference) => (
                                                <>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_firstName" /></label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.firstName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_lastName" /></label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.lastName}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_number" /></label>
                                                            <input type="tel " className="form-control " name=" " readOnly
                                                                   value={reference.phoneNumber}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_email" /></label>
                                                            <input type="text " className="form-control " name=" " readOnly
                                                                   value={reference.email}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_address" /></label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.address}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_city" /></label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.city}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mb-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_occup" /></label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.occupation}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 ">
                                                        <div className="form-group ">
                                                            <label htmlFor=" "><IntlMessages id="person_years" /></label>
                                                            <input type="text " className="form-control " readOnly name=" "
                                                                   value={reference.yearsAcquainted}/>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            <h3><IntlMessages id="certificate" /></h3>
                                            <div className="col-lg-6 mb-4 ">
                                                <div className="form-group ">
                                                    <label htmlFor=" "><IntlMessages id="sign" /></label>
                                                    <input type="text " className="form-control " readOnly name=" "
                                                           value={application.certificate}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 ">
                                                <div className="form-group ">
                                                    <label htmlFor=" "><IntlMessages id="date" /></label>
                                                    <input type="text " className="form-control " readOnly name=" "
                                                           value={application.createdAt}/>
                                                </div>
                                            </div>
                                            {application.applicationStatus !== 'Active' ?
                                                application.applicationStatus !== 'Hired' ?  <div className={'col-lg-12'}>
                                                    <div className={'float-right'}>
                                                        <Button size={'lg'} className={'px-5 mx-4'} onClick={hiredApplicationHandler} variant={'success'}><IntlMessages id="hire" /></Button>
                                                        {application.applicationStatus === 'Hired' || application.applicationStatus === 'underReview' ? <Button size={'lg'} className={'px-5'} onClick={declineApplicationHandler} variant={'danger'}><IntlMessages id="rej" /></Button> : ''}
                                                    </div>
                                                </div> : '' : ''}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </>
            : <h3 className={'text-center'}><IntlMessages id="no_job" /></h3> : <div className={'text-center'}><Spinner /></div>
    );
}

export default ApplicationReview;
