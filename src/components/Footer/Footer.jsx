import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const StyleFooter = styled.div`
	height: 96px;
	background-color: gray;
`;
function Footer() {
	return (
		<Layout>
			<StyleFooter>Footer</StyleFooter>
		</Layout>
	);
}

export default Footer;
