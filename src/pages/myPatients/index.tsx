import { Button } from '../../components/Button';
import { withAuth } from '../../hocs';
import { useAuthentication } from '../../hooks/useAuthentication';

function MyPatients() {
	const { logout } = useAuthentication();
	return <h1>
		Meus pacientes;
		<Button onClick={() => {
			logout();
		}}>logout</Button>
	</h1>;
}

export default withAuth(MyPatients, { strictPrivate: true });