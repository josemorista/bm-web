import styled from 'styled-components';

const Container = styled.div`
	main {
		margin: 2rem auto;
		max-width: 1800px;

		@media (max-width: 1800px) {
			margin: 2rem;
		}

		> header {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			
			margin: 3.5rem 0;

			h1 {
				font-size: 4.5rem;
				font-weight: 400;
				color: ${({ theme }) => theme.colors.blue500};
			}
		}

		> h2 {
			color: ${({ theme }) => theme.colors.white};
			font-weight: 400;
			margin-bottom: 0.5rem;
			margin-top: 2rem;
		}

		> section {

			padding: 1rem;
			border: 1px solid ${({ theme }) => theme.colors.blue500};
			border-radius: 6px;

			&.report {
				> p {
					color: ${({ theme }) => theme.colors.white};
				}
			}

			&.segmentationAndClassification {

				display: flex;
				flex-wrap: wrap;
				
				> ul {
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					align-items: center;

					margin-right: 1rem;

					li {
						margin: 0 0.5rem;
					}
				}
			}
		}

		.segmentationOptions {
			h6, p,legend {
				color: ${({ theme }) => theme.colors.white};
			}

			> section {
				
				margin-bottom: 2rem;

				> h6 {
					font-size: 2rem;
					font-weight: 400;
				}

				&.threshold {
					input {
						margin-top: 1rem;
						width: 100%;
					}
				}

				&.contrast {
					> div {
						display: flex;
						margin-top: 1rem;

						span {

							margin-right: 0.5rem;

							border: 3px solid transparent;

							&.selected {
								border: 3px solid ${({ theme }) => theme.colors.blue500};
							}

							display: block;
							cursor: pointer;

							width: 3rem;
							height: 3rem;

							border-radius: 50%;

							background: white;

							&:last-child {
								background: black;
							}
						}
					}
				}
			}
		}
	}


`;

export const ExamStyles = {
	Container
};