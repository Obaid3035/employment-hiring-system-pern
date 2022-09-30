import React, {useState} from "react";
import {ProgressBar, Form, Button} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import Spinner from "../../UI/ProgressBar/ProgressBar";
import TimePicker from 'react-time-picker';
import IntlMessages from '../../../Util/IntlMessages';
import AsyncSelect from "react-select/async/dist/react-select.esm";


const ApplicationForm = ( props ) => {
    const id = props.match.params.id;
    const [subAdmins, setSubAdmins] = useState(true);
    const handleInputChange = (newValue) => {
        setSubAdmins(newValue)
    };
    const [loaded, setLoaded] = useState(true);
    const [progress, setProgress] = useState(10)
    const [timeRangeAvailableFrom, setTimeRangeAvailableFrom] = useState(null);
    const [timeRangeAvailableTo, setTimeRangeAvailableTo] = useState(null);
    const [resume, setResume] = useState(null);
    const [ formFields, setFormFields ] = useState({
        currentStep: 1,
        email: '',
        applicationForm: {
            jobListingId: id,
            firstName: '',
            middleName: '',
            lastName: '',
            streetAddress: '',
            zipCode: '',
            phoneNumber: '',
            workedForSGN: false,
            workedForSGNExplain: '',
            haveAnyFriendsAtSGN: false,
            haveAnyFriendAtSGNName: '',
            overAge: false,
            presentYourIdentificationCard: false,
            pleadedFelony: false,
            pleadedFelonyExplain: '',
            desiredSalary: '',
            partTimeWork: false,
            fullTimeWork: false,
            daysAvailable: [],
            startWorkingDate: '',
            essentialFunction: false,
            essentialFunctionExplain: '',
            certificate: '',
            isForeignLanguage: false,
            foreignLanguage: '',
        },
        educationHistory: [],
        referenceHistory: [],
        employmentHistory: []
    })

    const [school, setSchool] = useState({
        schoolName: '',
        schoolAddress: '',
        schoolZipCode: '',
        yearsCompleted: '',
        isGraduate: false,
        schoolDegree: '',
    });

    const [college, setCollege] = useState({
        schoolName: '',
        schoolAddress: '',
        schoolZipCode: '',
        yearsCompleted: '',
        isGraduate: false,
        schoolDegree: '',
        isForeignLanguage: false,
        foreignLanguage: '',
    })

    const [vocational, setVocational] = useState({
        schoolName: '',
        schoolAddress: '',
        schoolZipCode: '',
        yearsCompleted: '',
        isGraduate: false,
        schoolDegree: '',
    })

    const [employee, setEmployee] = useState({
        employerName: '',
        telephoneName: '',
        businessType: '',
        address: '',
        zipCode: '',
        employmentLength: '',
        currentlyEmployed: false,
        salary: '',
        position: '',
        reasonOfLeaving: '',
        contactEmployer: false,
    })

    const [employee2, setEmployee2] = useState({
        employerName: '',
        telephoneName: '',
        businessType: '',
        address: '',
        zipCode: '',
        currentlyEmployed: false,
        employmentLength: '',
        salary: '',
        position: '',
        reasonOfLeaving: '',
        contactEmployer: false,
    })

    const [employee3, setEmployee3] = useState({
        employerName: '',
        telephoneName: '',
        businessType: '',
        address: '',
        zipCode: '',
        currentlyEmployed: false,
        employmentLength: '',
        salary: '',
        position: '',
        reasonOfLeaving: '',
        contactEmployer: false,
    })

    const [reference, setReference] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        yearsAcquainted: '',
        occupation: ''
    })

    const [reference2, setReference2] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        yearsAcquainted: '',
        occupation: ''
    })

    const [reference3, setReference3] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        yearsAcquainted: '',
        occupation: ''
    })

    let progressBar = 0;

    const handleSubmit = e => {
        e.preventDefault()
        const formData = {
            ...formFields
        };
        setLoaded(false)


        formData.referenceHistory.push(reference);
        formData.referenceHistory.push(reference2);
        formData.referenceHistory.push(reference3);
        formData.educationHistory.push(school);
        formData.educationHistory.push(vocational);
        formData.educationHistory.push(college);
        formData.employmentHistory.push(employee)
        formData.employmentHistory.push(employee2)
        formData.employmentHistory.push(employee3)
        formData.timeRangeAvailableTo = timeRangeAvailableTo;
        formData.timeRangeAvailableFrom = timeRangeAvailableFrom
        formData.subAdmins = subAdmins;

        axios.post('/register', formData)
            .then((res) => {
                console.log(res.data)
                fileUploadHandler(res.data.id)
            }).catch((res) => {
                setLoaded(true)
                alert('Something went wrong')
        })
    }


    const fileUploadHandler = ( id ) => {
        const data = new FormData()
        data.append('resume', resume)
        axios.post('/resume/'+id, data, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then((res) => {
                console.log(res.data)
                setLoaded(false);
                props.history.replace('/welcome')
            })
    }

    const _next = (e) => {
        e.preventDefault();
        let currentStep = formFields.currentStep
        currentStep = currentStep >= 10 ? 10 : currentStep + 1
        setFormFields({
           ...formFields, currentStep: currentStep
        })
        progressBar = progress + 10
        setProgress(progressBar)
        window.scrollTo(0, 0)
    }

    const _prev = () => {
        let currentStep = formFields.currentStep
        currentStep = currentStep <= 1 ? 1: currentStep - 1
        setFormFields({
           ...formFields,  currentStep: currentStep
        })
        progressBar = progress - 10
        setProgress(progressBar)
        window.scrollTo(0, 0)
    }

    const inputChangeHandler = (e) => {
        const {name, value} = e.target
        const updated = {...formFields}
        updated.applicationForm[name] = value
        setFormFields(updated)
        console.log(formFields)
    }

    const schoolChangeHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        const updated = {...school};
         updated[name] = value;
         setSchool(updated)
        console.log(school)
    }

    const collegeChangeHandler = ( e) => {
        const { name, value } = e.target;
        const updated = {...college};
        updated[name] = value;
        setCollege(updated)
        console.log(college)

    }

    const vocationalChangeHandler = ( e) => {
        const { name, value } = e.target;
        const updated = {...vocational};
        updated[name] = value;
        setVocational(updated)
        console.log(vocational)
    }

    const employeeChangeHandler = (e) => {
        const { name, value } = e.target;
        const updated = {...employee};
        updated[name] = value;
        setEmployee(updated)
        console.log(employee)
    }

    const employeeChangeHandler2 = (e) => {
        const { name, value } = e.target;
        const updated = {...employee2};
        updated[name] = value;
        setEmployee2(updated)
        console.log(employee2)
    }

    const employeeChangeHandler3 = (e) => {
        const { name, value } = e.target;
        const updated = {...employee3};
        updated[name] = value;
        setEmployee3(updated)
        console.log(employee3)
    }

    const referenceHandleChange = (e) => {
        const { name, value } = e.target;
        const updated = {...reference};
        updated[name] = value;
        setReference(updated)
        console.log(reference)
    }
    const referenceHandleChange2 = (e) => {
        const { name, value } = e.target;
        const updated = {...reference2};
        updated[name] = value;
        setReference2(updated)
        console.log(reference2)

    }

    const referenceHandleChange3 = (e) => {
        const { name, value } = e.target;
        const updated = {...reference3};
        updated[name] = value;
        setReference3(updated)
        console.log(reference3)
    }

    const datePickerHandler = (date, name) => {
        const updated = {...formFields}
        updated.applicationForm[name] = date
        setFormFields(updated)
    }

    const emailChangeHandler = (e) => {
        let { name, value } = e.target;

        if (name === 'email') {
            value = value.toLowerCase();
        }
        console.log(name, value)
        const updated = {...formFields}
        updated[name] = value;
        setFormFields(updated)
    }

    const fromTime = (time) => {
        setTimeRangeAvailableFrom(time)
    }

    const toTime = (time) => {
        setTimeRangeAvailableTo(time)
    }

    const fileSelectHandler = (e) => {
        let files = e.target.files[0];
        setResume(files);
    }

    return (
        <section className="application-form py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2><IntlMessages id="form" /></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card bg-white survey-card border-0">

                            <ProgressBar animated now={progress} />

                            {formFields.currentStep === 1 &&  <Step1
                                currentStep={formFields.currentStep}
                                handleChange={inputChangeHandler}
                                email={formFields.email}
                                emailChangeHandler={emailChangeHandler}
                                firstName={formFields.applicationForm.firstName}
                                lastName={formFields.applicationForm.lastName}
                                middleName={formFields.applicationForm.middleName}
                                streetAddress={formFields.applicationForm.streetAddress}
                                phoneNumber={formFields.applicationForm.phoneNumber}
                                zipCode={formFields.applicationForm.zipCode}
                                onSubmit={_next}
                            />}

                            {formFields.currentStep === 2 && <Step2
                                currentStep={formFields.currentStep}
                                handleChange={inputChangeHandler}
                                fileSelectHandler={fileSelectHandler}
                                onSubmit={_next}
                                previousPage={_prev}
                            />}
                            {formFields.currentStep === 3 && <Step3
                                currentStep={formFields.currentStep}
                                handleChange={inputChangeHandler}
                                workedForSGN={setFormFields}
                                workedSgn={formFields.applicationForm.workedForSGN}
                                anyfriends={formFields.applicationForm.haveAnyFriendsAtSGN}
                                workedForSGNExplain={formFields.applicationForm.workedForSGNExplain}
                                haveAnyFriendsAtSGN={formFields.applicationForm.haveAnyFriendsAtSGN}
                                haveAnyFriendAtSGNName={formFields.applicationForm.haveAnyFriendAtSGNName}
                                onSubmit={_next}
                                previousPage={_prev}
                            />}

                            {formFields.currentStep === 4 && <Step4
                                currentStep={formFields.currentStep}
                                handleChange={inputChangeHandler}
                                felony={formFields.applicationForm.pleadedFelony}
                                overAge={formFields.applicationForm.overAge}
                                presentYourIdentificationCard={formFields.applicationForm.presentYourIdentificationCard}
                                pleadedFelony={formFields.applicationForm.pleadedFelony}
                                pleadedFelonyExplain={formFields.applicationForm.pleadedFelonyExplain}
                                onSubmit={_next}
                                previousPage={_prev}
                            />}

                            {formFields.currentStep === 5 && <Step5
                                currentStep={formFields.currentStep}
                                handleChange={inputChangeHandler}
                                daysavailable={formFields.applicationForm.daysAvailable}
                                desiredSalary={formFields.applicationForm.desiredSalary}
                                partTimeWork={formFields.applicationForm.partTimeWork}
                                fullTimeWork={formFields.applicationForm.fullTimeWork}
                                timeRangeAvailableFrom={timeRangeAvailableFrom}
                                timeRangeAvailableTo={timeRangeAvailableTo}
                                isForeignLanguage={formFields.applicationForm.isForeignLanguage}
                                vocationalIsForeignLanguage={formFields.applicationForm.isForeignLanguage}
                                vocationalForeignLanguage={formFields.applicationForm.foreignLanguage}
                                onChangeFrom={fromTime}
                                onChangeTo={toTime}
                                onSubmit={_next}
                                previousPage={_prev}
                            />}

                            {formFields.currentStep === 6 && <Step6
                                currentStep={formFields.currentStep}
                                handleChange={inputChangeHandler}
                                datePickerHandler={datePickerHandler}
                                startWorkingDate={formFields.applicationForm.startWorkingDate}
                                essentialFunction={formFields.applicationForm.essentialFunction}
                                essentialFunctionExplain={formFields.applicationForm.essentialFunctionExplain}
                                onSubmit={_next}
                                previousPage={_prev}
                            />}

                            {formFields.currentStep === 7 && <Step7
                                currentStep={formFields.currentStep}
                                handleChange={schoolChangeHandler}
                                schoolName={school.schoolName}
                                schoolAddress={school.schoolAddress}
                                schoolZipCode={school.schoolZipCode}
                                yearsCompleted={school.yearsCompleted}
                                isGraduate={school.isGraduate}
                                schoolDegree={school.schoolDegree}
                                onSubmit={_next}
                                previousPage={_prev}
                            />}

                            {formFields.currentStep === 8 && <Step8
                                currentStep={formFields.currentStep}
                                handleChange={collegeChangeHandler}
                                collegeName={college.schoolName}
                                collegeAddress={college.schoolAddress}
                                collegeZipCode={college.schoolZipCode}
                                collegeYearsCompleted={college.yearsCompleted}
                                collegeIsGraduate={college.isGraduate}
                                collegeDegree={college.schoolDegree}
                                onSubmit={_next}
                                previousPage={_prev}
                                vocationalHandleChange={vocationalChangeHandler}
                                vocationalName={vocational.schoolName}
                                vocationalAddress={vocational.schoolAddress}
                                vocationalZipCode={vocational.schoolZipCode}
                                vocationalYearsCompleted={vocational.yearsCompleted}
                                vocationalIsGraduate={vocational.isGraduate}
                                vocationalDegree={vocational.schoolDegree}

                            />}

                            {formFields.currentStep===9 &&  <Step9
                                currentStep={formFields.currentStep}
                                handleChange={employeeChangeHandler}
                                employerName={employee.employerName}
                                telephoneName={employee.telephoneName}
                                businessType={employee.businessType}
                                address={employee.address}
                                zipCode={employee.zipCode}
                                employmentLength={employee.employmentLength}
                                salary={employee.salary}
                                position={employee.position}
                                reasonOfLeaving={employee.reasonOfLeaving}
                                contactEmployer={employee.contactEmployer}
                                onSubmit={_next}
                                previousPage={_prev}
                                employeeHandleChange={employeeChangeHandler2}
                                employerName1={employee2.employerName}
                                telephoneName1={employee2.telephoneName}
                                businessType1={employee2.businessType}
                                address1={employee2.address}
                                zipCode1={employee2.zipCode}
                                employmentLength1={employee2.employmentLength}
                                salary1={employee2.salary}
                                position1={employee2.position}
                                reasonOfLeaving1={employee2.reasonOfLeaving}
                                contactEmployer1={employee2.contactEmployer}

                                employeeHandleChange2={employeeChangeHandler3}
                                employerName2={employee3.employerName}
                                telephoneName2={employee3.telephoneName}
                                businessType2={employee3.businessType}
                                address2={employee3.address}
                                zipCode2={employee3.zipCode}
                                employmentLength2={employee3.employmentLength}
                                salary2={employee3.salary}
                                position2={employee3.position}
                                reasonOfLeaving2={employee3.reasonOfLeaving}
                                contactEmployer2={employee3.contactEmployer}
                            />}

                            {formFields.currentStep === 10 && <Step10
                                handleInputChange={handleInputChange}
                                subAdmins={subAdmins}
                                referenceHandleChange={referenceHandleChange}
                                firstName={reference.firstName}
                                lastName={reference.lastName}
                                phoneNumber={reference.phoneNumber}
                                email={reference.email}
                                address={reference.address}
                                city={reference.city}
                                occupation={reference.occupation}
                                yearsAcquainted={reference.yearsAcquainted}

                                referenceHandleChange2={referenceHandleChange2}
                                firstName2={reference2.firstName}
                                lastName2={reference2.lastName}
                                phoneNumber2={reference2.phoneNumber}
                                email2={reference2.email}
                                address2={reference2.address}
                                city2={reference2.city}
                                occupation2={reference2.occupation}
                                yearsAcquainted2={reference2.yearsAcquainted}

                                onSubmit={handleSubmit}
                                previousPage={_prev}
                                referenceHandleChange3={referenceHandleChange3}
                                firstName3={reference3.firstName}
                                lastName3={reference3.lastName}
                                phoneNumber3={reference3.phoneNumber}
                                email3={reference3.email}
                                address3={reference3.address}
                                city3={reference3.city}
                                occupation3={reference3.occupation}
                                yearsAcquainted3={reference3.yearsAcquainted}

                                handleChange={inputChangeHandler}
                                certificate={formFields.certificate}

                                loaded={loaded}
                            />}

                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}

const Step1 = ( props ) => {
    if (props.currentStep !== 1) {
        return null
    }
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="first_name" /></label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="firstName" required value={props.firstName} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="middle_name" /></label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="" name="middleName" value={props.middleName} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="last_name" /></label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" required id="" name="lastName" value={props.lastName} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="street_address" /></label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="" name="streetAddress" value={props.streetAddress} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="city_state" /></label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="" name="zipCode" value={props.zipCode} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="phone_no" /></label>
                        <div className="col-sm-8">
                            <input type="tel" className="form-control" required id="" name="phoneNumber" value={props.phoneNumber} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="email_address" /></label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" required id="" name="email" value={props.email} onChange={props.emailChangeHandler} />
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className={'text-center'}><button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button></div>
        </form>
    )
}

const Step2 = ( props ) => {
    if (props.currentStep !== 2) {
        return null
    }
    return (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <div className="form-group row align-items-center">
                        <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="upload_resume" /></label>
                        <div className="col-sm-8">
                            <input type="file" onChange={props.fileSelectHandler} accept={'.pdf,.jpg,.png'}  name={'resume'} required id="resume"
                                   className="form-control form-control-file" />
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>

        </form>
    )
}

const Step3 = ( props ) => {
    if (props.currentStep !== 3) {
        return null
    }
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <div className="form-group row align-items-center">
                        <label htmlFor="workedForSGN" className="col-sm-8 col-form-label"><IntlMessages id="applied_worked" /></label>
                        <div className="col-sm-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="workedForSGN" required type="radio" id="yes" value={true}  onChange={props.handleChange}/>
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="workedForSGN" required type="radio" id="no" value={false} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    {props.workedSgn === 'true' ?
                        <div className="form-group row align-items-center">
                            <label htmlFor="workedForSGNExplain" className="col-sm-4 col-form-label">If yes, please explain
                                (include date):</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" required name="workedForSGNExplain" value={props.workedForSGNExplain} onChange={props.handleChange} />
                            </div>
                        </div> : null
                    }

                    <div className="form-group row align-items-center">
                        <label htmlFor="haveAnyFriendsAtSGN" className="col-sm-8 col-form-label"><IntlMessages id="friends_working" /></label>
                        <div className="col-sm-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="haveAnyFriendsAtSGN" required type="radio" id="yes"
                                       value={true} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="haveAnyFriendsAtSGN" required type="radio" id="no"
                                       value={false} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    {props.anyfriends === 'true' ?
                        <div className="form-group row align-items-center">
                            <label htmlFor="haveAnyFriendAtSGNName" className="col-sm-4 col-form-label"><IntlMessages id="friends_state" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required id="" name="haveAnyFriendAtSGNName"  value={props.haveAnyFriendAtSGNName} onChange={props.handleChange} />
                            </div>
                        </div> : null }
                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>
        </form>
    )
}

const Step4 = ( props ) => {
    if (props.currentStep !== 4) {
        return null
    }
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <div className="form-group row align-items-center">
                        <label htmlFor="age" className="col-lg-8 col-sm-12 col-form-label"><IntlMessages id="over_age" /></label>
                        <div className="col-lg-4 col-sm-12">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="overAge" required type="radio" id="yes" value={true} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="overAge" type="radio" required id="no" value={false} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="presentYourIdentificationCard" className="col-lg-8 col-sm-12 col-form-label"><IntlMessages id="if_hired" /></label>
                        <div className="col-lg-4 col-sm-12">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="presentYourIdentificationCard" required type="radio"
                                       id="yes" value={true} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="presentYourIdentificationCard" required type="radio"
                                       id="no" value={false} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="pleadedFelony" className="col-lg-8 col-sm-12 col-form-label"><IntlMessages id="convicted" /> </label>
                        <div className="col-lg-4 col-sm-12">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="pleadedFelony" type="radio" required id="yes" value={true} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="pleadedFelony" type="radio" required id="no" value={false} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    {props.felony === 'true' ?  <div className="form-group row">

                        <div className="form-group">
                            <label htmlFor="pleadedFelonyExplain"><IntlMessages id="describe_crime" /> </label>
                            <input type="text" className="form-control" id="" name="pleadedFelonyExplain" required value={props.pleadedFelonyExplain} onChange={props.handleChange} />
                        </div>
                    </div> : null}
                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>
        </form>
    )
}

const Step5 = ( props ) => {

    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);


    const onChange = (e) => {
        if (e.target.name === 'monday') {
            setMonday(!monday)
        }
        if (e.target.name === 'tuesday') {
            setTuesday(!tuesday)
        }
        if (e.target.name === 'wednesday') {
            setWednesday(!wednesday)
        }
        if (e.target.name === 'thursday') {
            setThursday(!thursday)
        }
        if (e.target.name === 'friday') {
            setFriday(!friday)
        }
        if (e.target.name === 'saturday') {
            setSaturday(!saturday)
        }
        if (e.target.name === 'sunday') {
            setSunday(!sunday)
        }
    }

    const loopThrough = (arr, day) => {
        for( let i = 0; i < arr.length; i++){

            if ( arr[i] === day) {

                arr.splice(i, 1);
            }

        }
    }

    const onNext = (event) => {
        const arr = [];
        if (monday === true) {
            arr.push('monday')
        } else if (monday === false) {
            loopThrough(arr, 'monday')
        }

        if (tuesday === true) {
            arr.push('tuesday')
        } else  {
            loopThrough(arr, 'tuesday')
        }


        if (wednesday === true) {
            arr.push('wednesday')
        } else  {
            loopThrough(arr, 'wednesday')
        }

        if (thursday === true) {
            arr.push('thursday')
        } else  {
            loopThrough(arr, 'thursday')
        }

        if (friday === true) {
            arr.push('friday')
        } else  {
            loopThrough(arr, 'friday')
        }

        if (saturday === true) {
            arr.push('saturday')
        } else  {
            loopThrough(arr, 'saturday')
        }

        if (sunday === true) {
            arr.push('sunday')
        } else  {
            loopThrough(arr, 'sunday')
        }

        const e = {
            target: {
                name: 'daysAvailable',
                value: arr
            }
        }
        console.log(arr);
        props.handleChange(e)
        props.onSubmit(event)
    }
    if (props.currentStep !== 5) {
        return null
    }
    return  (
        <form onSubmit={onNext}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <div className="form-group row align-items-center">
                        <label htmlFor="isForeignLanguage" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="do_speak" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="isForeignLanguage" required
                                       id="yes" value={true} onChange={props.handleChange}  />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="isForeignLanguage" id="no" required
                                       value={false} onChange={props.handleChange}  />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                        {
                            props.isForeignLanguage === "true" ?
                                <div className="form-group row align-items-center">
                                    <label htmlFor="foreignLanguage" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="list_language" /></label>
                                    <div className="col-lg-7 col-sm-6">
                                        <input type="text" className="form-control" required id="" name="foreignLanguage" value={props.vocationalForeignLanguage} onChange={props.handleChange}  />
                                    </div>
                                </div>
                                : ''
                        }

                    </div>
                    <h4><IntlMessages id="salary_avail" /></h4>
                    <div className="form-group row align-items-center">
                        <label htmlFor="desiredSalary" className="col-sm-4 col-form-label"><IntlMessages id="desired_salary" /></label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="" required name="desiredSalary" value={props.desiredSalary} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="partTimeWork" className="col-sm-8 col-form-label"><IntlMessages id="apply_partTime" /></label>
                        <div className="col-sm-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" required name="partTimeWork" required type="radio" id="yes" value={true} onChange={props.handleChange} />
                                <label className="form-check-label"  htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" required name="partTimeWork" type="radio" id="no" value={false} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="fullTimeWork" className="col-sm-8 col-form-label"><IntlMessages id="apply_fullTime" /></label>
                        <div className="col-sm-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" required name="fullTimeWork" type="radio" id="yes" value={true} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" required name="fullTimeWork" type="radio" id="no" value={false} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="daysAvailable" className="col-lg-5 col-sm-12 col-form-label"><IntlMessages id="avail_days" /></label>
                        <div className="col-lg-7 col-sm-12">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="monday" value={monday} onChange={onChange}  />
                                    <label className="form-check-label" htmlFor="monday"><IntlMessages id="mon" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="tuesday" value={tuesday} onChange={onChange}    />
                                    <label className="form-check-label" htmlFor="tuesday"><IntlMessages id="tues" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="wednesday" value={wednesday} onChange={onChange}   />
                                    <label className="form-check-label" htmlFor="wednesday"><IntlMessages id="wed" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="thursday" value={thursday} onChange={onChange}   />
                                    <label className="form-check-label" htmlFor="thursday"><IntlMessages id="thurs" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="friday" value={friday} onChange={onChange}    />
                                    <label className="form-check-label" htmlFor="friday"><IntlMessages id="fri" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="saturday" value={saturday} onChange={onChange}   />
                                    <label className="form-check-label" htmlFor="saturday"><IntlMessages id="sat" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="sunday" value={sunday} onChange={onChange}  />
                                    <label className="form-check-label" htmlFor="sunday"><IntlMessages id="sun" /></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="time-range" className=" col-lg-6 col-sm-12 col-form-label"><IntlMessages id="avail_time" /></label>
                        <div className="col-lg-3 col-sm-6">
                            <TimePicker value={props.timeRangeAvailableFrom} onChange={props.onChangeFrom} />;
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <TimePicker value={props.timeRangeAvailableTo} onChange={props.onChangeTo} />;
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>
        </form>
    )
}

const Step6 = ( props ) => {
    if (props.currentStep !== 6) {
        return null
    }
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <div className="form-group row align-items-center">
                        <label htmlFor="start-date" className="col-lg-6 col-sm-12 col-form-label"><IntlMessages id="work_start" /></label>
                        <div className="col-lg-6 col-sm-12">
                            <DatePicker selected={props.startWorkingDate} onChange={(e) => props.datePickerHandler(e, 'startWorkingDate') } />
                        </div>
                    </div>
                    <div className="form-group row align-items-center">
                        <label htmlFor="essentialFunction" className="col-lg-8 col-sm-12 col-form-label"><IntlMessages id="perform_essential" /></label>
                        <div className="col-lg-4 col-sm-12">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" required name="essentialFunction" type="radio" id="yes"
                                       value={true} onChange={props.handleChange}  />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" required name="essentialFunction" type="radio" id="no"
                                       value={false} onChange={props.handleChange}  />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    {props.essentialFunction === 'false' ?
                        <div className="form-group row row align-items-center">
                            <label htmlFor="essentialFunctionExplain" className="col-lg-6 col-sm-12 col-form-label"><IntlMessages id="perform_function" /></label>
                            <div className="col-lg-6 col-sm-12">
                                <input type="text" className="form-control" required id="" name="essentialFunctionExplain" value={props.essentialFunctionExplain} onChange={props.handleChange} />
                            </div>
                        </div>
                        : null
                    }

                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>
        </form>
    )
}

const Step7 = ( props ) => {
    if (props.currentStep !== 7) {
        return null
    }
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <h4><IntlMessages id="education_training" /></h4>
                    <h5><IntlMessages id="high_school" /></h5>
                    <div id="detailhighSchool">
                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_name" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" required className="form-control" id="" name="schoolName" placeholder="" value={props.schoolName} onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolAddress" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_address" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="schoolAddress" value={props.schoolAddress} onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolZipCode" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_city" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="schoolZipCode" value={props.schoolZipCode} onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="yearsCompleted" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="years_completed" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="number" className="form-control" required id="" name="yearsCompleted" value={props.yearsCompleted} onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="isGraduate" className="col-lg-5 col-sm-6 col-form-label"> <IntlMessages id="graduated" /></label>
                            <div className="col-lg-7 col-sm-7">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" name="isGraduate" type="radio"
                                           value={true} onChange={props.handleChange}  />
                                    <label className="form-check-label"><IntlMessages id="yes" /></label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" name="isGraduate" type="radio"
                                           value={false} onChange={props.handleChange}  />
                                    <label className="form-check-label"><IntlMessages id="no" /></label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="degree" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="degree_earned" /> </label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="schoolDegree" value={props.schoolDegree} onChange={props.handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>
        </form>
    )
}

const Step8 = ( props ) => {
    const [show, setShow] = useState(true);
    const [showVocational, setShowVocational] = useState(true);


    if (props.currentStep !== 8) {
        return null
    }
    const hideContentHandler = (e) => {
        setShow(!show)
    }

    const hideVocationalHandler = () => {
        setShowVocational(!showVocational);
    }

    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <h4><IntlMessages id="collage_uni" /></h4>
                    <div className="form-group row align-items-center">
                        <label htmlFor="" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="col_uni" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onClick={hideContentHandler} inline label=<IntlMessages id="neverAttended" /> />
                            </Form.Group>
                        </div>
                    </div>

                    {show ? <div id="detail-college">
                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_name" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="schoolName" required placeholder="" value={props.collegeName} onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolAddress"  className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_address" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="schoolAddress" value={props.collegeAddress} onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolZipCode" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_city" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="schoolZipCode" value={props.collegeZipCode} onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="yearsCompleted" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="years_completed" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="number" className="form-control" id="" required name="yearsCompleted" value={props.collegeYearsCompleted} onChange={props.handleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="isGraduate"  className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="graduated" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" name="isGraduate" type="radio" id="yes"
                                           value={true} onChange={props.handleChange}  />
                                    <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" name="isGraduate" type="radio" id="no"
                                           value={false} onChange={props.handleChange}  />
                                    <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="degree_earned" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="schoolDegree" value={props.collegeDegree} onChange={props.handleChange}  />
                            </div>
                        </div>
                    </div> : <h3><IntlMessages id="college_notAttend" /></h3>}

                    <div className="form-group row align-items-center">
                        <label htmlFor="" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="vocation_school" /> </label>
                        <div className="col-lg-7 col-sm-6">
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" onClick={hideVocationalHandler}  inline label=<IntlMessages id="neverAttendedSchool" /> />
                            </Form.Group>
                        </div>
                    </div>

                    {showVocational ? <div id="detail-vocational">
                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_name" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="schoolName" placeholder="" value={props.vocationalName} onChange={props.vocationalHandleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolAddress" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_address" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="schoolAddress" value={props.vocationalAddress} onChange={props.vocationalHandleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="schoolZipCode" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="school_city" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id=""  name="schoolZipCode" value={props.vocationalZipCode} onChange={props.vocationalHandleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="yearsCompleted" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="years_completed" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="number" className="form-control" id="" required name="yearsCompleted" value={props.vocationalYearsCompleted} onChange={props.vocationalHandleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="isGraduate" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="graduated" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" name="isGraduate" type="radio" id="yes"
                                           value={true} onChange={props.vocationalHandleChange}  />
                                    <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" name="isGraduate" type="radio" id="no"
                                           value={false} onChange={props.vocationalHandleChange}  />
                                    <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="degree_earned" /> </label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" required id="" name="schoolDegree" value={props.vocationalDegree} onChange={props.vocationalHandleChange} />
                            </div>
                        </div>
                    </div> : <h3><IntlMessages id="never_vocational" /> </h3>}

                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>
        </form>

)
}

const Step9 = ( props ) => {
    const [job2, setJob2] = useState(false)
    const [job3, setJob3] = useState(false)
    const [job4, setJob4] = useState(false)

    if (props.currentStep !== 9) {
        return null
    }


    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <h4 className="mb-5"><IntlMessages id="emp_history" /></h4>
                    <div className={'form-group row align-items-center'}>
                        <label htmlFor="contactEmployer" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="curr_employed" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" required name="currentlyEmployed" id="yes"
                                       value={true} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="currentlyEmployed" id="no" required
                                       value={false} onChange={props.handleChange}  />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="contactEmployer" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="contact_emp" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" required name="contactEmployer" id="yes"
                                       value={true} onChange={props.handleChange} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="contactEmployer" id="no" required
                                       value={false} onChange={props.handleChange}  />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="employerName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_name" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" name="employerName" required placeholder="" value={props.employerName} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="telephoneName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_number" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="tel" className="form-control" id="" name="telephoneName" required value={props.telephoneName} onChange={props.handleChange}  />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="businessType" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_business" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" name="businessType" required value={props.businessType} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="address" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_address" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" name="address" value={props.address} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="zipCode" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_city" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" name="zipCode" value={props.zipCode} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="length_emp" /> </label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" name="employmentLength" required value={props.employmentLength} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="salary" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_salary" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" name="salary" required placeholder="" value={props.salary} onChange={props.handleChange} />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="position" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_position" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" name="position" required  value={props.position} onChange={props.handleChange}  />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label htmlFor="reasonOfLeaving" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="reason_leave" /></label>
                        <div className="col-lg-7 col-sm-6">
                            <input type="text" className="form-control" id="" required name="reasonOfLeaving" value={props.reasonOfLeaving} onChange={props.handleChange} />
                        </div>
                    </div>

                    <Button variant={'success'} size={'lg'} className={'text-center btn btn-lg px-4 float-right'} onClick={() => { setJob2(!job2)}}><IntlMessages id="add_details" /></Button>
                    {job2 ? <>
                        <h3><IntlMessages id="emp_job2" /></h3>
                        <div className="form-group row align-items-center">
                            <label htmlFor="employerName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_name" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="employerName" placeholder="" value={props.employerName1} onChange={props.employeeHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="telephoneName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_number" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="tel" className="form-control" id="" required name="telephoneName" value={props.telephoneName1} onChange={props.employeeHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="businessType" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_business" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="businessType" value={props.businessType1} onChange={props.employeeHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="address" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_address" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="address" value={props.address1} onChange={props.employeeHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="zipCode" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_city" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="zipCode" value={props.zipCode1} onChange={props.employeeHandleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="length_emp" /> </label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="employmentLength" value={props.employmentLength1} onChange={props.employeeHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="salary" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp2_sal" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="salary" placeholder="" value={props.salary1} onChange={props.employeeHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="position" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_position" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="position" value={props.position1} onChange={props.employeeHandleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="reasonOfLeaving" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="reason_leave" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="reasonOfLeaving" value={props.reasonOfLeaving1} onChange={props.employeeHandleChange}  />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="yearsCompleted" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp2_years" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="number" className="form-control" id="" required name="yearsCompleted" value={props.yearsCompleted1} onChange={props.employeeHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="contactEmployer" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="reference" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" required name="contactEmployer"
                                           value={true} onChange={props.employeeHandleChange} />
                                    <label className="form-check-label"><IntlMessages id="yes" /></label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" required name="contactEmployer"
                                           value={false} onChange={props.employeeHandleChange} />
                                    <label className="form-check-label"><IntlMessages id="no" /></label>
                                </div>
                            </div>
                        </div>
                        <Button variant={'success'} size={'lg'} className={'text-center btn btn-lg px-4 float-right'} onClick={() => { setJob3(!job3)}}><IntlMessages id="add_details" /></Button>

                    </> : ''}

                    {job3 ? <>
                        <h3><IntlMessages id="job3" /></h3>
                        <div className="form-group row align-items-center">
                            <label htmlFor="employerName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_name" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="employerName" placeholder="" value={props.employerName2} onChange={props.employeeHandleChange2}   />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="telephoneName" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_number" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="tel" className="form-control" id="" required name="telephoneName" value={props.telephoneName2} onChange={props.employeeHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="businessType" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_business" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="businessType" value={props.businessType2} onChange={props.employeeHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="address" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_address" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="address" value={props.address2} onChange={props.employeeHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="zipCode" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_city" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" name="zipCode" value={props.zipCode2} onChange={props.employeeHandleChange2}/>
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="length_emp" /> </label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="employmentLength" value={props.employmentLength2} onChange={props.employeeHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="salary" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp2_sal" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="salary" placeholder="" value={props.salary2} onChange={props.employeeHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="position" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="emp_position" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="position" value={props.position2} onChange={props.employeeHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="reasonOfLeaving" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="reason_leave" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <input type="text" className="form-control" id="" required name="reasonOfLeaving" value={props.reasonOfLeaving2} onChange={props.employeeHandleChange2} />
                            </div>
                        </div>


                        <div className="form-group row align-items-center">
                            <label htmlFor="contactEmployer" className="col-lg-5 col-sm-6 col-form-label"><IntlMessages id="reference" /></label>
                            <div className="col-lg-7 col-sm-6">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="contactEmployer" id="yes" required
                                           value={true} onChange={props.employeeHandleChange2} />
                                    <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="contactEmployer" id="no" required
                                           value={false} onChange={props.employeeHandleChange2} />
                                    <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                                </div>
                            </div>
                        </div>

                    </> : ''}
                </div>
            </fieldset>
            <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="next_btn" /></button>
            </div>
        </form>
    )
}

const Step10 = ( props ) => {
    const [showSubAdmin, setShowSubAdmin] = useState(false)

    if (props.currentStep === 10) {
        return null
    }

    const servicesPromiseHandler = () =>
        new Promise(resolve => {
            axios.get('/subAdmin-select')
                .then((services) => {
                    resolve(services.data)
                })
        });
    const date = new Date();
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="fieldset">
                <div className="p-5">
                    <h4 className="mb-5"><IntlMessages id="reference_head" /></h4>
                    <p><IntlMessages id="reference_para" /></p>
                    <div className="form-group row align-items-center">
                        <label htmlFor="haveAnyFriendsAtSGN" className="col-sm-8 col-form-label"><IntlMessages id="assign_to_sub_admin" /></label>
                        <div className="col-sm-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="showSubAdmin" required type="radio" id="yes"
                                       value={true} onChange={() => setShowSubAdmin(true)} />
                                <label className="form-check-label" htmlFor="yes"><IntlMessages id="yes" /></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" name="showSubAdmin" required type="radio" id="no"
                                       value={false} onChange={() => setShowSubAdmin(false)} />
                                <label className="form-check-label" htmlFor="no"><IntlMessages id="no" /></label>
                            </div>
                        </div>
                    </div>

                    {showSubAdmin ?
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label><IntlMessages id="user" /></Form.Label>
                            <AsyncSelect
                                name="services"
                                cacheOptions
                                defaultOptions
                                value={props.subAdmins}
                                onChange={props.handleInputChange}
                                loadOptions={servicesPromiseHandler}
                            />                </Form.Group> : null }
                    <div className="my-5">
                        <h5 className="text-center"><IntlMessages id="first_person" /></h5>
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_firstName" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" required id="" name="firstName"   value={props.firstName} onChange={props.referenceHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_lastName" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" required name="lastName" value={props.lastName} onChange={props.referenceHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_number" /></label>
                            <div className="col-sm-8">
                                <input type="tel" className="form-control" id="" required name="phoneNumber" value={props.phoneNumber} onChange={props.referenceHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_email" /></label>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="" required name="email" value={props.email} onChange={props.referenceHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_address" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="address" value={props.address} onChange={props.referenceHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_city" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="city" value={props.city} onChange={props.referenceHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_occup" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="occupation" value={props.occupation} onChange={props.referenceHandleChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_years" /> </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="yearsAcquainted" value={props.yearsAcquainted} onChange={props.referenceHandleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="my-5">
                        <h5 className="text-center"><IntlMessages id="second_person" /></h5>
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_firstName" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" required name="firstName" value={props.firstName2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_lastName" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" required name="lastName" value={props.lastName2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_number" /></label>
                            <div className="col-sm-8">
                                <input type="tel" className="form-control" id="" required name="phoneNumber" value={props.phoneNumber2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_email" /></label>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="" required name="email" value={props.email2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_address" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="address" value={props.address2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_city" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="city" value={props.city2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_occup" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="occupation" value={props.occupation2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_years" /> </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="yearsAcquainted" value={props.yearsAcquainted2} onChange={props.referenceHandleChange2} />
                            </div>
                        </div>
                    </div>

                    <div className="my-5">
                        <h5 className="text-center"><IntlMessages id="third_person" /></h5>
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_firstName" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" required name="firstName" value={props.firstName3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_lastName" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" required name="lastName" value={props.lastName3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_number" /></label>
                            <div className="col-sm-8">
                                <input type="tel" className="form-control" id="" required name="phoneNumber" value={props.phoneNumber3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_email" /></label>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="" required name="email" value={props.email3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_address" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="address" value={props.address3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_city" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="city" value={props.city3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_occup" /></label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="occupation" value={props.occupation3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-4 col-form-label"><IntlMessages id="person_years" /> </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="" name="yearsAcquainted" value={props.yearsAcquainted3} onChange={props.referenceHandleChange3} />
                            </div>
                        </div>
                    </div>



                    <div className="my-5">
                        <h4 className="mb-0 text-center"><IntlMessages id="certificate" /></h4>
                        <p className="certificate-content text-center"><IntlMessages id="certificate_details" />
                        </p>
                        <div className="form-row align-items-center">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor=""><IntlMessages id="signature" /></label>
                                    <input type="text" className="form-control" id="" required placeholder="" name="certificate" value={props.certificate} onChange={props.handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor=""><IntlMessages id="date" /></label>
                                    <input type="text" className="form-control" id="" readOnly value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} placeholder="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            {props.loaded ?  <div className={'text-center'}>
                <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="submit_btn" /></button>
            </div> : <div className={'text-center'}><Spinner /></div>}
        </form>
    )
}





export default ApplicationForm;
