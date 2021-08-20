import { keyframes } from "styled-components";

export const loadFromRight = keyframes`
	from {
		opacity: 0;
		transform: translateX(100%);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const loadFromLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(-100%);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const loadPageFromRight = keyframes`
	from {
		position: fixed;
		opacity: 0;
		transform: translateX(100%);
	}
	to {
		position: fixed;
		opacity: 1;
		transform: translateX(0);
	}
`;

export const loadPageFromLeft = keyframes`
	from {
		position: fixed;
		transform: translateX(-100%);
	}
	to {
		position: fixed;
		transform: translateX(0);
	}
`;

export const loadFromBottom = keyframes`
	from {
		opacity: 0;
		transform: translateY(100%);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;