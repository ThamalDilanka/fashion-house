import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginModule from '../components/LoginModule/LoginModule';
import SignupModule from '../components/SignupModule/SignupModule';

const Authenticator = (props) => {
	return (
		<React.Fragment>
			<Switch>
				<Route path='/authenticator/login' component={LoginModule} />
				<Route path='/authenticator/signup' component={SignupModule} />
			</Switch>
		</React.Fragment>
	);
};

export default Authenticator;
