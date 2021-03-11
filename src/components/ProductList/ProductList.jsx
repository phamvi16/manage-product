import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Table, Input, Button, Space, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Axios from 'axios';
import 'antd/dist/antd.css';
import Modal from 'antd/lib/modal/Modal';
// import mockData from  '../../../db.json';
import { NewProduct } from './product.models';
import api from '../api/api';

function ProductList() {
	const [products, setProducts] = useState([]);
	const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [newProductName, setNewProductName] = useState('');
	const [newSupplierName, setNewSupplierName] = useState('');
	// retrieve Products
	const retrieveProducts = async () => {
		const resp = await api.get('/products');
		return resp.data;
	};
	useEffect(() => {
		// getData();
		const getAllProducts = async () => {
			const allProducts = await retrieveProducts();
			if (allProducts) setProducts(allProducts);
		};
		getAllProducts();
	}, []);

	const addNewProduct = async (product) => {
		debugger;
		console.log('product', product);
		const request = {
			...product,
		};
		const resp = await api.post('/products', request);

		setProducts([...products, resp.data]);
	};

	const onDeleteProduct = (id) => {
		const fetchItems = async () => {
			const resp = await fetch('http://localhost:4000/product');
			const data = resp.json();
			console.log('data', data);
			data.filter((x) => x.id !== id);
		};
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
						{/* <Button type="primary" onClick={isShowCreateModal}>
							Thêm
						</Button> */}
						<Button type="primary">Chi tiết</Button>
						<Button>Sửa</Button>
						<Button type="danger" onClick={() => onDeleteProduct(record.id)}>
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

	const isShowCreateModal = () => {
		setIsCreateModalVisible(true);
	};

	const handleOk = () => {
		setIsCreateModalVisible(false);
	};

	const handleCancel = () => {
		setIsCreateModalVisible(false);
	};

	// const handleCreateNewProduct = () => {
	// 	setIsCreateModalVisible(false);
	// };

	return (
		<div>
			<h1>Product List</h1>
			<div className="btn-add">
				<Button type="primary" onClick={isShowCreateModal}>
					Thêm sản phẩm
				</Button>
			</div>
			<Table rowSelection={rowSelection} columns={columns} dataSource={products} dataIndex="id" />

			<Modal
				title="Basic Modal"
				visible={isCreateModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form>
					<Form.Item label="Tên sản phẩm" name="productName">
						<Input onChange={(e) => setNewProductName(e.target.value)} />
					</Form.Item>
					<Form.Item label="Nhà sản xuất" name="supplierName">
						<Input onChange={(e) => setNewSupplierName(e.target.value)} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" onClick={addNewProduct}>
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default ProductList;
