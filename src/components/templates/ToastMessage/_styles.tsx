import styled, { css } from 'styled-components';
import { loadFromRight } from '../../../styles/animations';

interface IContainerProps {
	variant: 'error' | 'success' | 'info';
}

const Container = styled.div<IContainerProps>`
	position: fixed;
	top: 1rem;
	right: 1rem;

	z-index: 1000;

	display: flex;
	align-items: center;

	padding: 1.6rem;

	border-radius: 6px;

	animation-name: ${loadFromRight};
	animation-duration: .5s;
	animation-fill-mode: backwards;

	color: ${({ theme }) => theme.colors.white};
	
	${({ theme, variant }) => {
		if (variant === 'success') {
			return css`
				background-color: ${theme.colors.green300};
			`;
		}
		if (variant === 'error') {
			return css`
				background-color: ${theme.colors.red300};
			`;
		}
		return css`
				background-color: ${theme.colors.blue500};
			`;
	}}

	svg {
		width: 1.8rem;
		height: 1.8rem;
		margin-right: 0.5rem;
	}	

	p {
		font-size: 1.7rem;
	}
	
`;

export const ToastMessageStyles = {
	Container
};