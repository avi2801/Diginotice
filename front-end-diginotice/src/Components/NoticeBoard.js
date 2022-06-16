import React, { Component } from 'react';
import { Form, Button, Modal, ThemeProvider } from "react-bootstrap";
import Diginotice from '../abis/Diginotice.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/NoticeBoard.css'
import Web3 from 'web3'
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({host:'ipfs.infura.io',port:5001,protocol:'https'})
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
			year: '1st',
			designation: '',
			content: " ",
			title: " ",
			img:" ",
			posts: [],
			result1: [],
			date:'',
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
			window.location.href = "http://localhost:3000"
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
		console.log(accounts[0])
		const teacher = "0xD8Cfd4F64106C80992d6A67943c0379ddEfd5306";
		const student = "0x3a2856F9515f61bD45DBDcF1AAf87Bcb341705C0";
		if (accounts[0] === teacher)
		{
			this.setState({
				designation: "Avinash"
			})
		}
		else  {
			this.setState({
				designation:"Iraa"
			})
		}
		const networkId = await web3.eth.net.getId()
		const networkData = Diginotice.networks[networkId]
		if (networkData) {
			const diginotice = new web3.eth.Contract(Diginotice.abi, networkData.address)
			const postCount = await diginotice.methods.postCount().call()
			this.setState({ diginotice })
			this.setState({ postCount })
			console.log(postCount)
			console.log(this.state.diginotice)
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

	accounts = () => {



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
	captureFile = event => {
		event.preventDefault()
		const file = event.target.files[0]
		const r = new window.FileReader()
		r.readAsArrayBuffer(file)

		r.onloadend = () => {
			this.setState({ buffer: Buffer(r.result) })
			console.log('buffer',this.state.buffer)
		}


	}
	addData = (e) => {
		//e.preventDefault()
		const year1 = this.state.year;
		const desig1 = this.state.designation;
		const content1 = this.state.content;
		const title = this.state.title;
		const date = this.state.date;
		const img1 = this.state.img1

		// adding current date and time to the post


		console.log(content1)
		console.log(year1)
		console.log(desig1)
		//console.log(img1)
		console.log(this.state.diginotice)

		//ipfs
		ipfs.add(this.state.buffer, (error, result) => {
			console.log('ipfs result', result)
			const current = new Date();
			const date1 = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
			const time1 = `${current.getHours()}:${current.getMinutes()}`;
			console.log(date1);
			if (error) {
				console.log(error)
				return
			}
			this.state.diginotice.methods.addPost(content1, year1, desig1,result[0].hash,date1,time1).send({ from: this.state.account })
			.once('receipt', (receipt) => {
				this.setState({
					// year: "First - 1st",
					// designation: "",
					// content: " ",
					// title: " ",
					// img1: " ",
					show: false


				})
				console.log("BlockChain worked!")
				window.location.reload(false)
			});
		})



		//window.location.reload(false)

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
								<h1 className="text-center">Dayananda Sagar College of Engineering</h1>
								<h3 className="text-center">ISE Department</h3>
								<Button className="addButton" onClick={this.changeF}>
									New Notice or Announcement
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

								<div>{this.state.posts.reverse().map(function (p1, key) {
									console.log(p1)
									return (
										<div className="card card-arrangement" >
											<div className="card-body">
												<p>{p1.date}</p>
												<p>{p1.time}</p>
											<img className="card-img" src={`https://ipfs.infura.io/ipfs/${p1.imageHash}`} alt="img"/>
												<h5 className="card-title">{p1.title}</h5>
												<p className="card-text"><span id='year'>Year</span>{p1.year}</p>
												<p className="card-text"><span id='message'>Message </span>{p1.message}</p>
												<p className="card-text"><span id='designation'>Designation </span>{p1.teacher}</p>

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
													<option value="1st" >First - 1st</option>
													<option value="2nd">Second- 2nd</option>
													<option value="3rd">Third -3rd</option>
													<option value="4th">Fourth - 4th</option>
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
												<Form.Label>Name</Form.Label>
												<Form.Control type="text"
													value={this.state.designation}  />
											</Form.Group>
											<Form.Group>
												<Form.Label>Upload any Image</Form.Label>
												<Form.Control type="file" placeholder="Uplaod image if required"
													name="img1" value={this.state.img1} onChange={this.captureFile} />


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
