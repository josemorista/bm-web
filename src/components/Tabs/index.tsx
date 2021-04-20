import styled, { css } from 'styled-components';

interface ITabProps {
	isActive: boolean;
}

export const Tab = styled.button<ITabProps>`
	height: 5rem;
	padding: 0 1.5rem;

	border: 0;
	
	background-color: ${({ theme }) => theme.colors.blue500};
	color: ${({ theme }) => theme.colors.white};

	padding: 1.5rem;
	
	${({ isActive, theme }) => !isActive && css`
		background-color: transparent;
		border: 1px solid ${theme.colors.blue500}}
		color: ${theme.colors.blue500};
	`};

	&:hover {
		filter: brightness(0.9);
	}
`;

export const Tabs = styled.ul`
	display: flex;

	li:first-child {
		border-top-left-radius: 6px;
	}

	li:last-child {
		border-top-right-radius: 6px;
	}

`;