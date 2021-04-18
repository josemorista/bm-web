import styled from 'styled-components';

const Container = styled.div`
	position: fixed;
	z-index: ${({ theme }) => theme.zIndexDepths.modal};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);

	> .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 600px;
		padding: 55px;
		background-color: ${({ theme }) => theme.colors.white};
	}
`;

export const ModalStyles = {
	Container
};