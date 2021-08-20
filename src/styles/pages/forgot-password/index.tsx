import styled from "styled-components";

const Container = styled.main`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 100vh;

	> header {
		display: flex;
		margin: 0.5rem 0;

		> img {
			width: 100px;
			height: 100px;
			
			&:first-of-type {
				width: 200px;
			}
		}
	}

	> main {
		
		flex: 1;
		display: flex;

		justify-content: center;
		align-items: center;

		> form {
			
			display: flex;
			flex-direction: column;

			align-items: center;

			width: 100%;
			max-width: 600px;
			padding: 2rem;


			a, h1, p {
				color: ${({ theme }) => theme.colors.white};
				text-align: center;
			}

			> h1 {
				font-size: 3.4rem;
				margin-bottom: 5rem;
			}

			> p, a, input {
				margin-bottom: 2rem;
			}

			> a {
				display: block;
				text-decoration: underline;
			}

		}
	}
`;

export const ForgotPatientStyles = {
	Container
};