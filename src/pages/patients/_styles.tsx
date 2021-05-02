import styled from 'styled-components';

const Container = styled.main`
	main {
		margin: 2rem auto;
		max-width: 1800px;

		@media (max-width: 1800px) {
			margin: 2rem;
		}

		> h1 {
			margin: 3rem 0	;

			font-size: 4.5rem;
			font-weight: 400;
			color: ${({ theme }) => theme.colors.blue500};
		}

		> section {
			&:first-of-type {
				max-width: 500px;
				margin-bottom: 3rem;
			}
		}

		ul {
			border: 1px solid ${({ theme }) => theme.colors.blue500};
			border-radius: 6px;
			padding: 2rem;
			margin-bottom: 3rem;
		}

		.addPatientButtonContainer {
			
			display: flex;
			justify-content: flex-end;

			> button {
				svg {
					width: 2rem;
					height: 2rem;
				}
			}
		}
	}
`;

const PatientListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	cursor: pointer;

	padding: 2rem 0;
	
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

const NewOrEditPatientModal = styled.div`
	
	h1 {
		color: ${({ theme }) => theme.colors.blue500};
		border-bottom: 1px solid ${({ theme }) => theme.colors.blue500};
		margin-bottom: 1rem;
	}

	input,
	select,
	textarea,
	button {
		margin-top: 1rem;	 
	}

	.submitButtonContainer {
		display: flex;
		justify-content: flex-end;
	}

`;

export const MyPatientsStyles = {
	Container,
	PatientListItem,
	NewOrEditPatientModal
};