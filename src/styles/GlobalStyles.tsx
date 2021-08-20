import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		background-color: transparent;
		box-shadow: none;
		box-sizing: border-box;
		outline: 0;
	}

	html {
		font-size: 62.5%;
		@media (max-width: 460px) {
			font-size: 56.25%;
		}
	}

	body {
		background-color: ${({ theme }: any) => theme.colors.gray800};
	}

	p,
	span,
	body,
	div,
	h6,
	strong,
	time,
	button,
	a,
	input,
	textarea,
	select,
	legend {
		font-family: Ubuntu, sans-serif;
		font-size: 1.6rem;
		font-weight: 400;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	strong {
		font-weight: 700;
	}

	h1 {
		font-size: 3.2rem;
	}

	h2 {
		font-size: 2.4rem;
	}

	h3 {
		font-size: 2rem;
	}

	h4 {
		font-size: 1.9rem;
	}

	h5 {
		font-size: 1.8rem;
	}

	h6 {
		font-size: 1.7rem;
	}

	a {
		text-decoration: none;
	}

	button {
		cursor: pointer;
		font-weight: 700;
	}

	ul,
	li {
		list-style: none;
	}

`;