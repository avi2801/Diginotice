import React, { Component } from 'react'
import { MDBAnimation } from "mdbreact";
import home from '../Images/home2.svg'
import '../Css/Home.css'
 class Home extends Component {
  render() {
	  return (
		<div className='container'>
				<div className='row'>
					<div className='col-sm-6'>
						<MDBAnimation type='slideInLeft' duration='2s'>
							<div >
							  <h1 className='text1'>DigiNotice</h1>
							  <p className='text2'>
								  A platform where students and teachers can communicate seamlessly without the
								  interference of third party applications like whatsapp or google classroom.
								  The platform aims to eliminate any application using a centralised server.
								  Our application provides a decentralised platform which makes it very reliable and efficient.

							  </p>

							</div>
						</MDBAnimation>
					</div>

					<div className='col-sm-6 '>
						<MDBAnimation type='slideInRight' duration='2s'>
							<img src={home} className='imageHome' alt="" />
						</MDBAnimation>
					</div>
				</div>
			</div>

	)
  }
}

export default Home
