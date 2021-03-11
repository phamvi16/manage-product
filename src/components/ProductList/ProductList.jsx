import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Axios from 'axios';
import 'antd/dist/antd.css';

function ProductList() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		await Axios.get('http://localhost:4000/productList').then((resp) => {
			setLoading(false);
			setProducts(
				resp.data.map((row) => ({
					productName: row.productName,
					supplierName: row.supplierName,
					productId: row.productId,
					supplierId: row.supplierId,
				}))
			);
		});
	};

	// const productList = async () => {
	// 	const fetchItems = async () => {
	// 		const data = await fetch('http://localhost:4000/productList');
	// 		console.log(data);
	// 	};
	// };

	const onDeleteProduct = (id) => {
		const fetchItems = async () => {
			const resp = await fetch('http://localhost:4000/productList');
			const data = resp.json();
			console.log('data', data);
		};
		console.log(id);
	};

	const columns = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
			width: '30%',
		},
		{
			title: 'Tên nhà sản xuất',
			dataIndex: 'supplierName',
			key: 'supplierName',
			width: '20%',
		},

		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (_value, record) => {
				return (
					<div className="site-button-ghost-wrapper">
						<Button type="primary">Chi tiết</Button>
						<Button>Sửa</Button>
						<Button type="danger" onClick={() => onDeleteProduct(record.productId)}>
							Xóa
						</Button>
					</div>
				);
			},
		},
	];

	const [select, setSelect] = useState({
		selectedRowKeys: [],
	});

	// console.log('selectedRowKeys', select.selectedRowKeys);

	const { selectedRowKeys } = select;

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys) => {
			setSelect({
				...select,
				selectedRowKeys: selectedRowKeys,
			});
		},
	};

	return (
		<div>
			<h1>Product List</h1>

			<Table rowSelection={rowSelection} columns={columns} dataSource={products} dataIndex="productId" />
		</div>
	);
}

export default ProductList;
