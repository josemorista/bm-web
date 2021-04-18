import Head from 'next/head';
import { useState } from 'react';
import { FiTrash, FiEdit2 } from 'react-icons/fi';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { withAuth } from '../../hocs';
import { MyPatientsStyles } from './_styles';

function MyPatients() {

	const [patientToSearch, setPatientSearch] = useState('');

	return <MyPatientsStyles.Container>
		<Head>
			<title>My patients | Bone Metastasis</title>
		</Head>
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
						<button>
							<FiEdit2 />
						</button>
						<button>
							<FiTrash />
						</button>
					</section>
				</MyPatientsStyles.PatientListItem>
			</ul>
		</main>
	</MyPatientsStyles.Container>;
}

export default withAuth(MyPatients, { strictPrivate: true });