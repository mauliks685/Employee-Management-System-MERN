import React from 'react';
import Contents from './Contents.jsx';
import { Navbar, Button, Container, Nav } from 'react-bootstrap';

function NavBar() {
	return (
		<Navbar expand='sm' className='bg-primary' data-bs-theme='dark'>
			<Container>
				<Navbar.Brand href='/'><b>Employee Management System</b></Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto mb-2 mb-lg-0'>
						<Nav.Link href='/' active>
							Home
						</Nav.Link>
						<Nav.Link href='/#/add' active>
							Add New Employee
						</Nav.Link>
						<Nav.Link href='/#/about' active>
							About
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default function Page() {
	return (
		<div>
			<NavBar />
			<Contents />
		</div>
	);
}
