import Head from 'next/head';
import { Header } from '../../../components/Header';
import { ExamStyles } from './_[examId]_styles';

export const Exam = () => {
	return <ExamStyles.Container>
		<Head>
			<title>Exam | Bone Metastasis</title>
		</Head>
		<Header />
		<main>

		</main>
	</ExamStyles.Container>;
};