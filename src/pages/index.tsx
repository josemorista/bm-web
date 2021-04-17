import Head from 'next/head';
import Link from 'next/link';

import { HomeStyles } from './_styles';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ROUTES } from '../consts';
import { useToastMessage } from '../hooks/useToastMessage';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { withAuth } from '../hocs';

function Home() {

	const { signIn } = useAuthentication();
	const { setToastMessage } = useToastMessage();
	const { register, handleSubmit } = useForm();

	const onSubmit = useCallback(async (data) => {
		try {
			await signIn(data);
		} catch (error) {
			setToastMessage({
				message: error.message,
				type: 'error'
			});
		}
	}, [setToastMessage, signIn]);

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
						<Input {...register('email')} type="email" placeholder="Email" />
						<Input {...register('password')} type="password" placeholder="Password" />
						<Link href={ROUTES.REGISTER} prefetch>
							<a>Does not have an account? SignIn</a>
						</Link>
						<Button type='submit'>SignIn</Button>
					</form>
				</section>
				<section className="bg"></section>
			</HomeStyles.Container>
		</div>
	);
}

export default withAuth(Home, { strictPublic: true, strictPrivate: false });