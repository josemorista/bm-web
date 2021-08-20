import styled from "styled-components";
import { loadFromBottom } from "../../../styles/animations";

const Container = styled.div`
	position: fixed;
	z-index: ${({ theme }) => theme.zIndexDepths.modal};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);

	> .content {
		
		animation-name: ${loadFromBottom};
		animation-duration: .5s;
		animation-fill-mode: backwards;

		width: calc(100% - 4rem);
		max-width: 1024px;
		
		padding: 55px;
		
		border: 1px solid ${({ theme }) => theme.colors.blue500};
		border-radius: 6px;
		
		background-color: ${({ theme }) => theme.colors.gray800};
	}
`;

export const ModalStyles = {
	Container
};