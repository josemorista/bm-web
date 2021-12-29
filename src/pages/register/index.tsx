import Head from "next/head";
import Link from "next/link";

import { RegisterStyles } from "../../styles/pages/register";

import { Input } from "../../components/templates/Input";
import { Button } from "../../components/templates/Button";
import { ROUTES } from "../../consts";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { withAuth } from "../../hocs";
import { UserServicesFactory } from "../../domain/modules/users/factories/UserServicesFactory";
import { useTranslation } from "../../hooks/useTranslation";

const createUserService = UserServicesFactory.createCreateUserService();

function Register() {

	const router = useRouter();
	const { setToastMessage } = useToastMessage();
	const { register, handleSubmit } = useForm();
	const { t } = useTranslation();

	const onSubmit = useCallback(async (data) => {
		try {
			await createUserService.execute(data);
			setToastMessage({
				message: t("User created"),
				type: "success"
			});
			router.push(ROUTES.HOME);
		} catch (error) {
			setToastMessage({
				message: t(error.message),
				type: "error"
			});
		}
	}, [setToastMessage, router, t]);

	return (
		<div>
			<Head>
				<title>SignUp | Bone metastasis</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<RegisterStyles.Container>
				<section className="bg"></section>
				<section className="formAndHeader">
					<header>
						<img src="/assets/imgs/png/uffLogo.png" alt="UFF" />
						<img src="/assets/imgs/png/huapLogo.png" alt="HUAP" />
					</header>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input {...register("email")} placeholder="Email" type="email" />
						<Input {...register("password")} placeholder={t("Password")} type="password" />
						<Input {...register("firstName")} placeholder={t("Firstname")} type="text" />
						<Input {...register("lastName")} placeholder={t("Lastname")} type="text" />
						<Input {...register("relatedInstitution")} placeholder={t("Institution")} type="text" />
						<Input {...register("job")} placeholder={t("Job")} />
						<Link href={ROUTES.HOME}>
							<a>{t("Already have an account? SignIn")}</a>
						</Link>
						<Button ariaLabel="Submit sign up form" type='submit'>{t("SignUp")}</Button>
					</form>
				</section>
			</RegisterStyles.Container>
		</div>
	);
}

export default withAuth(Register, { strictPublic: true, strictPrivate: false });