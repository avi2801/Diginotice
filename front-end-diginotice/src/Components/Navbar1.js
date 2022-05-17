import React, { useState } from 'react'
import logo from '../Images/logo.jpg'
import { Navbar, NavbarBrand, Collapse, NavItem, NavLink, Nav, NavbarToggler } from 'reactstrap'
import '../Css/Navbar1.css'


const Navbar1 = (props) => {

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	return (
		<div >
			<Navbar className="navbarColor" light-expand="md">
				<NavbarBrand className="links" href="/">
					<img src={logo} width="50" height="50" class="d-inline-block align-top " alt=""/>
					Diginotice
				</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar></Collapse>
					<Nav >
						<NavItem>
						<NavLink className="links" href="/login">Login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="links" href="/signup">Sign Up</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className="links" href="/noticeboard">Notice Board</NavLink>
						</NavItem>
					</Nav >
			</Navbar>
		</div>


	)
}

export default Navbar1;
