import styled from "styled-components";

interface ICheckboxContainerProps {
	checked: boolean;
}

const Container = styled.div<ICheckboxContainerProps>`
	display: flex;
	align-items: center;

	margin-top: 1rem;

	.checkboxMask {
		margin-right: 1rem;
		position: relative;

		width: 3rem;
		height: 3rem;

		border: 1px solid ${({ theme }) => theme.colors.blue500};
		background-color: ${({ theme }) => theme.colors.white};

		border-radius: 6px;

		svg {
			display: ${({ checked }) => checked ? "block" : "none"};
			position: absolute;
			left: 50%;
			right: 50%;
			top: 50%;
			bottom: 50%;
			transform: translate(-50%,-50%);

			font-size: 2.2rem;
			color: ${({ theme }) => theme.colors.blue500};
		}

	}

	input {
		cursor: pointer;
		opacity: 0;
		height: 100%;
		width: 100%;
	}

	label {
		color: ${({ theme }) => theme.colors.white};
	}

`;

export const CheckboxStyles = {
	Container
};