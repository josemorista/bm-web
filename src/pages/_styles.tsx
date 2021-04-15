import styled from 'styled-components';

const Container = styled.main`
	display: grid;

	width: 100%;
	height: 100vh;

	overflow-y: auto;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

	section.formAndHeader {
		display: flex;
		flex-direction: column;

		> header {

			display: flex;
			margin: 0.5rem 1rem;

			> img {
				width: 100px;
				height: 100px;
				
				&:first-of-type {
					width: 200px;
				}
			}
		}

		> form {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			> input {
				width: calc(99% - 1rem);
				max-width: 400px;
			}

			> * {
				& + * {
					margin-top: 1rem;
				}
			}

			a {
				display: block;
				color: ${({ theme }) => theme.colors.blue500};
				text-align: center;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	section.bg {
		background: url('/assets/imgs/png/bgHome.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
`;

export const HomeStyles = {
	Container
};


