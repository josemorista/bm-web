import Head from 'next/head';
import Link from 'next/link';

import { RegisterStyles } from './_styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ROUTES } from '../../consts';
import { useToastMessage } from '../../hooks/useToastMessage';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {

	const { setToastMessage } = useToastMessage();
	const { register, handleSubmit } = useForm();

	const onSubmit = useCallback((data) => {
		console.log(data);
		//createUserService.execute(data);
	}, []);

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
						<Input {...register('email')} placeholder="Digite seu email" />
						<Input {...register('password')} placeholder="Digite sua senha" />
						<Input {...register('firstname')} placeholder="Digite seu nome" />
						<Input {...register('lastname')} placeholder="Digite seu sobrenome" />
						<Input {...register('institution')} placeholder="Digite sua instituição" />
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
