import React from 'react';
import graphQLFetch from './GraphQLFetch';
import { Row, Col, Card, CardBody, CardTitle } from 'react-bootstrap';

export default class EmployeeProfile extends React.Component {
	constructor(props) {
		super(props);

		const query = `
			query {
				employeeDetail(_id: "${props.match.params.id}") {
					_id firstName lastName age dateOfJoining title department employeeType currentStatus retirementDate monthsTillRetirement
				}
			}
		`;

		this.state = {
			_id: '',
			firstName: '',
			lastName: '',
			age: 0,
			dateOfJoining: '',
			title: '',
			department: '',
			employeeType: '',
			currentStatus: false,
			monthsTillRetirement: 0,
			retirementDate: '',
		};

		graphQLFetch(query).then((data) => {
			console.log(data);
			const employee = data.employeeDetail;

			this.setState({
				_id: employee._id,
				firstName: employee.firstName,
				lastName: employee.lastName,
				age: employee.age,
				dateOfJoining: employee.dateOfJoining,
				title: employee.title,
				department: employee.department,
				employeeType: employee.employeeType,
				currentStatus: Boolean(employee.currentStatus),
				monthsTillRetirement: employee.monthsTillRetirement,
				retirementDate: employee.retirementDate,
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<Row className='justify-content-center mt-5 mb-5'>
					<Col xs={12} sm={12} md={6} lg={6}>
						<Card className='bg-secondary-subtle'>
							<CardTitle className='bg-primary px-4 py-3'>
								<h2 className='mb-0 text-white'>
									<b>{this.state.firstName}'s Profile</b>
								</h2>
							</CardTitle>

							<CardBody className=' p-4'>
								<p>
									<b>Name: </b>
									{this.state.firstName} {this.state.lastName}
								</p>
								<p>
									<b>Title: </b>
									{this.state.title}
								</p>
								<p>
									<b>Department: </b>
									{this.state.department}
								</p>
								<p>
									<b>Employee type: </b>
									{this.state.employeeType}
								</p>
								<p>
									<b>Age: </b>
									{this.state.age}
								</p>
								<p>
									<b>Date of joining: </b>
									{this.state.dateOfJoining}
								</p>
								<p>
									<b>Current status: </b>
									{this.state.currentStatus ? 'Working' : 'Retired'}
								</p>
								<p>
									<b>Retirement Date: </b>
									{this.state.retirementDate}
								</p>
								<p>
									<b>Months till retirement: </b>
									{this.state.monthsTillRetirement}
								</p>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
