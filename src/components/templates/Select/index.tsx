import styled from "styled-components";

export const Select = styled.select`
	background-color: ${({ theme }) => theme.colors.white};
	
	height: 5rem;
	width: 100%;

	padding: 1rem;

	border: 1px solid ${({ theme }) => theme.colors.blue500};
	border-radius: 6px;	

	color: ${({ theme }) => theme.colors.gray800};
`;