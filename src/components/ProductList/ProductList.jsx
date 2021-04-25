import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Table, Input, Button, Space, Form, Icon } from 'antd';
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
	const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [newProductName, setNewProductName] = useState('');
	const [newSupplierName, setNewSupplierName] = useState('');
	const [productObj, setProductObj] = useState({});
	const [isCreate, setIsCreate] = useState(true);
	const [currentId, setCurrentId] = useState('');
	const [searchResults, setSearchResults] = useState({});
	const [form] = Form.useForm();
	const { getFieldProductName } = form;

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

	const addNewProduct = async () => {
		const newItem = { productName: newProductName, supplierName: newSupplierName, supplierId: Date.now() };
		console.log('product', newItem);
		const resp = await api.post('/products', newItem);

		setProducts([...products, newItem]);
		setIsCreateModalVisible(false);
	};

	const onDeleteProduct = async (id) => {
		const resp = await api.delete(`/products/${id}`);
		const newList = products.filter((x) => x.id !== id);
		setProducts(newList);
		console.log(id);
	};

	// const getProductById = async (id) => {
	// 	const resp = await api.get(`/products/${id}`);
	// 	if (resp) {
	// 		setProductObj(resp.data);
	// 		isShowCreateModal();
	// 		setIsCreate(false);
	// 	}
	// };

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false,
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
	});

	const columns = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
			width: '30%',
			getColumnSearchProps(productName)
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
						<Button onClick={() => isShowUpdateModal(record.id)}>Sửa</Button>
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
	const onShowCreate = () => {
		isShowCreateModal();
		setIsCreate(true);
	};

	const handleOk = () => {
		setIsCreateModalVisible(false);
	};

	const handleCancel = () => {
		setIsCreateModalVisible(false);
	};

	//Set value when form data change

	//update product
	const isShowUpdateModal = async (id) => {
		// get product detail
		setCurrentId(id);
		const resp = await api.get(`/products/${id}`);
		const { productName, supplierName } = resp.data;
		// bind product information into form
		form.setFieldsValue({
			productName,
			supplierName,
		});
		// const value = { productName: productName, supplierName: supplierName };
		// // show modal update
		setIsUpdateModalVisible(true);
	};

	const updateProduct = async () => {
		const newValue = form.getFieldsValue();
		const resp = await api.put(`/products/${currentId}`, newValue);
		console.log('resp', resp.data);
		setProductObj(resp.data);
		setIsUpdateModalVisible(false);
		const cloneProducts = [...products];
		const index = cloneProducts.findIndex((i) => i.id === currentId);
		console.log('index', index);
		cloneProducts.splice(index, 1, resp.data);
		setProducts(cloneProducts);

		// update item in array
		// const exArr = [1, 2, 3, 4, 5];
		// change 3 -> 9
		// tìm index của item cần thay thế
		// const index = exArr.findIndex((i) => i === 3);

		// thay item với index và giá trị mới
		// exArr.splice(index, 1, 9);
	};

	const handleOkUpdate = () => {
		setIsUpdateModalVisible(false);
	};

	const handleCancelUpdate = () => {
		setIsUpdateModalVisible(false);
	};

	// const handleCreateNewProduct = () => {
	// 	setIsCreateModalVisible(false);
	// };
	// const { Search } = Input;
	// const handleSearchProduct = async (searchValue) => {
	// 	debugger;
	// 	const resp = await api.get(`/products/${searchValue}`);
	// 	const { data } = resp;
	// 	console.log('data', data);
	// 	let productName = data.map((x) => x.productName);
	// 	console.log('productName', productName);
	// 	const results = productName.filter((item) => {
	// 		item.toLowerCase().includes(searchValue);
	// 	});

	// 	console.log('results', results[0]);
	// 	// let search = data.find(x => x.)
	// 	// console.log('results', data);
	// };

	return (
		<div>
			<h1>Product List</h1>
			<div style={{ width: '300px', marginLeft: '2em' }}>
				{/* <Input.Search placeholder="Tên sản phẩm" enterButton onSearch={handleSearchProduct} /> */}
			</div>

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
							Thêm
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Basic Modal"
				visible={isUpdateModalVisible}
				onOk={handleOkUpdate}
				onCancel={handleCancelUpdate}
				footer={null}
			>
				<Form form={form}>
					<Form.Item label="Tên sản phẩm" name="productName">
						<Input defaultValue={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
					</Form.Item>
					<Form.Item label="Nhà sản xuất" name="supplierName">
						<Input value={newSupplierName} onChange={(e) => setNewSupplierName(e.target.value)} />
					</Form.Item>

					<Form.Item>
						<Button type="primary" onClick={updateProduct}>
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default ProductList;
