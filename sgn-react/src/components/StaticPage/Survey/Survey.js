import React from 'react';
import './Survey.css'
import {Card, Col, Container, Row, Form} from "react-bootstrap";
import IntlMessages from '../../../Util/IntlMessages';

const Survey = props => {
	const id = props.match.params.id;
	const yesClickHandler = () => {
		props.history.replace('/survey-form/' + id)
	}

	const noClickHandler = () => {
		props.history.replace('/')
	}
	return (
		<>
			<div id={'top'} className={'d-flex justify-content-center'}>
				<h2 className={'survey__heading'}><IntlMessages id="quick_servey" /></h2>
			</div>
			<Container className={'mt-5'}>
				<Row className={'justify-content-center'}>
					<Col md={9}>
						<Card className={'shadow-lg p-5'}>
							<Card.Body className={'text-center'}>
								<p><IntlMessages id="we_train" /></p>
								<div className={'mt-5'}>
									<div className="form-check form-check-inline">
										<input className="form-check-input" type="radio"  onClick={yesClickHandler} />
										<label className="form-check-label pt-2"><IntlMessages id="yes" /></label>
									</div>

									<div className="form-check form-check-inline">
										<input className="form-check-input" type="radio"  onClick={noClickHandler}  />
										<label className="form-check-label pt-2"><IntlMessages id="no" /></label>
									</div>
								</div>
								<p className={'mt-4'}>
								<IntlMessages id="taking_time" />
								</p>
								{/*<h4 style={{fontWeight: 'bold'}}><IntlMessages id="have_great" /></h4>*/}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Survey;
