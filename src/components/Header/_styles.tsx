import styled from 'styled-components';

const Container = styled.header`
	height: 9rem;
	display: flex;
	background: ${({ theme }) => theme.colors.blue500};

	> section {
		margin: auto 0;
		margin-left: auto;

		> button {
			margin: 0 0.5rem;
		}
	}
`;


export const HeaderStyles = {
	Container
};