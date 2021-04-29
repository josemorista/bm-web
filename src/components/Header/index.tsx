import { useAuthentication } from '../../hooks/useAuthentication';
import { Button } from '../Button';
import { HeaderStyles } from './_styles';
import { useRouter } from 'next/router';
import { ROUTES } from '../../consts';

export const Header = () => {

	const { logout } = useAuthentication();
	const router = useRouter();

	return <HeaderStyles.Container>
		<section>
			<Button onClick={() => {
				router.push(ROUTES.MY_PATIENTS);
			}} variant='secondary'>Home</Button>
			<Button onClick={() => {
				logout();
			}} variant='secondary'>Logout</Button>
		</section>
	</HeaderStyles.Container>;
};