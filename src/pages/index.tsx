import Head from 'next/head'
import Link from 'next/link';

import { HomeStyles } from './_styles';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ROUTES } from '../consts';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bem vindo | Bone metastasis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeStyles.Container>
        <section className="formAndHeader">
          <header>
            <img src="/assets/imgs/png/uffLogo.png" alt="UFF" />
            <img src="/assets/imgs/png/huapLogo.png" alt="HUAP" />
          </header>
          <form>
            <Input placeholder="Digite seu email" />
            <Input placeholder="Digite sua senha" />
            <Button type='submit'>Entrar</Button>
            <Link href={ROUTES.REGISTER} prefetch>
              <a>Não possui uma conta? Registre-se aqui</a>
            </Link>
          </form>
        </section>
        <section className="bg"></section>
      </HomeStyles.Container>
    </div>
  )
}
