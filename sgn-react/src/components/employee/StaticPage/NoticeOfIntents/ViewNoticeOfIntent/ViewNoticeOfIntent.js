import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../../Util/IntlMessages';

const EmployeeViewNoticeOfIntent = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [formFields, setFormFields] = useState({
        businessName: '',
        potential: '',
        planOnGoing: '',
        businessPhoneNumber: '',
        additionalInformation: '',
    })
    const id = props.match.params.id;

    useEffect(() => {
        axios.get('/admin/noticeofintent/' + id)
            .then((res) => {
                setFormFields(res.data)
                setLoaded(true);
            })
    }, [loaded])
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 job-list">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title mb-0"><IntlMessages id="details" /></h4>
                            </div>
                            <div className="card-body">
                                {loaded ? <Form className="pt-5" id="addIntentForm">
                                    <Form.Group className="mb-4">
                                        <Form.Label><IntlMessages id="bus_intent" /></Form.Label>
                                        <Form.Control
                                            style={{ fontSize: "15px" }}
                                            type="text"
                                            name="businessName"
                                            readOnly
                                            value={formFields.businessName}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label><IntlMessages id="what_potent" /></Form.Label>
                                        <Form.Control type="text"
                                            style={{ fontSize: "15px" }}
                                            name="potential"
                                            readOnly
                                            value={formFields.potential}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="plan_cal" /></Form.Label>
                                        <Form.Control type="text"
                                            style={{ fontSize: "15px" }}
                                            name="planOnGoing"
                                            readOnly
                                            value={formFields.planOnGoing}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="phone_visit" /></Form.Label>
                                        <Form.Control type="tel"
                                            style={{ fontSize: "15px" }}
                                            name="businessPhoneNumber"
                                            readOnly
                                            value={formFields.businessPhoneNumber}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group mb-4">
                                        <Form.Label><IntlMessages id="add_info" /></Form.Label>
                                        <Form.Control as={'textarea'}
                                            style={{ fontSize: "15px" }}
                                            className="text-left" rows="6"
                                            name="additionalInformation"
                                            readOnly
                                            value={formFields.additionalInformation}
                                        />
                                    </Form.Group>
                                </Form> : <div style={{fontSize: "15px"}} className="text-center"><Spinner /></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeViewNoticeOfIntent
