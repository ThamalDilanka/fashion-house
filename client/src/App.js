import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/NavBar';

// Containers
import Home from './containers/Home';
import Cart from './containers/Cart';
import WishList from './containers/WishList';
import ProductView from './containers/ProductView';

function App() {
	return (
		<div className='App'>
		
		<BrowserRouter>
      	<NavBar />
        
				<Route path='/' exact component={Home} />

				<Route path='/cart' component={Cart} />

				<Route path='/wish-list' component={WishList} />

				<Route path='/product-view' component={ProductView} />
			</BrowserRouter>
		</div>
	);
}

export default App;
