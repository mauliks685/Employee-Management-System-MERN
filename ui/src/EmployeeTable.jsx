import { Modal, Button, Row, Col, Form, Table } from 'react-bootstrap';

export default class EmployeeTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = { employeeType: 'All', upcomingRetirement: false, modalShow: false, modalContent: false, modalTitle: '', modalAction: () => {} };
	}

	render() {
		return (
			<React.Fragment>
				{/* Modal */}
				<div className='model show'>
					<Modal show={this.state.modalShow}>
						<Modal.Header>
							<Modal.Title>{this.state.modalTitle}</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<p>{this.state.modalContent}</p>
						</Modal.Body>

						<Modal.Footer>
							<Button
								variant='danger'
								onClick={() => {
									this.setState({ ...this.state, modalShow: false });
								}}>
								Close
							</Button>
							<Button variant='dark' onClick={this.state.modalAction}>
								Okay
							</Button>
						</Modal.Footer>
					</Modal>
				</div>

				<div className='d-flex justify-content-center mt-5 mb-3'>
					<h1 className='p-2'>Employees</h1>
				</div>

				{/* EmployeeType filter */}
				<div className='mb-3'>
					<Row className='row justify-content-end'>
						<h6><b>Filter:</b></h6>
						<Col className='d-flex align-items-center' sm={12} xs={12} md={6} lg={8}>
							<Form.Label className='form-label me-2 mb-0' htmlFor='employeeType'>Employee type</Form.Label>
							<Form.Select
								className='form-select w-auto'
								aria-label='Select employee type'
								id='employeeType'
								value={this.state.employeeType}
								onChange={(e) => {
									this.setState({ ...this.state, employeeType: e.target.value });
								}}>
								<option value='All'>All</option>
								<option value='FullTimeEmployee'>Full time employee</option>
								<option value='PartTimeEmployee'>Part time employee</option>
								<option value='ConractEmployee'>Contract employee</option>
								<option value='SeasonalEmployee'>Seasonal employee</option>
							</Form.Select>
							<small className='text-danger'>{this.state.employeeTypeError}</small>
						</Col>

						<Col sm={12} xs={12} md={6} lg={4}>
							<div className='form-check text-end'>
								<Form.Check
									inline
									label='Only show retiring employees'
									className='ps-0'
									type='checkbox'
									value=''
									checked={this.state.upcomingRetirement}
									// id='flexCheckDefault'
									onChange={(e) => {
										this.setState({ ...this.state, upcomingRetirement: e.target.checked });
									}}
								/>
							</div>
						</Col>
					</Row>
				</div>

				{/* Employee Table */}
				<Table variant='light' bordered striped responsive>
					<thead className='table-primary'>
						<tr>
							<th scope='col'>First name</th>
							<th scope='col'>Last name</th>
							<th scope='col'>Age</th>
							<th scope='col'>Date of joining</th>
							<th scope='col'>Title</th>
							<th scope='col'>Department</th>
							<th scope='col'>Type</th>
							<th scope='col'>Status</th>
							<th scopr='col'>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.employees.map((employee) => {
							if (
								this.state.employeeType == 'All' &&
								(this.state.upcomingRetirement ? employee.monthsTillRetirement <= 20 && employee.currentStatus : true)
							) {
								return (
									<tr key={employee._id}>
										<td>{employee.firstName}</td>
										<td>{employee.lastName}</td>
										<td>{employee.age}</td>
										<td>{String(employee.dateOfJoining)}</td>
										<td>{employee.title}</td>
										<td>{employee.department}</td>
										<td>{employee.employeeType}</td>
										<td>{employee.currentStatus ? 'Working' : 'Retired'}</td>
										<td>
											<a className='btn btn-sm btn-dark m-1' href={'/#/profile/' + employee._id}>
												Profile
											</a>
											<a className='btn btn-sm btn-dark m-1' href={'/#/edit/' + employee._id}>
												Edit
											</a>
											<Button
												className='btn btn-sm btn-dark m-1'
												onClick={() => {
													// employee status validation
													if (employee.currentStatus) {
														this.setState({
															...this.state,
															modalShow: true,
															modalContent: 'Active employee cannot be deleted!',
															modalTitle: 'Wait!',
															modalAction: () => {
																this.setState(
																	() => {
																		return { ...this.state, modalShow: false, modalAction: () => {} };
																	},
																	() => {},
																);
															},
														});
														return;
													}

													this.setState({
														...this.state,
														modalShow: true,
														modalContent: 'Are you sure you want to delete this employee?',
														modalTitle: 'Wait!',
														modalAction: () => {
															this.setState(
																() => {
																	return { ...this.state, modalShow: false };
																},
																() => {
																	setTimeout(() => {
																		window.location = '/#/delete/' + employee._id;
																	}, 1000);
																},
															);
														},
													});
												}}>
												Delete
											</Button>
										</td>
									</tr>
								);
							} else if (
								this.state.employeeType == employee.employeeType &&
								(this.state.upcomingRetirement ? employee.monthsTillRetirement <= 20 && employee.currentStatus : true)
							) {
								return (
									<tr key={employee._id}>
										<td>{employee.firstName}</td>
										<td>{employee.lastName}</td>
										<td>{employee.age}</td>
										<td>{String(employee.dateOfJoining)}</td>
										<td>{employee.title}</td>
										<td>{employee.department}</td>
										<td>{employee.employeeType}</td>
										<td>{employee.currentStatus ? 'Working' : 'Retired'}</td>
										<td>
											<a className='btn btn-sm btn-dark m-1' href={'/#/profile/' + employee._id}>
												Profile
											</a>
											<a className='btn btn-sm btn-dark m-1' href={'/#/edit/' + employee._id}>
												Edit
											</a>
											<Button
												className='btn btn-sm btn-dark m-1'
												onClick={() => {
													// employee status validation
													if (employee.currentStatus) {
														this.setState({
															...this.state,
															modalShow: true,
															modalContent: 'Active employee cannot be deleted!',
															modalTitle: 'Wait!',
															modalAction: () => {
																this.setState(
																	() => {
																		return { ...this.state, modalShow: false, modalAction: () => {} };
																	},
																	() => {},
																);
															},
														});
														return;
													}

													this.setState({
														...this.state,
														modalShow: true,
														modalContent: 'Are you sure you want to delete this employee?',
														modalTitle: 'Wait!',
														modalAction: () => {
															this.setState(
																() => {
																	return { ...this.state, modalShow: false };
																},
																() => {
																	setTimeout(() => {
																		window.location = '/#/delete/' + employee._id;
																	}, 1000);
																},
															);
														},
													});
												}}>
												Delete
											</Button>
										</td>
									</tr>
								);
							} else {
								return '';
							}
						})}
					</tbody>
				</Table>
			</React.Fragment>
		);
	}
}
