export default class EmployeeSearch extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>Employee Search</div>
				<p aria-hidden='true'>
					<span className='placeholder col-6'></span>
				</p>

				<a className='btn btn-dark disabled placeholder col-4 mb-4' aria-disabled='true'></a>
			</React.Fragment>
		);
	}
}
