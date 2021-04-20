import Head from 'next/head';
import { FiArrowUp } from 'react-icons/fi';
import { Header } from '../../components/Header';
import { Led } from '../../components/Led';
import { Tab, Tabs } from '../../components/Tabs';
import { ExamsStyles } from './_styles';

export default function Exams() {
	return <ExamsStyles.Container>
		<Head>
			<title>Exams | Bone Metastasis</title>
		</Head>
		<Header />
		<main>
			<h1>João da Silva</h1>
			<h5>dicomId: 5004548846461615</h5>
			<p>
				32 years old
			</p>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry
			</p>

			<ExamsStyles.ExamsSection>
				<Tabs>
					<Tab isActive={true}>Frontscans</Tab>
					<Tab isActive={false}>Backscans</Tab>
				</Tabs>

				<ul className="examsList">
					<ExamsStyles.ExamListItem status="positive">
						<Led status='success' />
						<div>
							<p className="examName">Posterior01</p>
							<p className="revisionStatus">
								Revised exam, report available
							</p>
							<p className="examDates">
								Realizado em: 20/04/2021
								<span>
									Adicionado em: 20/04/2021
								</span>
							</p>
							<p className="detections">
								Detections: 16
							</p>
							<p className="affectedArea">
								Total affected area: 526mm²
								<span>
									<FiArrowUp size="16px" /> 32% reduction from last exam.
								</span>
							</p>
						</div>
					</ExamsStyles.ExamListItem>
					<ExamsStyles.ExamListItem status="negative">
						<Led status='error' />
						<div>
							<p className="examName">Posterior01</p>
							<p className="revisionStatus">
								Revised exam, report available
							</p>
							<p className="examDates">
								Realizado em: 20/04/2021
								<span>
									Adicionado em: 20/04/2021
								</span>
							</p>
							<p className="detections">
								Detections: 16
							</p>
							<p className="affectedArea">
								Total affected area: 526mm²
								<span>
									<FiArrowUp size="16px" /> 32% reduction from last exam.
								</span>
							</p>
						</div>
					</ExamsStyles.ExamListItem>
					<ExamsStyles.ExamListItem status="incomplete">
						<Led status='alert' />
						<div>
							<p className="examName">Posterior01</p>
							<p className="revisionStatus">
								Incomplete exam information
							</p>
							<p className="examDates">
								Realizado em: 20/04/2021
								<span>
									Adicionado em: 20/04/2021
								</span>
							</p>
							<p className="detections">
								Detections: -
							</p>
							<p className="affectedArea">
								Total affected area: -
							</p>
						</div>
					</ExamsStyles.ExamListItem>
				</ul>

			</ExamsStyles.ExamsSection>

		</main>
	</ExamsStyles.Container>;
}