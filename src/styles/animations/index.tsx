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