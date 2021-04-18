import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { IPatient } from '../../domain/modules/patients/entities/IPatient';

interface INewOrEditPatientModalProps {
	patientId?: string;
	onCloseAction: () => void | Promise<void>;
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
		previousBoneLesions: null,
		previousCancerDiagnosis: null,
		previousQt: null,
		previousRt: null,
		createdAt: '2021-04-02T16:54:35.130Z',
		updatedAt: '2021-04-02T16:54:35.130Z'
	}
];

export const NewOrEditPatientModal = ({ patientId, onCloseAction }: INewOrEditPatientModalProps) => {

	const { register, handleSubmit, setValue } = useForm();

	useEffect(() => {
		const fetchedPatient = patients.find(el => el.id === patientId);
		if (fetchedPatient) {
			for (const key of Object.keys(fetchedPatient) as Array<keyof IPatient>) {
				setValue(key, fetchedPatient[key] || '');
			}
		}
	}, [patientId, setValue]);

	return <Modal open={true}>
		<form>
			<Input  {...register('name')} />
		</form>
	</Modal>;
};