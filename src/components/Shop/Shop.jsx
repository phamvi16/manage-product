import React, { useState, useEffect, axios } from 'react';
import { Link } from 'react-router-dom';
function Shop() {
	// const [items, setItems] = useState([]);
	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		const resp = await fetch('http://localhost:4000/productList');
	// 		const data = await resp.json();
	// 		console.log(data);
	// 	};
	// 	fetchProducts();
	// }, []);
	// const fetchItems = async () => {
	// 	const data = await fetch('http://localhost:4000/productList');
	// 	// setItems(items.data);
	// 	console.log(data);
	// };

	return (
		<div>
			{/* {items.map((item) => (
				<h1 key={item.id}>
					<Link to={`/shop/${item.id}`}>{item.name}</Link>
				</h1>
			))} */}
			<h1>Shop Page</h1>
		</div>
	);
}

export default Shop;
