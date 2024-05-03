import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import About from './About.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';
import EmployeeSearch from './EmployeeSearch.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';
import EmployeeProfile from './EmployeeProfile.jsx';
import EmployeeDelete from './EmployeeDelete.jsx';

const NotFound = () => <h1>Page not found</h1>;

export default function Contents() {
	return (
		<div className='container'>
			<Switch>
				<Redirect exact from='/' to='/employees' />
				<Route path='/employees' component={EmployeeDirectory} />
				<Route path='/search' component={EmployeeSearch} />
				<Route path='/add' component={EmployeeCreate} />
				<Route path='/edit/:id' component={EmployeeEdit} />
				<Route path='/profile/:id' component={EmployeeProfile} />
				<Route path='/delete/:id' component={EmployeeDelete} />
				<Route path='/about' component={About} />

				<Route component={NotFound} />
			</Switch>
		</div>
	);
}
