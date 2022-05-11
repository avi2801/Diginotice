import React, { Component } from 'react';
import { Form, Button, Modal } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/NoticeBoard.css'
import login1 from '../Images/login1.svg'
class NoticeBoard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			click: false,
			year: null,
			designation: '',
			content: " ",
			title: " ",
			list1: [{
				title: 'Notice',
				year: "Second Year (2nd)",
				designation: "Teacher",
				content: "2nd year has to present on 13th of may ",
			}],
			show: false
		}
	}
	changeYear = (event) => {
		this.setState({
			year: event.target.value
		})

	}
	changeDesig = (event) => {
		this.setState({
			designation: event.target.value
		})

	}
	changeContent = (event) => {
		this.setState({
			content: event.target.value,

		})
	}
	changeTitle = (event) => {
		this.setState({
			title: event.target.value
		})
	}
	changeF = () => {
		this.setState({
			click: true,
			show: true
		})
	}
	handleClose = () => {
		this.setState({
			show: false
		})
	}
	addData(e) {
		e.preventDefault()
		var name1 = this.state.year;
		var desig1 = this.state.designation;
		var content1 = this.state.content;
		var title = this.state.title;
		var obj = { 'title': title, 'year': name1, 'designation': desig1, 'content': content1 };

		this.setState({
			list1: [...this.state.list1, obj],
			show: false,

		})
	}


	render() {
		return (
			<div class="mt-3" >
				<div className='container'>
					<div className='row '>
						<div className='col-2'>
						</div>
						<div className="col-8">
							<h1>Dayananda Sagar College of Engineering</h1>
							<h3>ISE Department</h3>
							<Button className="addButton" onClick={this.changeF}>
								Add New Item
							</Button>
							<div className="card card-arrangement" >
								<div className="card-body">
									{/* <img class="card-img-top" src={login1} alt="Card image cap" /> */}
									<h5 className="card-title">Announcement</h5>
									<p className="card-text yearPara">First Year</p>
									<p className="card-text nContent">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
								</div>
							</div>
							<div className="card card-arrangement" >
								<div className="card-body">
									<h5 className="card-title">Notice regarding project submission</h5>
									<p className="card-text yearPara">Third Year</p>
									<p className="card-text nContent">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
								</div>
							</div>

							<div>{this.state.list1.map(function (l1, index) {
								return (
									<div className="card card-arrangement" >
										<div className="card-body">
											<h5 className="card-title">{l1.title}</h5>
											<p className="card-text yearPara">{l1.year}</p>
											<p className="card-text nContent">{l1.content}</p>
											<p className="card-text nDesig">{l1.designation}</p>

											{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
										</div>
									</div>
								)
							})}

							</div>

						</div>
						<div className='container'>
							{this.state.click &&
									<Modal show={this.state.show} >
										<Form className="m-4">
											<Form.Group className="mb-3" controlId="formBasicText">
												<Form.Label>Select the academic year</Form.Label>
												<Form.Select
													value={this.state.year} onChange={this.changeYear}
												>
													<option value="First Year">1st</option>
													<option value="Second Year">2nd</option>
													<option value="Third Year">3rd</option>
													<option value="Fourth Year">4th</option>
												</Form.Select>
												{/* <Form.Control type="number" placeholder="Enter the academic year"
												value={this.state.year} onChange={this.changeInput} /> */}
												{/* <Form.Text className="text-muted">
									                 We'll never share your email with anyone else.
								            </Form.Text> */}
											</Form.Group>
											<Form.Group className="mb-3" controlId="formBasicText">
												<Form.Label>Title for the notice</Form.Label>
												<Form.Control type="text" placeholder="Write the title"
													value={this.state.title} onChange={this.changeTitle} />
												{/* <Form.Text className="text-muted">
									                 We'll never share your email with anyone else.
								            </Form.Text> */}
											</Form.Group>

											<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
												<Form.Label>Enter the content</Form.Label>
												<Form.Control as="textarea" rows={3}
													value={this.state.content} onChange={this.changeContent} />
											</Form.Group>
											<Form.Group className="mb-3" controlId="formBasicText">
												<Form.Label>Designation</Form.Label>
												<Form.Control type="text" placeholder="Enter your designation"
													value={this.state.designation} onChange={this.changeDesig} />

											</Form.Group>
										</Form>
										<Modal.Footer>
											<Button variant="warning" type="submit" onClick={(e) => { this.addData(e) }} >
												Submit
											</Button>
											<Button variant="secondary" onClick={this.handleClose}>
												Close
											</Button>
										</Modal.Footer>
									</Modal>

							}
						</div>
					</div>

				</div>
			</div>
		)
	}
}

export default NoticeBoard;
