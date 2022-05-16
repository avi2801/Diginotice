import React, { Component } from 'react';
import { Form, Button, Modal } from "react-bootstrap";
import Diginotice from '../abis/Diginotice.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/NoticeBoard.css'
import Web3 from 'web3'
class NoticeBoard extends Component {

	async componentDidMount() {
		this.loadWeb3()
		this.loadBlockchainData()
	  }
	  async loadWeb3() {
		if (window.ethereum) {
		  window.Web3 = new Web3(window.ethereum)
		  await window.ethereum.enable()
		}
		else if (window.Web3) {
		  window.Web3 = new Web3(window.web3.currentProvider)
		}
		else {
		  window.alert("Non ethereum project detected")
		}
	  }
	  async loadBlockchainData() {
		const web3 = window.Web3
		const accounts = await new web3.eth.getAccounts()
		//console.log(accounts[0])
		this.setState({
		  account: accounts[0]
		})
		const networkId = await web3.eth.net.getId()
		const networkData = Diginotice.networks[networkId]

		if (networkData) {
		  const diginotice =  new web3.eth.Contract(Diginotice.abi, networkData.address)
		  this.setState({ diginotice })
		  const postCount = await diginotice.methods.postCount().call()
		  this.setState({ postCount })
		  this.setState({ loading: false })
		} else {
		  window.alert('Diginotice contract is not deployed to detected network')
		}
	  }
	constructor(props) {
		super(props)

		this.state = {
			account: '',
			diginotice: null,
			posts: [],
			loading: true,
			click: false,
			year: null,
			designation: '',
			content: " ",
			title: " ",
			list1: [{
				title: 'Notice',
				year: "2nd",
				designation: "Teacher",
				content: "2nd year has to present on 13th of may ",
			}],
			show: false
		}
	}
	changeData = (event) => {
		this.setState({
			[event.target.name]: event.target.value
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
		const name1 = this.state.year;
		const desig1 = this.state.designation;
		const content1 = this.state.content;
		const title = this.state.title
		const obj = { 'title': title, 'year': name1, 'designation': desig1, 'content': content1 };
		this.setState({
			list1: [...this.state.list1, obj],
			show: false
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
									<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
								</div>
							</div>
							<div className="card card-arrangement" >
								<div className="card-body">
									<h5 className="card-title">Notice regarding project submission</h5>
									<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
								</div>
							</div>

							<div>{this.state.list1.map(function (l1, index) {
								return (
									<div className="card card-arrangement" >
										<div className="card-body">
											<h5 className="card-title">{l1.title}</h5>
											<p className="card-text">{l1.year}</p>
											<p className="card-text">{l1.content}</p>
											<p className="card-text">{l1.designation}</p>

											{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
										</div>
									</div>
								)
							})}

							</div>

						</div>
						<div className='col-9'>
							{this.state.click &&
								<Modal show={this.state.show}>
									<Form className="m-4">
										<Form.Group className="mb-3" controlId="formBasicText">
											<Form.Label>Select the academic year</Form.Label>
											<Form.Select
												value={this.state.year} name="year" onChange={this.changeData}
											>
												<option value="1st">1st</option>
												<option value="2nd">2nd</option>
												<option value="3rd">3rd</option>
												<option value="4th">4th</option>
											</Form.Select>
											{/* <Form.Control type="number" placeholder="Enter the academic year"
												value={this.state.year} onChange={this.changeInput} /> */}
											{/* <Form.Text className="text-muted">
									                 We'll never share your email with anyone else.
								            </Form.Text> */}
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicText">
											<Form.Label>Title for the notice</Form.Label>
											<Form.Control type="text" placeholder="Write the title" name="title"
												value={this.state.title} onChange={this.changeData} />
											{/* <Form.Text className="text-muted">
									                 We'll never share your email with anyone else.
								            </Form.Text> */}
										</Form.Group>

										<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
											<Form.Label>Enter the content</Form.Label>
											<Form.Control as="textarea" rows={3}
												value={this.state.content} name="content" onChange={this.changeData} />
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicText">
											<Form.Label>Designation</Form.Label>
											<Form.Control type="text" placeholder="Enter your designation"
												name="designation"
												value={this.state.designation} onChange={this.changeData} />

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
