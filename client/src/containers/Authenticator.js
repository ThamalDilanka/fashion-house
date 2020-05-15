import React from 'react';
import { useLocation, Route } from 'react-router-dom';

import LoginModule from '../components/LoginModule/LoginModule';
import SignupModule from '../components/SignupModule/SignupModule';


const Authenticator = (props) => {

	console.log(useLocation().pathname.startsWith('/authenticator/login'));
	return (
		<React.Fragment>
			{
				useLocation().pathname.startsWith('/authenticator/login') ? (<LoginModule/>) : (<SignupModule/>)
			}
		</React.Fragment>
		
		
	);
};

export default Authenticator;
