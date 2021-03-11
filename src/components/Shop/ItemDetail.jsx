import React, { useState, useEffect, axios } from 'react';
import { Link } from 'react-router-dom';
function Item() {
	useEffect(() => {
		fetchItem();
	}, []);
	const [item, setItem] = useState({});
	const fetchItem = async () => {
		const data = await fetch(`https://fortnite-api.com/v1/playlists/`);
		const item = await data.json();
		setItem(item.data);
	};

	return (
		<div>
			<h1>Item</h1>
		</div>
	);
}

export default Item;
