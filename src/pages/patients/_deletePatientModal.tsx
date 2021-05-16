import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { IModalHandle, Modal } from '../../components/Modal';
import { IPatient } from '../../domain/modules/patients/entities/IPatient';
import { CreatePatientsServicesFactory } from '../../domain/modules/patients/factories/CreatePatientsServicesFactory';
import { AppError } from '../../domain/shared/errors/AppError';
import { useAuthentication } from '../../hooks/useAuthentication';
import { MyPatientsStyles } from './_styles';

interface IDeletePatientModalProps {
	onCloseAction?: () => void | Promise<void>;
}

export interface IDeletePatientModalHandle {
	openDeletePatientModal(patient: IPatient): void;
}

const deletePatientService = CreatePatientsServicesFactory.createDeletePatientService();

export const DeletePatientModal = forwardRef<IDeletePatientModalHandle, IDeletePatientModalProps>(({ onCloseAction }, ref) => {

	const modalRef = useRef<IModalHandle>(null);
	const { token } = useAuthentication();
	const [patient, setPatient] = useState<IPatient | null>(null);

	const openDeletePatientModal = (patient: IPatient) => {
		setPatient(patient);
		modalRef.current?.openModal();
	};

	useImperativeHandle(ref, () => {
		return {
			openDeletePatientModal
		};
	});

	const handleDeletePatient = async () => {
		try {
			if (!patient) {
				throw new AppError('No patient to delete');
			}
			await deletePatientService.execute({
				patientId: patient.id,
				authorizeToken: token
			});
			if (onCloseAction) {
				await onCloseAction();
			}

			modalRef.current?.closeModal();
		} catch (error) {
			console.error(error.message);
		}
	};

	return <Modal ref={modalRef}>
		<MyPatientsStyles.DeletePatientModal>
			<h1>
				Delete patient
			</h1>
			<h3	>
				Are you sure you want to delete {patient?.name || ''}?
			</h3>
			<section className='buttonsContainer'>
				<Button onClick={() => {
					modalRef.current?.closeModal();
				}}>No</Button>
				<Button onClick={() => {
					handleDeletePatient();
				}}>Yes</Button>
			</section>
		</MyPatientsStyles.DeletePatientModal>
	</Modal>;
});