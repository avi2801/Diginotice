import React, { useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/login4.svg';
import '../Css/SignUp.css';
import { MDBAnimation } from "mdbreact";

import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';





function SignUp() {
	const [fullName, setfullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(event) {
		console.log(email)
		event.preventDefault();
		alert("The form is summited")
	}

	return (
		<div className="container">
			<div className='row'>
				<div className='col-sm-6'>
					<h1 className="text-center">Register</h1>
					<Form onSubmit={handleSubmit} >
					<Form.Group className="mb-3" controlId="formBasicText">
							<Form.Label><h5 >Full Name</h5></Form.Label>
							<Form.Control type="email" placeholder="Enter Full Name"
								value={fullName}
								onChange={(e) => setfullName(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label><h5 >Email</h5></Form.Label>
							<Form.Control type="email" placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)} />
							<Form.Text className="text-muted lg">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label><h5>Password</h5></Form.Label>
							<Form.Control type="password" placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check className="mt-2" type="checkbox" label="Remember Me!" />
						</Form.Group>

						<Button className="loginButton" type="submit" >
							Submit
						</Button>
						<div >

						</div>
					</Form>
				</div>
				<div className='col-sm-6'>
					<Image className="img2" src={img} rounded />
				</div>


			</div>

		</div>



	)
}

export default SignUp;
