import styled from 'styled-components';

const Container = styled.main`
	main {
		margin: 2rem auto;
		max-width: 1800px;

		> h1 {
			margin-bottom: 3rem;

			font-size: 4.5rem;
			font-weight: 400;
			color: ${({ theme }) => theme.colors.blue500};
		}

		> section {
			max-width: 500px;
			margin-bottom: 3rem;
		}

		ul {
			border: 1px solid ${({ theme }) => theme.colors.blue500};
			border-radius: 6px;
			padding: 2rem;
		}
	}
`;

const PatientListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	padding-bottom: 2rem;
	
	border-bottom: 1px solid  ${({ theme }) => theme.colors.gray300};		

	> section {
		&:first-child  {
			display: flex;

			.patientInitial {
				display: flex;
				justify-content: center;
				align-items: center;

				width: 12rem;
				height: 12rem;

				margin-right: 1rem;

				border-radius: 6px;

				background: ${({ theme }) => theme.colors.blue500};

				h1 {
					font-size: 4rem;
					color: ${({ theme }) => theme.colors.white};
				}
			}

			strong {
				color: ${({ theme }) => theme.colors.blue500};
			}

			h4,
			p {
				color: ${({ theme }) => theme.colors.white};
			}
		}

		&:last-child {
			button {
				border: 0;
				margin: 0 0.2rem;

				> svg {
					color: ${({ theme }) => theme.colors.blue500};
					width: 3rem;
					height: 3rem;
				}

				&:last-child {
					svg {
						color: ${({ theme }) => theme.colors.red400};
					}
				}

				transition: transform 0.5s;

				&:hover {
					transform: scale(1.2, 1.2);
				}
			}
		}
	}
`;


export const MyPatientsStyles = {
	Container,
	PatientListItem
};