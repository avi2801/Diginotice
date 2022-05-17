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
	constructor(props) {
		super(props)

		this.state = {
			account: '',
			diginotice: null,
			postCount: null,
			loading: true,
			click: false,
			year: null,
			designation: '',
			content: " ",
			title: " ",
			posts: [],
			show: false
		}
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
		console.log(accounts)

		//console.log(accounts[0])
		this.setState({
			account: accounts[0]
		})
		const networkId = await web3.eth.net.getId()
		const networkData = Diginotice.networks[networkId]
		if (networkData) {
			const diginotice = new web3.eth.Contract(Diginotice.abi, networkData.address)
			const postCount = await diginotice.methods.postCount().call()
			this.setState({ diginotice })
			this.setState({ postCount })
			console.log(postCount)
			for (var i = 1; i <= postCount; i++) {
				const post = await diginotice.methods.posts(i).call()
				console.log(post)
				this.setState({
					posts: [...this.state.posts, post]
				})
			}
			console.log("this is where the post is getting printed", this.state.posts)
		}
		else {
			window.alert("Diginotice contract is not deployed to detected network")
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
	addData = (e) => {
		e.preventDefault()
		const year1 = this.state.year;
		const desig1 = this.state.designation;
		const content1 = this.state.content;
		const title = this.state.title

		console.log(content1)
		console.log(year1)
		console.log(desig1)
		console.log(this.state.diginotice)
		this.state.diginotice.methods.addPost(content1, year1, desig1).send({ from: this.state.account })
			.once('receipt', (receipt) => {
				
				console.log("BlockChain worked!")
			});

	}
	render() {
		if (this.state.loading) {
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
								{/* <div className="card card-arrangement" >
									<div className="card-body">

										<h5 className="card-title">Announcement</h5>
										<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

									</div>
								</div> */}
								{/* <div className="card card-arrangement" >
									<div className="card-body">
										<h5 className="card-title">Notice regarding project submission</h5>
										<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

									</div>
								</div> */}

								<div>{this.state.posts.map(function (p1,key) {
									return (
										<div className="card card-arrangement" >
											<div className="card-body">
												<h5 className="card-title">{p1.title}</h5>
												<span>Message:<p className="card-text">{p1.message}</p></span>
												<br/>
												<span>Designation: <p className="card-text">{p1.teacher}</p></span>
												<br/>
												<span>Year: <p className="card-text">{p1.year}</p></span>

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
										<Form className="m-4" >
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
											<Button variant="warning" type="submit" onClick={this.addData} >
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
}

export default NoticeBoard;
