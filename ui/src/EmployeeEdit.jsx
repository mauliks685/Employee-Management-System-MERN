import React from 'react';
import graphQLFetch from './GraphQLFetch';
import { Row, Col, Form, Button, Card, CardBody, CardTitle } from 'react-bootstrap';

export default class EmployeeEdit extends React.Component {
	constructor(props) {
		super(props);

		const query = `
			query {
				employeeDetail(_id: "${props.match.params.id}") {
					_id firstName lastName age dateOfJoining title department employeeType currentStatus
				}
			}
		`;

		this.state = {
			_id: '',
			firstName: '',
			firstNameError: '',
			lastName: '',
			lastNameError: '',
			age: 0,
			ageError: '',
			dateOfJoining: '',
			dateOfJoiningError: '',
			title: '',
			titleError: '',
			department: '',
			departmentError: '',
			employeeType: '',
			employeeTypeError: '',
			currentStatus: false,
		};

		graphQLFetch(query).then((data) => {
			console.log(data);
			const employee = data.employeeDetail;

			this.setState({
				_id: employee._id,
				firstName: employee.firstName,
				firstNameError: '',
				lastName: employee.lastName,
				lastNameError: '',
				age: employee.age,
				ageError: '',
				dateOfJoining: employee.dateOfJoining,
				dateOfJoiningError: '',
				title: employee.title,
				titleError: '',
				department: employee.department,
				departmentError: '',
				employeeType: employee.employeeType,
				employeeTypeError: '',
				currentStatus: Boolean(employee.currentStatus),
			});
		});
	}

	async handleSubmit(e) {
		e.preventDefault();

		// validation
		if (this.state.firstName.length < 2) {
			this.setState({ firstNameError: 'Please enter a valid name!' });
		}
		if (this.state.lastName.length < 2) {
			this.setState({ lastNameError: 'Please enter a valid name!' });
		}
		if (this.state.age <= 19 || this.state.age >= 80) {
			this.setState({ ageError: 'Please enter a valid age between 19 and 80.' });
			return;
		}
		if (this.state.dateOfJoining == '') {
			this.setState({ dateOfJoiningError: 'Please enter a valid date!' });
			return;
		}
		if (this.state.title.length < 2) {
			this.setState({ titleError: 'Please enter a valid title!' });
			return;
		}
		if (this.state.department.length < 2) {
			this.setState({ departmentError: 'Please enter a valid department name!' });
			return;
		}
		if (this.state.employeeType.length < 2) {
			this.setState({ employeeTypeError: 'Please enter employee type!' });
			return;
		}

		const employee = {
			_id: this.state._id,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			age: this.state.age,
			dateOfJoining: this.state.dateOfJoining,
			title: this.state.title,
			department: this.state.department,
			employeeType: this.state.employeeType,
			currentStatus: this.state.currentStatus,
		};

		const query = `
			mutation employeeEdit($employee: EmployeeInputs) {
				employeeEdit(employee: $employee) {
					_id firstName lastName age dateOfJoining title department employeeType currentStatus
				}
			}
		`;

		const data = await graphQLFetch(query, { employee });
		if (data) {
			console.log(data);
			alert('Employee updated successfully!');
			this.props.history.push('/');
		}
	}

	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<React.Fragment>
				<Row className='justify-content-center mt-5 mb-5'>
					<Col xs={12} sm={12} md={6} lg={6}>
						<Card className='bg-secondary-subtle'>
							<CardTitle className='bg-primary px-4 py-3'>
								<h2 className='mb-0 text-white'>Edit an employee</h2>
							</CardTitle>

							<CardBody className='p-4'>
								<Form
									onSubmit={async (e) => {
										this.handleSubmit(e);
									}}>
									

									{/* firstName */}
									<div className='mb-3'>
										<Form.Label htmlFor='firstName' className='form-label'>
											First name
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='firstName'
											disabled
											// onChange={(e) => {
											// 	this.setState({ firstName: e.target.value, firstNameError: '' });
											// }}
											value={this.state.firstName}
										/>
										<small className='text-danger'>{this.state.firstNameError}</small>
									</div>

									{/* lastName */}
									<div className='mb-3'>
										<Form.Label htmlFor='lastName' className='form-label'>
											Last name
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='lastName'
											disabled
											// onChange={(e) => {
											// 	this.setState({ lastName: e.target.value, lastNameError: '' });
											// }}
											value={this.state.lastName}
										/>
										<small className='text-danger'>{this.state.lastNameError}</small>
									</div>

									{/* age */}
									<div className='mb-3'>
										<Form.Label htmlFor='age' className='form-label'>
											Age
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='age'
											disabled
											// onChange={(e) => {
											// 	this.setState({ age: e.target.value, ageError: '' });
											// }}
											value={this.state.age}
										/>
										<small className='text-danger'>{this.state.ageError}</small>
									</div>

									{/* dateOfJoining */}
									<div className='mb-3'>
										<Form.Label htmlFor='dateOfJoining' className='form-label'>
											dateOfJoining
										</Form.Label>
										<Form.Control
											type='date'
											className='form-control form-control-sm'
											id='dateOfJoining'
											disabled
											// onChange={(e) => {
											// 	let date = new Date(e.target.value);
											// 	date = date.toISOString().substring(0, 10);
											// 	console.log(date);
											// 	this.setState({ dateOfJoining: date, dateOfJoiningError: '' });
											// }}
											value={this.state.dateOfJoining}
										/>
										<small className='text-danger'>{this.state.dateOfJoiningError}</small>
									</div>

									{/* title */}
									<div className='mb-3'>
										<Form.Label htmlFor='title' className='form-label'>
											Title
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='title'
											onChange={(e) => {
												this.setState({ title: e.target.value, titleError: '' });
											}}
											value={this.state.title}
										/>
										<small className='text-danger'>{this.state.titleError}</small>
									</div>

									{/* department */}
									<div className='mb-3'>
										<Form.Label htmlFor='department' className='form-label'>
											Department
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='department'
											onChange={(e) => {
												this.setState({ department: e.target.value, departmentError: '' });
											}}
											value={this.state.department}
										/>
										<small className='text-danger'>{this.state.departmentError}</small>
									</div>

									{/* employeeType */}
									<div className='mb-3'>
										<Form.Label htmlFor='employeeType' className='form-label'>
											Employee type
										</Form.Label>

										<Form.Select
											className='form-select'
											aria-label='Select employee type'
											id='employeeType'
											disabled
											value={this.state.employeeType}>
											<option value='FullTimeEmployee'>Full time employee</option>
											<option value='PartTimeEmployee'>Part time employee</option>
											<option value='ConractEmployee'>Contract employee</option>
											<option value='SeasonalEmployee'>Seasonal employee</option>
										</Form.Select>
										<small className='text-danger'>{this.state.employeeTypeError}</small>
									</div>

									{/* currentStatus */}
									<div className='mb-3 form-check'>
										{/* <Form.Label htmlFor='currentStatus' className='form-label'>
											Working currently
										</Form.Label> */}
										<Form.Check
											inline
											label='Working currently'
											name='currentStatus'
											type={'checkbox'}
											className='ps-0'
											id='currentStatus'
											checked={this.state.currentStatus}
											onChange={(e) => {
												console.log(e.target.checked);
												this.setState({ currentStatus: e.target.checked });
											}}
										/>
									</div>

									<Button type='submit' className='btn btn-primary'>
										Submit
									</Button>
								</Form>
							</CardBody>
							
							</Card>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
