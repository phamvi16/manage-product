import React from 'react';
import styled, { css } from 'styled-components';

const ButtonsBoxWrapper = styled('div')`
	display: grid;
	grid-gap: 5px;

	grid-template-columns: ${(props: any) => `auto `.repeat(props.children.length ? props.children.length : 1).trim()};

	/* @media only screen and (max-width: 767px) {
    grid-template-columns: auto;
  } */
`;

const ButtonsBox = ({ children, ...props }: any) => <ButtonsBoxWrapper {...props}>{children}</ButtonsBoxWrapper>;

export default ButtonsBox;
