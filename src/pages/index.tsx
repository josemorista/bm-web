import Head from "next/head";
import Link from "next/link";

import { HomeStyles } from "../styles/pages";

import { Input } from "../components/templates/Input";
import { Button } from "../components/templates/Button";
import { ROUTES } from "../consts";
import { useToastMessage } from "../hooks/useToastMessage";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { withAuth } from "../hocs";
import { useTranslation } from "../hooks/useTranslation";

function Home() {

	const { signIn } = useAuthentication();
	const { setToastMessage } = useToastMessage();
	const { register, handleSubmit } = useForm();
	const { t } = useTranslation();

	const onSubmit = useCallback(async (data) => {
		try {
			await signIn(data);
		} catch (error) {
			setToastMessage({
				message: t(error.message),
				type: "error"
			});
		}
	}, [setToastMessage, signIn, t]);

	return (
		<div>
			<Head>
				<title>Welcome | Bone metastasis</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<HomeStyles.Container>
				<section className="formAndHeader">
					<header>
						<img src="/assets/imgs/png/uffLogo.png" alt="UFF" />
						<img src="/assets/imgs/png/huapLogo.png" alt="HUAP" />
					</header>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input {...register("email")} autoComplete="off" type="email" placeholder="Email" />
						<Input {...register("password")} autoComplete="off" type="password" placeholder={t("Password")} />
						<Link href={ROUTES.REGISTER}>
							<a>{t("Does not have an account? SignUp")}</a>
						</Link>
						{/*<Link href={ROUTES.FORGOT_PASSWORD}>
							<a>Forgot your password?</a>
	</Link>*/}
						<Button ariaLabel="Login" type='submit'>{t("SignIn")}</Button>
					</form>
				</section>
				<section className="bg"></section>
			</HomeStyles.Container>
		</div>
	);
}

export default withAuth(Home, { strictPublic: true, strictPrivate: false });