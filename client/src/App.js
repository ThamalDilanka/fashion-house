import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/NavBar/NavBar';

// Containers
import Home from './containers/Home';
import Cart from './containers/Cart';
import WishList from './containers/WishList';
import ProductView from './containers/ProductView';
import ShowCase from './containers/ShowCase';
import StoreManager from './containers/StoreManger'
import Authenticator from './containers/Authenticator';

function App() {
	return (
		<div className='App'>
		
		<BrowserRouter>
      	<NavBar />
        
		        <Route path='/manager' exact component={StoreManager} />

				<Route path='/' exact component={Home} />

				<Route path='/authenticator' component={Authenticator}/>

				<Route path='/cart' component={Cart} />

				<Route path='/wish-list' component={WishList} />

				<Route path='/product-view' component={ProductView} />

				<Route path='/show-case' component={ShowCase} />

			</BrowserRouter>
		</div>
	);
}

export default App;
