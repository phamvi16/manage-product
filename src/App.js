import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import ProductList from './components/ProductList/ProductList';
import Item from './components/Shop/ItemDetail';
import Shop from './components/Shop/Shop';

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<Switch>
					<Route path="/productlist" component={ProductList} />
					<Route path="/shop" exact component={Shop} />
					<Route path="/shop/:id" component={Item} />
					<Route path="/" exact>
						<h1>Home Page</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
