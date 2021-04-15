import styled, { css } from 'styled-components';

interface IButtonProps {
	variant?: 'primary' | 'secondary';
}

export const Button = styled.button<IButtonProps>`
	
	height: 5rem;

	padding: 0 1.5rem;

	border: 0;
	border-radius: 6px;
	
	${({ theme, variant }) => {
		if (variant === 'secondary') {
			return css`
				background-color: ${theme.colors.white};
				color: ${theme.colors.blue600};
			`;
		}
		return css`
				background-color: ${theme.colors.blue500};
				color: ${theme.colors.white};
			`;
	}};

`;