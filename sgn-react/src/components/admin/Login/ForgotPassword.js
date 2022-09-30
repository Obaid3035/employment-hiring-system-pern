import React, {useState} from 'react';
import IntlMessages from "../../../Util/IntlMessages";
import {Button, Form} from "react-bootstrap";
import Spinner from "../../UI/ProgressBar/ProgressBar";
import {toast, ToastContainer} from "react-toastify";

import axios from "axios";

const ForgotPassword = () => {

	const [loaded, setLoaded] = useState(true);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('')

	const successNotify = () => toast.success('Email sent successfully', {
		position: "top-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setLoaded(false)
		axios.post('/admin/forgotPassword', { email })
			.then((res) => {
				if(!res.data.error) {
					setError('')
					setLoaded(true)
					successNotify();
				} else {
					setLoaded(true)
					setError(res.data.error)
				}
			})
	}


	const emailChangeHandler = (e) => {
		console.log(e.target.value)
		setEmail(e.target.value.toLowerCase())
	}

	return (
		<section className="wrapper">
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
			<div className="container h-100 align-items-center">
				<div className="row h-100 align-items-center justify-content-center">
					<div className="col-md-5">
						<div className="card text-center">
							<div className="card-header card-header-primary">
								<p style={{
									color: 'red'
								}}>{error}</p>
								<h2 style={{ fontWeight: "bold" }} className="card-title font-weight-bold"><IntlMessages id="login_btn" /></h2>
							</div>
							<div className="card-body">
								<Form onSubmit={onSubmitHandler} className="my-5" >
									<Form.Group className="mb-4">
										<Form.Label><IntlMessages id="Email" /></Form.Label>
										<Form.Control style={{fontSize: "15px"}} type="email" required className="form-control" placeholder="Enter Email" onChange={(e) => emailChangeHandler(e)} value={email} />
									</Form.Group>
									{loaded ? <Button style={{fontSize: "15px"}} type={'submit'} href="" variant={'primary'} size={'lg'}>Submit</Button> : <Spinner />}
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>

		</section>

	);
};

export default ForgotPassword;
