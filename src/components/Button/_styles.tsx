import styled, { css } from 'styled-components';

interface IButtonProps {
	variant: 'primary' | 'secondary';
}

export const Container = styled.button<IButtonProps>`

	height: 5rem;
	padding: 0 1.5rem;

	border: 0;
	border-radius: 6px;
	
	${({ theme, variant }) => {
		if (variant === 'secondary') {
			return css`
				background-color: ${theme.colors.white};
				color: ${theme.colors.blue500};
			`;
		}
		return css`
				background-color: ${theme.colors.blue500};
				color: ${theme.colors.white};
			`;
	}};

	transition: filter .5s;

	&:hover {
		filter: brightness(0.7);
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

`;


export const ButtonStyles = {
	Container
};