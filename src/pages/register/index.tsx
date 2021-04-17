import Head from 'next/head';
import Link from 'next/link';

import { RegisterStyles } from './_styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ROUTES } from '../../consts';
import { useToastMessage } from '../../hooks/useToastMessage';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserServiceFactory } from '../../domain/modules/users/factories/CreateUserServiceFactory';
import { useRouter } from 'next/router';

const createUserService = CreateUserServiceFactory.create();

export default function Register() {

	const router = useRouter();
	const { setToastMessage } = useToastMessage();
	const { register, handleSubmit } = useForm();

	const onSubmit = useCallback(async (data) => {
		try {
			await createUserService.execute(data);
			setToastMessage({
				message: 'Usuário criado com sucesso',
				type: 'success'
			});
			router.push(ROUTES.HOME);
		} catch (error) {
			setToastMessage({
				message: error.message,
				type: 'error'
			});
		}
	}, [setToastMessage, router]);

	return (
		<div>
			<Head>
				<title>Registre-se | Bone metastasis</title>
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
						<Input {...register('email')} placeholder="Digite seu email" type="email" />
						<Input {...register('password')} placeholder="Digite sua senha" type="password" />
						<Input {...register('firstName')} placeholder="Digite seu nome" type="text" />
						<Input {...register('lastName')} placeholder="Digite seu sobrenome" type="text" />
						<Input {...register('relatedInstitution')} placeholder="Digite sua instituição" type="text" />
						<Input {...register('job')} placeholder="Digite sua ocupação" />
						<Button type='submit'>Registrar</Button>
						<Link href={ROUTES.HOME} prefetch>
							<a>Já possui uma conta? Entre aqui</a>
						</Link>
					</form>
				</section>
			</RegisterStyles.Container>
		</div>
	);
}
