import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { IModalHandle, Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { IPatient } from '../../domain/modules/patients/entities/IPatient';
import { formatDate } from '../../utils/formatDate';
import { MyPatientsStyles } from './_styles';

interface INewOrEditPatientModalProps {
	onCloseAction?: () => void | Promise<void>;
}

export interface IINewOrEditPatientModalHandler {
	handleOpenModal(patientId?: string): Promise<void>;
}

const patients: Array<IPatient> = [
	{
		id: '1',
		name: 'João da Silva',
		birthDate: '2021-04-02T16:54:35.130Z',
		description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		sex: 'M',
		ownerId: '1',
		dicomPatientId: 'Paciente1',
		createdAt: '2021-04-02T16:54:35.130Z',
		updatedAt: '2021-04-02T16:54:35.130Z'
	}
];

export const NewOrEditPatientModal = forwardRef<IINewOrEditPatientModalHandler, INewOrEditPatientModalProps>(({ onCloseAction }, ref) => {

	const modalRef = useRef<IModalHandle>(null);
	const { register, handleSubmit, setValue, reset } = useForm();

	const [modalTexts, setModalTexts] = useState({
		title: 'New patient',
		submit: 'Create'
	});

	const onSubmit = useCallback((data) => {
		console.table(data);
		(onCloseAction && (onCloseAction()));
		modalRef.current?.closeModal();
	}, [onCloseAction]);

	const handleOpenModal: IINewOrEditPatientModalHandler['handleOpenModal'] = useCallback(async (patientId) => {
		if (patientId) {
			const fetchedPatient = patients.find(el => el.id === patientId);
			if (fetchedPatient) {
				setModalTexts({
					title: fetchedPatient.name,
					submit: 'Edit'
				});
				for (const key of Object.keys(fetchedPatient) as Array<keyof IPatient>) {
					if (key === 'birthDate' && fetchedPatient[key]) {
						setValue(key, formatDate(fetchedPatient[key] || ''));
					} else {
						setValue(key, fetchedPatient[key] || '');
					}
				}
			}
		} else {
			setModalTexts({
				title: 'New patient',
				submit: 'Create'
			});
			reset();
		}
		modalRef.current?.openModal();
	}, [setValue, reset]);

	useImperativeHandle(ref, () => ({
		handleOpenModal
	}));

	return <Modal ref={modalRef} onCloseEvent={() => {
		(onCloseAction && (onCloseAction()));
		modalRef.current?.closeModal();
	}}>
		<MyPatientsStyles.NewOrEditPatientModal>
			<h1>
				{modalTexts.title}
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>

				<Input  {...register('name')} placeholder="Patient name" />
				<Input  {...register('birthDate')} type='text' placeholder="Birth date" />

				<Select {...register('sex')} defaultValue="M" placeholder="Sex">
					<option value="M">Male</option>
					<option value="F">Female</option>
				</Select>

				<Textarea {...register('description')} placeholder="Description"></Textarea>

				<section className="submitButtonContainer">
					<Button type="submit" variant="primary">
						{modalTexts.submit}
					</Button>
				</section>
			</form>
		</MyPatientsStyles.NewOrEditPatientModal>
	</Modal>;
});