import React, {useEffect, useState} from 'react';
import {Button, Form, ProgressBar} from "react-bootstrap";
import BG from '../../../assets/img/bg4.jpg'
import axios from "axios";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import Spinner from "../../UI/ProgressBar/ProgressBar";
import {toast} from "react-toastify";
import IntlMessages from '../../../Util/IntlMessages';
import "./Questionare.css";

const Questionare = (props) => {

    const [progress, setProgress] = useState(10)
    const [loaded, setLoaded] = useState(true);

    const [timeToReach, setTimeToReach] = useState(null);
    const [resume, setResume] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [ formFields, setFormFields ] = useState({
        currentStep: 1,
        firstName: '',
        lastName: '',
        companyName: '',
        companyAddress: '',
        email: '',
        phoneNumber: '',
        bestOption: '',
        industry: '',
        productPicture: '',
        quantity: 0,
        pricePerUnit: 0,
        howSoon: '',
        checkAddress: false,
        Address: '',
        productName: '',
    })
    const successNotify = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        setFormFields({
            ...formFields,
            checkAddress: !formFields.checkAddress
        })
        console.log(formFields)

    };

    const fileUploadHandler = ( id ) => {
        console.log(id)
        const data = new FormData()
        data.append('file', resume)
        axios.post('/file/'+id, data, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then((res) => {
                console.log(res.data)
                successNotify('Thank you for contacting us!')
                setTimeout(() => {
                    setLoaded(true);
                    props.history.replace('/survey/' + id)
                },2100)
            })
    }

    const fileSelectHandler = (e) => {
        let files = e.target.files[0];
        setResume(files);
    }

    const inputChangeHandler = (e) => {
        let {name, value} = e.target
        console.log(name, value);
        console.log(formFields.checkAddress)
        if (name === 'email') {
            value = value.toLowerCase();
        }
        const updated = {...formFields}
        updated[name] = value
        setFormFields(updated)
        console.log(formFields)
    }

    const fromTime = (time) => {
        console.log(timeToReach)
        setTimeToReach(time)
    }


    let progressBar = 0;

    const handleSubmit = e => {
        e.preventDefault()
        setLoaded(false)
        formFields.timeToReach = timeToReach
        console.log(formFields.checkAddress);
        axios.post('/quote', formFields)
            .then((res) => {
                console.log(res.data.id)
               fileUploadHandler(res.data.id)
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


    return (
        <>
            <section className="content-img">
                <img src={BG}  />
                    <div className="far-caption">
                        <h2><IntlMessages id="Ques" /></h2>
                    </div>
            </section>

            <section >
                <div className="container ">
                    <div className="col-md-12">
                        <h2 className={'font-weight-bold mt-5'}><IntlMessages id="help_ques" /></h2>
                        <p>
                        <IntlMessages id="help_para" />
                        </p>
                    </div>
                </div>
            </section>

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

                                <ProgressBar animated now={progress}/>

                                {formFields.currentStep === 1 &&  <Step1
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    firstName={formFields.firstName}
                                    lastName={formFields.lastName}
                                    onSubmit={_next}
                                />}

                                {formFields.currentStep === 2 && <Step2
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    companyName={formFields.companyName}
                                    companyAddress={formFields.companyAddress}
                                    onSubmit={_next}
                                    previousPage={_prev}
                                />}
                                {formFields.currentStep === 3 && <Step3
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    email={formFields.email}
                                    phoneNumber={formFields.phoneNumber}
                                    onSubmit={_next}
                                    previousPage={_prev}
                                />}

                                {formFields.currentStep === 4 && <Step4
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    bestOption={formFields.bestOption}
                                    onSubmit={_next}
                                    previousPage={_prev}
                                />}

                                {formFields.currentStep === 5 && <Step5
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    onChangeFrom={fromTime}
                                    timeToReach={timeToReach}
                                    onSubmit={_next}
                                    previousPage={_prev}
                                />}

                                {formFields.currentStep === 6 && <Step6
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    industry={formFields.industry}
                                    productName={formFields.productName}
                                    onSubmit={_next}
                                    previousPage={_prev}
                                />}

                                {formFields.currentStep === 7 && <Step7
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    fileSelectHandler={fileSelectHandler}
                                    onSubmit={_next}
                                    previousPage={_prev}
                                />}

                                {formFields.currentStep === 8 && <Step8
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    quantity={formFields.quantity}
                                    pricePerUnit={formFields.pricePerUnit}
                                    onSubmit={_next}
                                    previousPage={_prev}

                                />}

                                {formFields.currentStep===9 &&  <Step9
                                    currentStep={formFields.currentStep}
                                    handleChange={inputChangeHandler}
                                    howSoon={formFields.howSoon}
                                    onSubmit={_next}
                                    previousPage={_prev}
                                />}

                                {formFields.currentStep === 10 && <Step10
                                    checkAddress={formFields.checkAddress}
                                    Address={formFields.Address}
                                    onSubmit={handleSubmit}
                                    handleOnChange={handleOnChange}
                                    handleChange={inputChangeHandler}
                                    previousPage={_prev}
                                    loaded={loaded}
                                />}

                            </div>
                        </div>
                    </div>


                </div>
            </section>


        </>
    );
};

const Step1 = ( props ) => {
    if (props.currentStep !== 1) {
        return null
    }
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="box1">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="first"><IntlMessages id="first_name" /></label>
                        <input type="text" className="form-control"
                               placeholder="First Name..." name="firstName" required value={props.firstName} onChange={props.handleChange} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="last"><IntlMessages id="last_name" /></label>
                        <input type="text" className="form-control"
                               placeholder="Last Name...." name="lastName"
                               required value={props.lastName} onChange={props.handleChange}
                        />
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
            <fieldset className="box1">
                <h2><IntlMessages id="comp_info" /></h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="first"><IntlMessages id="company" /></label>
                            <input type="text" className="form-control"
                                   placeholder="Company Name..." name="companyName" required onChange={props.handleChange} value={props.companyName} />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="last"><IntlMessages id="company_add" /></label>
                            <textarea className="form-control"
                                      placeholder="Company Address..."
                                      name="companyAddress"
                                      required onChange={props.handleChange}
                                      value={props.companyAddress}
                            />
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
            <fieldset className="box1">
                <h2><IntlMessages id="contact_details" /></h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="first"><IntlMessages id="email" /></label>
                            <input type="text" className="form-control" placeholder="Email..." name="email"
                                   required onChange={props.handleChange} value={props.email} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="last"><IntlMessages id="phone_no" /></label>
                            <input type="text" className="form-control" placeholder="Phone..." name="phoneNumber"
                                   required onChange={props.handleChange} value={props.phoneNumber}/>
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

const Step4 = ( props ) => {
    if (props.currentStep !== 4) {
        return null
    }
    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className={'box1'}>
                <h2><IntlMessages id="best_reach" /></h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <select className="form-control" name="bestOption" required onChange={props.handleChange}>
                                <option>Select Option</option>
                                <option value="Phone">Phone</option>
                                <option value="Email">Email</option>
                                <option value="Etc">Etc</option>
                            </select>
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

const Step5 = ( props ) => {

    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className={'box1'}>
                <h2><IntlMessages id="best_time" /></h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="dtp_input1" className="control-label"><IntlMessages id="dateTime_pick" /></label>
                            <TimePicker value={props.timeToReach} onChange={props.onChangeFrom} className={'w-100'} />
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
            <fieldset className={'box1'}>
                <h2><IntlMessages id="industry_pro" /></h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <select className="form-control" name="industry" required onChange={props.handleChange}>
                                <option disabled selected>Select Option</option>
                                <option value="Agricultural industry">Agricultural industry</option>
                                <option value="Manufacturing industry">Manufacturing industry</option>
                                <option value="Service industry">Service industry</option>
                            </select>
                        </div>
                    </div>
                </div>
                {
                    props.industry === 'Agricultural industry' || props.industry === 'Manufacturing industry' || props.industry === 'Service industry'  ? <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="last"><IntlMessages id="type_name" /></label>
                            <input type="text" className="form-control" placeholder="product " name="productName"
                                   required onChange={props.handleChange} value={props.productName}/>
                        </div>
                    </div> : ''
                }
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
            <fieldset className="box2">

                <h2><IntlMessages id="upload_pic" /></h2>
                <div className="row">
                    <div className="col-md-12">
                        <label>File</label>
                        <input type="file" onChange={props.fileSelectHandler} name={'resume'} required id="resume"
                               className="form-control form-control-file" />
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

    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="box2">

                <div className="row">
                    <div className="col-md-12">
                        <label><IntlMessages id="type_quantity" /> <span data-toggle="tooltip"
                                                                                             data-placement="top"
                                                                                             title="Please separate by commas if listing quantities for multiple products">?</span></label>
                        <input type="text" className="form-control" name="quantity" placeholder="Quantity..." required onChange={props.handleChange} value={props.quantity}  />
                    </div>
                    <div className="col-md-12">
                        <label><IntlMessages id="target_price" /> <span data-toggle="tooltip"
                                                                                                   data-placement="top"
                                                                                                   title="Please separate by commas if listing target price for multiple products">?</span></label>
                        <input type="text" className="form-control" name="pricePerUnit" placeholder="Price..." required onChange={props.handleChange} value={props.pricePerUnit} />
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

const Step9 = ( props ) => {

    if (props.currentStep !== 9) {
        return null
    }


    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="box2">

                <h2><IntlMessages id="howsoon_want" /></h2>
                <div className="row">
                    <div className="col-md-12">
                        <input type="text" className="form-control" name="howSoon" placeholder="How Soon...." required onChange={props.handleChange} value={props.howSoon}/>
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

const Step10 = ( props ) => {
    if (props.currentStep === 10) {
        return null
    }

    return  (
        <form onSubmit={props.onSubmit}>
            <fieldset className="box1">

                <h2><IntlMessages id="product_delivered" /></h2>
                <div className="row">
                            <div className="col-md-6">
                                <label><IntlMessages id="check_box" /></label>
                                <input type="checkbox" name="checkAddress" className="check" checked={props.checkAddress} onChange={props.handleOnChange} value={'Yes'} />
                            </div>
                    {
                        !props.checkAddress ? <div className="col-md-6">
                        <label><IntlMessages id="contact_address" /></label>
                        <textarea className="form-control" name="Address" placeholder="Address..." required onChange={props.handleChange} value={props.Address} />
                        </div> : ''
                    }

                </div>


 </fieldset>
            {props.loaded ?
                <div className={'text-center'}>
                    <button type={'button'} onClick={props.previousPage} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="previous_btn" /></button>
                    <button type={'submit'} className={'btn btn-warning mb-3 px-5'}><IntlMessages id="submit_btn" /></button>
                </div>
                : <div className={'text-center'}><Spinner /></div>}

        </form>
    )
}



export default Questionare;
