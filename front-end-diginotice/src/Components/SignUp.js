import React, { Component } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import User from '../abis/User.json';
import Web3 from 'web3'
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/login4.svg';
import '../Css/SignUp.css';
// import { MDBAnimation } from "mdbreact";

// import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

class SignUp extends Component {
	async componentDidMount() {
		this.loadWeb3()
		this.SignUpValidator()
	}
	constructor(props) {
		super(props)

		this.state = {
			userType: "Teacher",
			name: "",
			address: "",
			user: null,
			account: "",
			teacherCount: null,
			studentCount: null,
			count:0
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

	async SignUpValidator() {
		const admin = "0x41e1388040e5410608794f9460C06dcB1F0b2c17";
		const web3 = window.Web3
		const accounts = await new web3.eth.getAccounts()
		this.setState({
			account: accounts[0]
		})
		console.log(accounts)

		const networkId = await web3.eth.net.getId()
		const networkData = User.networks[networkId]
		if (networkData) {
			const user = new web3.eth.Contract(User.abi, networkData.address)
			console.log(user)
			const teacherCount1 = await user.methods.teacherCount().call()
			this.setState({ user })
			this.setState({ teacherCount:teacherCount1 })
			console.log(teacherCount1,"This is count")

		}

		if (accounts[0] !== admin) {
			alert("This account does not have the permission to add users to this network");
			window.location.href = "http://localhost:3000";
		}

	}

	changeData = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})

	}

	handleSubmit = (event) => {

	    event.preventDefault();
		const userType1 = this.state.userType
		const name1 = this.state.name
		const address1 = this.state.address


		console.log(userType1);
		console.log(name1)
		console.log(address1)
		if (userType1 === "Teacher") {
			console.log("chala")
			this.state.user.methods.addTeacher(name1, address1).send({ from: this.state.account }).once('receipt', (receipt) => {
				alert("Teacher Account Registered!")
			})

		}
		else {
			console.log("nai chala")
			this.state.user.methods.addStudent(name1, address1).send({ from: this.state.account }).once('receipt', (receipt) => {
				alert("Student Account Registered!")
			})
		}
	}

	render() {
		return (
			<div className="container">
				<div className='row'>
					<div className='col-sm-6'>
						<h1 className="text-center">Register</h1>
						<Form  >
							<Form.Group className="mb-3" controlId="formBasicText">
								<Form.Label><h5 >Full Name</h5></Form.Label>
								<Form.Select
									value={this.state.userType} name="userType" onChange={this.changeData}
								>
									<option value="Teacher" >Teacher</option>
									<option value="Student">Student</option>
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label><h5 >Name</h5></Form.Label>
								<Form.Control type="text" placeholder="Enter Name"
									name="name"
									value={this.state.name}
									onChange={this.changeData} />
								<Form.Text className="text-muted lg">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label><h5>Address</h5></Form.Label>
								<Form.Control type="text" placeholder="Address"
									name="address"
									value={this.state.address}
									onChange={this.changeData} />
							</Form.Group>
							<Form.Group controlId="formBasicCheckbox">
								<Form.Check className="mt-2" type="checkbox" label="Remember Me!" />
							</Form.Group>

							<Button className="loginButton" type="submit" onClick={this.handleSubmit}>
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
}
// 	useEffect( async () => {
// 		console.log("Avinash");
// 		const networkId = await web3.eth.net.getId()
// 		const networkData = User.networks[networkId]
// 		if (networkData) {
// 			const user = new web3.eth.Contract(User.abi, networkData.address)
// 			const teacherCount = await user.methods.teacherCount().call();
// 			const studentCount = await user.methods.studentCount().call();
// 			console.log(teacherCount);
// 			console.log(studentCount);

// 		}
// 		else {
// 			window.alert("User contract is not deployed to detected network");
// 			window.location.href = "http://localhost:3000"

// 		}

// 		loadWeb3();
// 		SignUpValidator();

// 	}, [loadWeb3, SignUpValidator])



// 	const [userType, setUserType] = useState("");
// 	const [name, setName] = useState("");
// 	const [address, setAddress] = useState("");
// 	const [web3] = useRef([]);
// 	const [user] = useRef([]);
// 	const [teacher] = useRef(null);
// 	const [student] = useRef(null);





// 	async function loadWeb3() {
// 		if (window.ethereum) {
// 			window.Web3 = new Web3(window.ethereum)
// 			await window.ethereum.enable()
// 		}
// 		else if (window.Web3) {
// 			window.Web3 = new Web3(window.web3.currentProvider)
// 		}
// 		else {
// 			window.alert("Non ethereum project detected")
// 			window.location.href = "http://localhost:3000"
// 		}
// 	}


// 	async function SignUpValidator() {
// 		const admin = "0xD8Cfd4F64106C80992d6A67943c0379ddEfd5306";
// 		const web3 = window.Web3
// 		const accounts = await new web3.eth.getAccounts()
// 		console.log(accounts)

// 		if (accounts[0] !== admin) {
// 			alert("This account does not have the permission to add users to this network");
// 			window.location.href = "http://localhost:3000";
// 		}

// 	}

// 	function handleSubmit(event) {

// 		event.preventDefault();
// 		alert("The form is summited")
// 		if (userType === "Teacher")
// 		{
// 			user.methods.addTeacher(name, address).send().once('receipt', (receipt) => {
// 				alert("Teacher Account Registered!")
// 			})

// 		}
// 		else {
// 			user.methods.addStudent(name, address).send().once('receipt', (receipt) => {
// 				alert("Student Account Registered!")
// 			})
// 		}
// 	}


// }

export default SignUp;
