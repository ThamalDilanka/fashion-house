import React from 'react';
import { Link } from 'react-router-dom'
import './LoginModule.css'

const LoginModule = (props) => {
	return (
		<div className="container signup-container card">
        <div className="row">
          <div className="signup-image-container col-md d-none d-sm-none d-md-block" style={{backgroundImage: `url(./images/web/happy-beautiful-young-woman-blue-dress-with-his-hand-holding-shopping-bags-finger-pointing-light-blue-with-copy-space_74952-576.jpg)`}}>
          </div>
          <div className="signup-form-body col-md">
			<br/><br/><br/><br/>
            <h2>Login</h2><hr/>
            <form>
				<div className="form-group">
                  <label for="inputAddress">Email</label>
                  <input type="email" className="form-control" placeholder="Email Address"/>
                </div>
                <div className="form-group">
                  <label for="inputAddress">Password</label>
                  <input type="password" className="form-control" placeholder="Password"/>
                </div>
				<div className="form-group">
					<a href="">I don't have an account?</a>
                </div>
                <button type="submit" className="btn btn-primary float-right">Login</button>
				<br/><br/><br/><br/>
              </form> 
          </div>
		 
        </div>
      </div>
	);
};

export default LoginModule;