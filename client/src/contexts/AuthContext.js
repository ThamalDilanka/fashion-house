import React, { createContext, useState } from 'react';
import Session from '../util/Session';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(Session.isLoggedIn());
	return (
		<AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
			{props.children}
		</AuthContext.Provider>
	);
};
