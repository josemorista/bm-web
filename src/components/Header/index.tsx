import { useAuthentication } from "../../hooks/useAuthentication";
import { Button } from "../templates/Button";
import { HeaderStyles } from "./_styles";
import { useRouter } from "next/router";
import { ROUTES } from "../../consts";
import { useTranslation } from "../../hooks/useTranslation";

export const Header = () => {

	const { logout } = useAuthentication();
	const router = useRouter();
	const { t } = useTranslation();

	return <HeaderStyles.Container>
		<section>
			<Button ariaLabel="Go to homepage" onClick={() => {
				router.push(ROUTES.MY_PATIENTS);
			}} variant='secondary'>{t("Home")}</Button>
			<Button ariaLabel="Logout" onClick={() => {
				logout();
			}} variant='secondary'>{t("Logout")}</Button>
		</section>
	</HeaderStyles.Container>;
};