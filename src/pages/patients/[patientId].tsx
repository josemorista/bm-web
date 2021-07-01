import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../components/templates/Button';
import { Header } from '../../components/Header';
import { Led } from '../../components/templates/Led';
import { Tab, Tabs } from '../../components/templates/Tabs';
import { IPatient } from '../../domain/modules/patients/entities/IPatient';
import { CreatePatientsServicesFactory } from '../../domain/modules/patients/factories/CreatePatientsServicesFactory';
import { useAuthentication } from '../../hooks/useAuthentication';
import { IINewExamModalHandler, NewExamModal } from '../../components/NewExamModal';
import { PatientStyles } from '../../styles/pages/patients/patientId';
import { useRouter } from 'next/router';
import { ROUTES } from '../../consts';
import { differenceInCalendarYears } from 'date-fns';
import { CreateExamsServicesFactory } from '../../domain/modules/exams/factories/CreateExamsServicesFactory';
import { IExam } from '../../domain/modules/exams/entities/IExam';
import { formatDate } from '../../utils/formatDate';
import { withAuth } from '../../hocs';

// services 
const getPatientByIdService = CreatePatientsServicesFactory.createGetPatientByIdService();
const getExamsFromPatientService = CreateExamsServicesFactory.createGetExamsFromPatientService();

const getExamLedStatus = (exam: IExam) => {
	if (!exam.originalImageLocation) return 'alert';
	return 'success';
};

function Patient() {

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
		return patient?.birthDate && typeof patient.birthDate === 'string' ? differenceInCalendarYears(new Date(), new Date(patient.birthDate)) : null;
	}, [patient?.birthDate]);

	const getExamsFromPatient = useCallback(async () => {
		if (patient?.id) {
			const resp = await getExamsFromPatientService.execute({
				patientId: patient.id,
				authorizeToken: token
			});
			setExams(resp);
		}
	}, [patient?.id, token]);

	useEffect(() => {
		if (patientId) {
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
		}
	}, [token, patientId, router]);

	useEffect(() => {
		getExamsFromPatient();
	}, [getExamsFromPatient]);

	if (!patient) {
		return null;
	}

	return <PatientStyles.Container>
		<Head>
			<title>Exams | Bone Metastasis</title>
		</Head>
		<NewExamModal patientId={patient.id} ref={newExamModalRef} onCloseAction={() => {
			getExamsFromPatient();
		}} />
		<Header />
		<main>
			<h1>{patient.name}</h1>
			<h5>dicomId: {patient.dicomPatientId || ''}</h5>
			<p>
				Age: {patientAge ?? '-'} years old
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
					<Tab isActive={category === 'cra'} onClick={() => {
						setCategory('cra');
					}}>Cranium</Tab>
				</Tabs>

				<ul className="examsList">
					{categoryExams.map(exam => <PatientStyles.ExamListItem key={exam.id} status="positive" onClick={() => {
						router.push(ROUTES.EXAMS(exam.id));
					}}>
						<Led status={getExamLedStatus(exam)} />
						<div>
							<p className="examName">{exam.label}</p>
							<p className="revisionStatus">

							</p>
							<p className="examDates">
								Realizado em: {exam.formattedDate}
								<span>
									Adicionado em: {exam.formattedCreatedAt}
								</span>
							</p>
							<p className="detections">
								{/*Detections: -*/}
							</p>
							{/*<p className="affectedArea">
								Total affected area: - mm²
								<span>
									<FiArrowUp size="16px"  32% reduction from last exam. />
								</span>
				</p>*/}
						</div>
					</PatientStyles.ExamListItem>)}
				</ul>
			</PatientStyles.ExamsSection>
			<section className="newExamButton">
				<Button ariaLabel="Open create new exam" variant="primary" onClick={() => {
					newExamModalRef.current?.handleOpenModal();
				}}>New exam</Button>
			</section>
		</main>
	</PatientStyles.Container>;
}

export default withAuth(Patient, { strictPrivate: true });