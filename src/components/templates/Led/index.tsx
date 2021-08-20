import styled from "styled-components";

interface ILedProps {
	status: "success" | "error" | "alert";
}

export const Led = styled.div<ILedProps>`
	width: 3rem;
	height: 3rem;

	border-radius: 50%;

	background-color: ${({ theme, status }) => {
		if (status === "success") {
			return theme.colors.green900;
		}
		if (status === "alert") {
			return theme.colors.yellow600;
		}
		return theme.colors.red400;
	}}

`;