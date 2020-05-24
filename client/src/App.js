import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Session from './util/Session'
import './App.css';

// Components
import ReactNotification from 'react-notifications-component';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';

// Containers
import Home from './containers/Home';
import Cart from './containers/Cart';
import WishList from './containers/WishList';
import ProductView from './containers/ProductView';
import ShowCase from './containers/ShowCase';
import StoreManager from './containers/StoreManger';
import Authenticator from './containers/Authenticator';
import Admin from './containers/Admin';
import Payment from './containers/Payment';

// Contexts
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { FavouritesProvider } from './contexts/FavouritesContext';

function App() {
	return (
		<AuthProvider>
			<FavouritesProvider>
				<CartProvider>
					<div className='App'>
						<BrowserRouter>
							<NavBar />
							<ReactNotification />
							<Switch>
								<Route path='/' exact component={Home} />
								<Route path='/authenticator' component={Authenticator} />
								
								<Route path='/cart' component={Cart} />
								<Route path='/wish-list' component={WishList} />
								<Route path='/payment' component={Payment} />
								
								<Route path='/product-view' component={ProductView} />
								<Route path='/show-case' component={ShowCase} />

								<Route path='/store-manager' component={StoreManager} />
								<Route path='/admin' component={Admin} />

								<Route path='/' component={NotFound} />
							</Switch>
						</BrowserRouter>
					</div>
				</CartProvider>
			</FavouritesProvider>
		</AuthProvider>
	);
}

export default App;
