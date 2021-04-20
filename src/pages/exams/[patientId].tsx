import Head from 'next/head';
import { Header } from '../../components/Header';
import { ExamsStyles } from './_styles';

export default function Exams() {
	return <ExamsStyles.Container>
		<Head>
			<title>Exams | Bone Metastasis</title>
		</Head>
		<Header />
	</ExamsStyles.Container>;
}