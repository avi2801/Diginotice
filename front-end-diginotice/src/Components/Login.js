import React, { useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/login1.svg';
import '../Css/Login.css';
import { MDBAnimation } from "mdbreact";




function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(event) {
		console.log(email)
		event.preventDefault();
		alert("The form is summited")
	}

	return (
		<div className="container top mb-9 ">
			<h1 className="heading">DigiNotice</h1>
			<div className="row  justify-content-center align-items-center form-back border shadow">

				<div className='col-md-6 d-none d-sm-block border-right'>
					<MDBAnimation type='slideInLeft' duration='3s'>
						<Image className="border-right border-black img1" src={img} rounded />
					</MDBAnimation>
				</div>
				<div className="col-md-5 col-sm-12 m-sm-2 ">
					<MDBAnimation type='slideInRight' duration='3s'>
						<h3 className='heading'>Login</h3>
						<Form onSubmit={handleSubmit} >
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

							<Button variant='warning' className="loginButton" type="submit" >
								Submit
							</Button>
							<div >

							</div>
						</Form>
					</MDBAnimation>
				</div>
			</div>
		</div>
	)
}

export default Login;
