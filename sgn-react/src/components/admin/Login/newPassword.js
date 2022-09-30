import React, {useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import IntlMessages from "../../../Util/IntlMessages";
import {Button, Form} from "react-bootstrap";
import Spinner from "../../UI/ProgressBar/ProgressBar";
import axios from "axios";

const NewPassword = props => {

	const [loaded, setLoaded] = useState(true);
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [error, setError] = useState('')

	const token = props.match.params.id;

	useEffect(() => {
		axios.get('/authenticate/' + token)
			.then((res) => {
				if (!res.data.authenticate) {
					window.location.href = '/'
				}
			})
	}, [])


	const passwordChangeHandler = (e) => {
		setPassword(e.target.value)
	}
	const confirmPasswordChangeHandler = (e) => {
		setConfirmPassword(e.target.value)
	}


	const onSubmitHandler = (e) => {
		e.preventDefault();
		setLoaded(false)
		if (password === confirmPassword) {
			axios.put('/reset-password/' + token, { password })
				.then((res) => {
					window.location.href = '/'
				})
		} else {
			setError('Password do not match')
			setLoaded(true)
		}



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
								<h2 style={{ fontWeight: "bold" }} className="card-title font-weight-bold">Change Password</h2>
							</div>
							<div className="card-body">
								<Form onSubmit={onSubmitHandler} className="my-5" >
									<Form.Group className="mb-4">
										<Form.Label>New Password</Form.Label>
										<Form.Control style={{fontSize: "15px"}} type="password" required className="form-control" placeholder="Enter New Password" onChange={(e) => passwordChangeHandler(e)} value={password} />
									</Form.Group>
									<Form.Group className="mb-4">
										<Form.Label>Confirm New Password</Form.Label>
										<Form.Control style={{fontSize: "15px"}} type="password" required className="form-control" placeholder="Enter Confirm Password" onChange={(e) => confirmPasswordChangeHandler(e)} value={confirmPassword} />
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

export default NewPassword;
