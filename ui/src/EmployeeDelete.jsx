import React from 'react';
import graphQLFetch from './GraphQLFetch';

export default class EmployeeDelete extends React.Component {
	constructor(props) {
		super(props);

		const query = `
			query {
				employeeDetail(_id: "${props.match.params.id}") {
					_id firstName lastName age dateOfJoining title department employeeType currentStatus
				}
			}
		`;

		graphQLFetch(query).then(async (data) => {
			const employee = data.employeeDetail;
			console.log('Look', employee);

			const deleteQuery = `
    			mutation employeeDelete($employee: EmployeeInputs) {
    				employeeDelete(employee: $employee) {
    					_id firstName lastName age dateOfJoining title department employeeType currentStatus
    				}
    			}
    		`;

			data = await graphQLFetch(deleteQuery, { employee });

			if (data) {
				console.log('Data', data);
				alert('Successfully deleted an employee!');
				this.props.history.push('/');
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				<p>Please wait!</p>
			</React.Fragment>
		);
	}
}
