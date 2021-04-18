import { keyframes } from 'styled-components';

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