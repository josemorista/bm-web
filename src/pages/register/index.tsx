import Head from 'next/head'
import Link from 'next/link';

import { RegisterStyles } from './_styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ROUTES } from '../../consts';

export default function Home() {
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
					<form>
						<Input placeholder="Digite seu email" />
						<Input placeholder="Digite sua senha" />
						<Input placeholder="Digite seu nome" />
						<Input placeholder="Digite seu sobrenome" />
						<Input placeholder="Digite sua instituição" />
						<Input placeholder="Digite sua ocupação" />
						<Button type='submit'>Registrar</Button>
						<Link href={ROUTES.HOME} prefetch>
							<a>Já possui uma conta? Entre aqui</a>
						</Link>
					</form>
				</section>
			</RegisterStyles.Container>
		</div>
	)
}
