import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import formConfig from "../../../../../helpers/formConfig";
import useFormFields from "../../../../../helpers/useFormFields";
import axios from "axios";
import IntlMessages from '../../../../../Util/IntlMessages';

const ViewJob = ( props ) => {
    const [loaded, setLoaded] = useState(false);
    const { formFields, createChangeHandler, setFormFields } = useFormFields({
        jobCountry: '',
        jobState: '',
        jobCity: '',
        jobTitle: '',
        jobDescription: '',
        jobBenefit: '',
        jobRequirement: ''
    })
    const id = props.match.params.id;

    useEffect(() => {
        axios.get('/admin/job/'+id)
            .then((res) => {
                setFormFields(res.data);
                setLoaded(true)
            })
        return () => {
            setFormFields({})
        }
    },[loaded])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put('/admin/job/' + id, formFields)
            .then((res) => {
                console.log(res.data)
                setLoaded(true);
                props.history.replace('/admin/job')
            })
        console.log(formFields)
    }

    return(
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title mb-0"><IntlMessages id="details" /></h4>
                            </div>
                            <div className="card-body">
                                <Form className="pt-5" id="addIntentForm" onSubmit={onSubmitHandler}>
                                    <Form.Group className="mb-4">
                                        <Form.Label><IntlMessages id="job_title" /></Form.Label>
                                        <Form.Control type="text"
                                                      name="businessName"
                                                      value= {formFields.jobTitle}
                                                      style={{ fontSize: '15px' }}
                                                      onChange={createChangeHandler('jobTitle')}
                                                      required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label><IntlMessages id="job_country" /></Form.Label>
                                        <Form.Control type="text"
                                                      name="potential"
                                                      value= {formFields.jobCountry}
                                                      style={{ fontSize: '15px' }}
                                                      onChange={createChangeHandler('jobCountry')}
                                                      required
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="job_state" /></Form.Label>
                                        <Form.Control type="text"
                                                      name="planOnGoing"
                                                      value= {formFields.jobState}
                                                      style={{ fontSize: '15px' }}
                                                      onChange={createChangeHandler('jobState')}
                                                      required
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="job_city" /></Form.Label>
                                        <Form.Control type="tel"
                                                      name="businessPhoneNumber"
                                                      style={{ fontSize: '15px' }}
                                                      value= {formFields.jobCity}
                                                      onChange={createChangeHandler('jobCity')}
                                                      required
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="job_descrip" /></Form.Label>
                                        <Form.Control as={'textarea'} className="text-left" rows="6"
                                                      name="additionalInformation"
                                                      value= {formFields.jobDescription}
                                                      style={{ fontSize: '15px' }}
                                                      onChange={createChangeHandler('jobDescription')}
                                                      required
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="job_benefit" /></Form.Label>
                                        <Form.Control as={'textarea'} className="text-left" rows="6"
                                                      name="additionalInformation"
                                                      value= {formFields.jobBenefit}
                                                      style={{ fontSize: '15px' }}
                                                      onChange={createChangeHandler('jobBenefit')}
                                                      required
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="job_req" /></Form.Label>
                                        <Form.Control as={'textarea'} className="text-left" rows="6"
                                                      name="additionalInformation"
                                                      value= {formFields.jobRequirement}
                                                      onChange={createChangeHandler('jobRequirement')}
                                                      required
                                        />
                                    </Form.Group>
                                    <div className={'float-right'}>
                                        <Button variant={'primary'} type={'submit'} size={'lg'} className={'mx-4  mb-4'}><IntlMessages id="update" /></Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewJob;
