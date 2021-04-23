import Head from 'next/head';
import { useRef } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Led } from '../../components/Led';
import { Tab, Tabs } from '../../components/Tabs';
import { IINewExamModalHandler, NewExamModal } from './_newExamModal';
import { PatientStyles } from './_[patient]_styles';

export default function Patient() {

	const newExamModalRef = useRef<IINewExamModalHandler>(null);

	return <PatientStyles.Container>
		<Head>
			<title>Exams | Bone Metastasis</title>
		</Head>
		<NewExamModal patientId={'1'} ref={newExamModalRef} onCloseAction={() => {
			console.log('closed');
		}} />
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

			<PatientStyles.ExamsSection>
				<Tabs>
					<Tab isActive={true}>Frontscans</Tab>
					<Tab isActive={false}>Backscans</Tab>
				</Tabs>

				<ul className="examsList">
					<PatientStyles.ExamListItem status="positive">
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
					</PatientStyles.ExamListItem>
					<PatientStyles.ExamListItem status="negative">
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
					</PatientStyles.ExamListItem>
					<PatientStyles.ExamListItem status="incomplete">
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
					</PatientStyles.ExamListItem>
				</ul>
			</PatientStyles.ExamsSection>
			<section className="newExamButton">
				<Button variant="primary" onClick={() => {
					newExamModalRef.current?.handleOpenModal();
				}}>New exam</Button>
			</section>
		</main>
	</PatientStyles.Container>;
}