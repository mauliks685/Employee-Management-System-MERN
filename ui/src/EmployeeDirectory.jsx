import EmployeeTable from './EmployeeTable.jsx';
import graphQLFetch from './GraphQLFetch.js';

export default class EmployeeDirectory extends React.Component {
	constructor(props) {
		super(props);

		this.getEmployees = this.getEmployees.bind(this);
		this.state = { employees: [] };
	}

	async getEmployees() {
		const query = `
			query {
				employeeList {
					_id firstName lastName age dateOfJoining title department employeeType currentStatus retirementDate monthsTillRetirement
				}
			}
		`;

		const data = await graphQLFetch(query);
		console.log(data);
		if (data) {
			this.setState({ employees: data.employeeList });
		}
	}

	async componentDidMount() {
		await this.getEmployees();
	}

	render() {
		return (
			<div>
				<EmployeeTable employees={this.state.employees} />
			</div>
		);
	}
}
