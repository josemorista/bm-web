import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiTrash, FiEdit2, FiPlus } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { ROUTES } from '../../consts';
import { IPatient } from '../../domain/modules/patients/entities/IPatient';
import { CreatePatientsServicesFactory } from '../../domain/modules/patients/factories/CreatePatientsServicesFactory';
import { withAuth } from '../../hocs';
import { useAuthentication } from '../../hooks/useAuthentication';
import { IINewOrEditPatientModalHandler, NewOrEditPatientModal } from './_newOrEditPatientModal';
import { MyPatientsStyles } from './_styles';

// Services
const getPatientsFromUserService = CreatePatientsServicesFactory.createGetPatientsFromUserService();

function MyPatients() {
	const [patients, setPatients] = useState<Array<IPatient>>([]);
	const [searchFilter, setSearchFilter] = useState('');
	const { token } = useAuthentication();
	const router = useRouter();

	const searchedPatients = useMemo(() => {
		return patients.filter(el => el.name.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase()));
	}, [patients, searchFilter]);

	const debouncePatientSearch = useRef<NodeJS.Timeout>(null);

	const newOrEditPatientModalRef = useRef<IINewOrEditPatientModalHandler>(null);

	const getPatients = useCallback(async () => {
		const resp = await getPatientsFromUserService.execute({
			authorizeToken: token
		});
		setPatients(resp);
	}, [token]);

	useEffect(() => {
		getPatients();
	}, [getPatients]);

	return <MyPatientsStyles.Container>
		<Head>
			<title>My patients | Bone Metastasis</title>
		</Head>

		<NewOrEditPatientModal ref={newOrEditPatientModalRef} onCloseAction={() => {
			getPatients();
		}} />

		<Header />

		<main>
			<h1>
				My patients
			</h1>
			<section>
				<Input type="text" placeholder="Search patient by name..." onChange={e => {
					if (debouncePatientSearch.current) {
						clearTimeout(debouncePatientSearch.current);
					}
					setTimeout(() => {
						setSearchFilter(e.target.value);
					}, 1000);
				}} />
			</section>
			<ul>
				{searchedPatients.map(patient => <MyPatientsStyles.PatientListItem key={patient.id} onClick={() => {
					router.push(ROUTES.PATIENT(patient.id));
				}}>
					<section>
						<div className="patientInitial">
							<h1>
								{patient.name.slice(0, 2)}
							</h1>
						</div>
						<div>
							<h4>
								{patient.name}
							</h4>
							<strong>
								dicomId: {patient.dicomPatientId || ''}
							</strong>
							<p>
								{patient.description}
							</p>
						</div>
					</section>
					<section>
						<button onClick={(e) => {
							e.stopPropagation();
							newOrEditPatientModalRef.current?.handleOpenModal(patient);
						}}>
							<FiEdit2 />
						</button>
						<button>
							<FiTrash />
						</button>
					</section>
				</MyPatientsStyles.PatientListItem>)}
			</ul>
			<div className="addPatientButtonContainer">
				<Button onClick={() => {
					newOrEditPatientModalRef.current?.handleOpenModal();
				}}>
					<FiPlus />
					<span>New Patient</span>
				</Button>
			</div>
		</main>
	</MyPatientsStyles.Container>;
}

export default withAuth(MyPatients, { strictPrivate: true });