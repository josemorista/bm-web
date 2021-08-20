import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { Button } from "../../components/templates/Button";
import { Input } from "../../components/templates/Input";
import { ROUTES } from "../../consts";
import { UserServicesFactory } from "../../domain/modules/users/factories/UserServicesFactory";
import { withAuth } from "../../hocs";
import { useToastMessage } from "../../hooks/useToastMessage";
import { ForgotPatientStyles } from "../../styles/pages/forgotPassword";

const forgotPasswordService = UserServicesFactory.createForgotPasswordService();

function ForgotPassword() {

	const { handleSubmit, register } = useForm();
	const { setToastMessage } = useToastMessage();

	const onSubmit = async (data: { email: string }) => {
		try {
			await forgotPasswordService.execute(data);
			setToastMessage({
				message: "All done, check your mail box!",
				type: "success"
			});
			Router.push(ROUTES.HOME);
		} catch (error) {
			setToastMessage({
				message: error.message,
				type: "error"
			});
		}
	};

	return <div>
		<Head>
			<title>ForgotPassword | BoneMetastasis</title>
		</Head>
		<ForgotPatientStyles.Container>
			<header>
				<img src="/assets/imgs/png/uffLogo.png" alt="UFF" />
				<img src="/assets/imgs/png/huapLogo.png" alt="HUAP" />
			</header>
			<main>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1>Lost your password? Don’t worry, we got you cover!</h1>
					<p>
						We will send you an email with detailed instructions to <strong>redefine your password.</strong>
					</p>
					<Input type="email" placeholder="Email" {...register("email")}></Input>
					<Link href={ROUTES.HOME}>
						<a>Want to try again? SignIn</a>
					</Link>
					<Button type="submit" ariaLabel="Forgot password button">Send</Button>
				</form>
			</main>
		</ForgotPatientStyles.Container>
	</div>;
}

export default withAuth(ForgotPassword, { strictPrivate: false, strictPublic: true });