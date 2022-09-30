import React, {useEffect, useState} from 'react';
import IntlMessages from "../../../../../Util/IntlMessages";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import {Button, Form, Modal} from "react-bootstrap";
import AsyncSelect from "react-select/async/dist/react-select.esm";

const SubAdminView = props => {
	const [subAdmin, setSubAdmin] = useState(null);
	const [application, setApplication] = useState([]);
	// const subAdmin = {
	// 	firstName: 'Obaid',
	// 	lastName: 'Aqeel',
	// 	email: 'obaid@gmail.com',
	// 	uniqueID: '10012',
	// 	phoneNumber: '03331243023',
	// 	application: [
	// 		{
	// 			id: 1,
	// 			email: 'obaid@gmail.com',
	// 			status: 'employee'
	// 		}
	// 	]
	// }

	const [loader, setLoader] = useState(false);
	const subAdminId = props.match.params.id;
	const [formData, setFormData] = useState({});
	const [show, setShow] = useState(false);
	useEffect(() => {
		axios.get('/subAdmin-view/'+ subAdminId)
			.then((res) => {
				setLoader(true)
				console.log(res.data)
				setSubAdmin(res.data.user)
				setApplication(res.data.applications)
			})
	}, [!loader])
	const handleShow = () => setShow(!show);

	const onRemoveHandler = (id) => {
		setLoader(true)
		console.log(id)
		axios.put('/subAdmin-app-delete/'+ id, {subAdminId})
			.then((res) => {
				setLoader(false)
			})
	}

	const onSubmitHandler =(e) => {
		setLoader(true)
		e.preventDefault();

		if (formData.subAdmins) {
			axios.put('/add-app/'+ formData.subAdmins.value, {subAdminId})
				.then((res) => {
					setFormData({})
					setLoader(false)
					setShow(false)
				})
		} else {
			alert('No Application Attached')
		}

	}

	const handleInputChange = (newValue) => {
		setFormData({
			...formData,
			subAdmins: newValue
		})
	};

	const servicesPromiseHandler = () =>
		new Promise(resolve => {
			axios.get('/app-select-sub')
				.then((services) => {
					resolve(services.data)
				})
		});


	const form = (
		<Form className="my-5" onSubmit={onSubmitHandler}>

			<Form.Group controlId="exampleForm.SelectCustom">
				<Form.Label><IntlMessages id="user" /></Form.Label>
				<AsyncSelect
					name="services"
					cacheOptions
					defaultOptions
					value={formData.subAdmins}
					onChange={handleInputChange}
					loadOptions={servicesPromiseHandler}
				/>                </Form.Group>
			<Button type={'submit'} href="" variant={'primary'} size={'lg'}><IntlMessages id="enter" /></Button>
		</Form>
	)
	return (

		<div className="row">
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
			{
				loader && subAdmin ? <div className="col-md-12 job-list">
					<div className="card">
						<div className="card-header card-header-primary">
							<h4 className="card-title mb-0">{subAdmin.firstName}</h4>
						</div>

						<div className="card-body">
							<div className="row mt-2 align-items-start">
								<div className="col-lg-12 mb-2">
									<div className="card rounded shadow border mb-4 project-view-card">
										<div className="card-body">
											<div className="row align-items-start">
												<div className="col-md-6 col-lg-3 my-3 text-center border-right">
													<h4>Unique Id</h4>
													<p>{subAdmin.uniqueID}</p>
												</div>
												<div className="col-md-6 col-lg-2 my-3 text-center border-right">
													<h4>Name</h4>
													<p>{subAdmin.firstName} {subAdmin.lastName}</p>
												</div>
												<div className="col-md-6 col-lg-3 my-3 text-center border-right">
													<h4>Phone Number</h4>
													<p>{subAdmin.phoneNumber}</p>
												</div>
												<div className="col-md-6 col-lg-3 my-3 text-center">
													<h4>Email</h4>
													<p>{subAdmin.email}</p>
												</div>

											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-7">
									<div className="card rounded shadow border mb-4 project-view-card">
										<div className="d-flex justify-content-between">
											<div className="card-header">Application</div>
											<button
												onClick={handleShow}
												className="btn btn-sm btn-warning float-right "><i
												className="fas fa-plus text-primary" /></button>
										</div>
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-striped to-do-list">
													<thead className="">
													<th>#</th>
													<th>Email</th>
													<th>Status</th>
													<th>Action</th>
													</thead>
													<tbody>
													{application.length > 0 ?
														application.map((i, index) => (
															<tr key={index}>
																<td>{i.referralID}</td>
																<td>{i.User.email}</td>
																<td>{i.applicationStatus}</td>
																<td>
																	<button role="button" onClick={() => onRemoveHandler(i.id)} className="btn btn-sm btn-danger"><i
																		className="fas fa-times text-white"/></button>
																</td>
															</tr>
														))
														: <h4 className={'text-center'}>No Application Found</h4>
													}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> : <div className="text-center"><Spinner /></div>
			}
		</div>

	);
};

export default SubAdminView;
