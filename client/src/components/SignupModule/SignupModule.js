import React from 'react';
import { Link } from 'react-router-dom'
import './SignupModule.css'

const SignupModule = (props) => {
	return (
		<div className="container signup-container card">
        <div className="row">
          <div className="signup-image-container col-md d-none d-sm-none d-md-block" style={{backgroundImage: `url(./images/web/margo-robbi-margot-robbie-blondinka-krasotka-stoit-u-steny-v.jpg)`}}>
          </div>
          <div className="signup-form-body col-md">
            <h2>Signup</h2><hr/>
            <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">First Name</label>
                    <input type="text" className="form-control" placeholder="First Name"/>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="inputPassword4">Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name"/>
                  </div>
                </div>
                <div className="form-group">
                  <label for="inputAddress">Email</label>
                  <input type="email" className="form-control" placeholder="Email Address"/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="inputEmail4">Password</label>
                    <input type="password" className="form-control" placeholder="Create new password"/>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="inputPassword4">Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Re enter the password"/>
                  </div>
                </div>
				<div className="form-group">
					<a href="">Already have an account?</a>
                </div>
                <button type="submit" className="btn btn-primary float-right">Sign in</button>
              </form>
          </div>
        </div>
      </div>
	);
};

export default SignupModule;