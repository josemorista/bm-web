import Head from 'next/head';
import { useRef, useState } from 'react';
import { FiTrash, FiEdit2, FiPlus } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { withAuth } from '../../hocs';
import { IINewOrEditPatientModalHandler, NewOrEditPatientModal } from './_newOrEditPatientModal';
import { MyPatientsStyles } from './_styles';

function MyPatients() {

	const [patientToSearch, setPatientSearch] = useState('');

	const newOrEditPatientModalRef = useRef<IINewOrEditPatientModalHandler>(null);

	return <MyPatientsStyles.Container>
		<Head>
			<title>My patients | Bone Metastasis</title>
		</Head>

		<NewOrEditPatientModal ref={newOrEditPatientModalRef} onCloseAction={() => {
			console.log('Closed');
		}} />

		<Header />

		<main>
			<h1>
				My patients
			</h1>
			<section>
				<Input type="text" placeholder="Search patient by name..." value={patientToSearch} onChange={e => {
					setPatientSearch(e.target.value);
				}} />
			</section>
			<ul>
				<MyPatientsStyles.PatientListItem>
					<section>
						<div className="patientInitial">
							<h1>
								Jo
							</h1>
						</div>
						<div>
							<h4>
								João da Silva
							</h4>
							<strong>
								dicomId: 5004548846461615
							</strong>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry
							</p>
						</div>
					</section>
					<section>
						<button onClick={() => {
							newOrEditPatientModalRef.current?.handleOpenModal('1');
						}}>
							<FiEdit2 />
						</button>
						<button>
							<FiTrash />
						</button>
					</section>
				</MyPatientsStyles.PatientListItem>
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

export default withAuth(MyPatients, { strictPrivate: false, strictPublic: true });