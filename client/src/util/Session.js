const jwtDecode = require('jwt-decode');

exports.isLoggedIn = () => {
	if (localStorage.getItem('token') === null) {
		return false;
	} else {
		return true;
	}
};

exports.getToken = () => {
	return localStorage.getItem('token');
};

exports.getId = () => {
	if (localStorage.getItem('token') === null) {
		return null;
	} else {
		return jwtDecode(localStorage.getItem('token'))._id;
	}
};

exports.getName = () => {
	if (localStorage.getItem('token') === null) {
		return null;
	} else {
		return jwtDecode(localStorage.getItem('token')).name;
	}
};

exports.getRole = () => {
	if (localStorage.getItem('token') === null) {
		return null;
	} else {
		return jwtDecode(localStorage.getItem('token')).role;
	}
};

exports.getEmail = () => {
	if (localStorage.getItem('token') === null) {
		return null;
	} else {
		return jwtDecode(localStorage.getItem('token')).email;
	}
};

exports.getImage = () => {
	if (localStorage.getItem('token') === null) {
		return null;
	} else {
		return jwtDecode(localStorage.getItem('token')).image;
	}
};
