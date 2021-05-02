import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Led } from '../../components/Led';
import { Tab, Tabs } from '../../components/Tabs';
import { IPatient } from '../../domain/modules/patients/entities/IPatient';
import { CreatePatientsServicesFactory } from '../../domain/modules/patients/factories/CreatePatientsServicesFactory';
import { useAuthentication } from '../../hooks/useAuthentication';
import { IINewExamModalHandler, NewExamModal } from './_newExamModal';
import { PatientStyles } from './_[patientId]_styles';
import { useRouter } from 'next/router';
import { ROUTES } from '../../consts';
import { differenceInCalendarYears } from 'date-fns';
import { CreateExamsServicesFactory } from '../../domain/modules/exams/factories/CreateExamsServicesFactory';
import { IExam } from '../../domain/modules/exams/entities/IExam';
import { formatDate } from '../../utils/formatDate';

// services 
const getPatientByIdService = CreatePatientsServicesFactory.createGetPatientByIdService();
const getExamsFromPatientService = CreateExamsServicesFactory.createGetExamsFromPatientService();

export default function Patient() {

	const newExamModalRef = useRef<IINewExamModalHandler>(null);
	const router = useRouter();
	const { patientId } = router.query;

	const [patient, setPatient] = useState<IPatient | undefined>(undefined);
	const { token } = useAuthentication();

	const [category, setCategory] = useState<IExam['category']>('ant');

	const [exams, setExams] = useState<Array<IExam>>([]);

	const categoryExams = useMemo(() => {
		return exams.filter(el => el.category === category).map(el => ({
			...el,
			formattedDate: formatDate(el.date),
			formattedCreatedAt: formatDate(el.createdAt)
		}));
	}, [category, exams]);

	const patientAge = useMemo(() => {
		return patient?.birthDate && typeof patient.birthDate === 'string' ? differenceInCalendarYears(new Date(patient.birthDate), new Date()) : null;
	}, [patient]);

	useEffect(() => {
		getPatientByIdService.execute({
			id: String(patientId),
			authorizeToken: token
		}).then(resp => {
			if (resp) {
				setPatient(resp);
			} else {
				router.replace(ROUTES.MY_PATIENTS);
			}
		});
	}, [token, patientId, router]);

	useEffect(() => {
		if (patient?.id) {
			getExamsFromPatientService.execute({
				patientId: patient.id,
				authorizeToken: token
			}).then(resp => {
				setExams(resp);
			});
		}
	}, [patient?.id, token]);

	if (!patient) {
		return null;
	}

	return <PatientStyles.Container>
		<Head>
			<title>Exams | Bone Metastasis</title>
		</Head>
		<NewExamModal patientId={'1'} ref={newExamModalRef} onCloseAction={() => {
			console.log('closed');
		}} />
		<Header />
		<main>
			<h1>{patient.name}</h1>
			<h5>dicomId: {patient.dicomPatientId || ''}</h5>
			<p>
				Age: {patientAge || '-'}
			</p>
			<p>
				{patient.description}
			</p>

			<PatientStyles.ExamsSection>
				<Tabs>
					<Tab isActive={category === 'ant'} onClick={() => {
						setCategory('ant');
					}}>Frontscans</Tab>
					<Tab isActive={category === 'post'} onClick={() => {
						setCategory('post');
					}}>Backscans</Tab>
				</Tabs>

				<ul className="examsList">
					{categoryExams.map(exam => <PatientStyles.ExamListItem key={exam.id} status="positive">
						<Led status='success' />
						<div>
							<p className="examName">{exam.label}</p>
							<p className="revisionStatus">
								-
							</p>
							<p className="examDates">
								Realizado em: {exam.formattedDate}
								<span>
									Adicionado em: {exam.formattedCreatedAt}
								</span>
							</p>
							<p className="detections">
								Detections: -
							</p>
							<p className="affectedArea">
								Total affected area: - mm²
								<span>
									<FiArrowUp size="16px" /> 32% reduction from last exam.
								</span>
							</p>
						</div>
					</PatientStyles.ExamListItem>)}

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