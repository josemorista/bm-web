import styled from 'styled-components';

interface IExamListItemProps {
	status: 'incomplete' | 'positive' | 'negative';
}

const Container = styled.main`
	> main {
		margin: 2rem auto;
		max-width: 1800px;

		@media (max-width: 1800px) {
			margin: 2rem;
		}

		> h1 {
			margin: 3rem 0;

			font-size: 4.5rem;
			font-weight: 400;
			color: ${({ theme }) => theme.colors.white};
		}

		> h5 {
			color: ${({ theme }) => theme.colors.blue500};
			margin-top: 1rem;
		}
		
		> p {
			margin-top: 1rem;
			color: ${({ theme }) => theme.colors.white};
		}

		.newExamButton {
			margin-top: 2rem;
			display: flex;
			justify-content: flex-end;
		}
	}

`;

const ExamsSection = styled.section`
	
	margin-top: 3rem;

	> ul.examsList {
		padding: 2rem;
		border: 1px solid ${({ theme }) => theme.colors.blue500};
		border-radius: 0 0 6px 6px;
	}
`;

const ExamListItem = styled.li<IExamListItemProps>`
	display: flex;
	cursor: pointer;

	max-height: 600px;
	overflow: auto;

	margin-bottom: 2.5rem;
	padding-bottom: 2rem;
	border-bottom: 1px solid  ${({ theme }) => theme.colors.gray300};

	
	> div {
		&:first-child {
			margin-top: 1.6rem;
		}

		&:last-child {
			margin: 0 2rem;
			
			p {
				color: ${({ theme }) => theme.colors.white};
				& +p {
					margin-top: 1rem;
				}

				&.revisionStatus {
					color: ${({ theme, status }) => {
		if (status === 'positive') {
			return theme.colors.green900;
		}
		if (status === 'negative') {
			return theme.colors.red400;
		}
		return theme.colors.yellow600;
	}};
		}

				> span {
					margin-left: 1rem;
				}

				&.affectedArea {
					span {
						color: ${({ theme, status }) => {
		if (status === 'positive') {
			return theme.colors.green900;
		}
		if (status === 'negative') {
			return theme.colors.red400;
		}
		return theme.colors.yellow600;
	}};
					}
				}
			}
		}
	}
`;


const NewExamModal = styled.div`
	
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

	.dropzoneContainer {
		margin-top: 1rem;

		cursor: pointer;
		
		width: 100%;
		height: 200px;

		display: flex;
		align-items: center;
		justify-content:center;

		border: 1px dashed ${({ theme }) => theme.colors.blue500};

		p {
			color: ${({ theme }) => theme.colors.white};
		}

	}

`;

export const PatientStyles = {
	Container,
	ExamsSection,
	ExamListItem,
	NewExamModal
};