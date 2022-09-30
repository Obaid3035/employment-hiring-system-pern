import React from "react";
import {Form, Modal} from "react-bootstrap";
import IntlMessages from '../../../../../Util/IntlMessages';

const NoticeOfIntentModal = ( props ) => (
    <Modal
        show={props.show}
        onHide={props.handleShow}
        animation={false}
        size={'lg'}
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title><IntlMessages id="intent" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="pt-5" id="addIntentForm">
                <Form.Group className="mb-4">
                    <Form.Label><IntlMessages id="bus_intent" /></Form.Label>
                    <Form.Control type="text"
                                  name="businessName"
                                  readOnly
                                  value= {props.businessName}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label><IntlMessages id="what_potent" /></Form.Label>
                    <Form.Control type="text"
                                  name="potential"
                                  readOnly
                                  value= {props.potential}
                    />
                </Form.Group>
                <Form.Group className="form-group mb-4">
                    <Form.Label><IntlMessages id="plan_cal" /></Form.Label>
                    <Form.Control type="text"
                                  name="planOnGoing"
                                  readOnly
                                  value= {props.planOnGoing}
                    />
                </Form.Group>
                <Form.Group className="form-group mb-4">
                    <Form.Label><IntlMessages id="phone_visit" /></Form.Label>
                    <Form.Control type="tel"
                                  name="businessPhoneNumber"
                                  readOnly
                                  value= {props.businessPhoneNumber}
                    />
                </Form.Group>
                <Form.Group className="form-group mb-4">
                    <Form.Label><IntlMessages id="add_info" /></Form.Label>
                    <Form.Control as={'textarea'} className="text-left" rows="6"
                                  name="additionalInformation"
                                  readOnly
                                  value= {props.additionalInformation}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label><IntlMessages id="point_project" /></Form.Label>
                    <Form.Control
                        as={'input'}
                        type={'number'}
                        name={'points'}
                        readOnly
                        value={props.points}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>
)

export default NoticeOfIntentModal
