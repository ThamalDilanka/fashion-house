import React from 'react';
import LoginModule from '../components/LoginModule/LoginModule';
import SignupModule from '../components/SignupModule/SignupModule';

const Authenticator = (props) => {
	return (
		<div className="container">
			<LoginModule></LoginModule>
			<SignupModule></SignupModule>
		</div>
	);
};

export default Authenticator;
