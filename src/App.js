import React, { useEffect } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import ProductList from './components/ProductList/ProductList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Shop from './components/Shop/Shop';
import Item from './components/Shop/ItemDetail';

import Highlighter from 'react-highlight-words';
import { Button } from 'antd';
import 'antd/dist/antd.css';

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
