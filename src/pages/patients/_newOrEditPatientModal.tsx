import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { IModalHandle, Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { IPatient } from '../../domain/modules/patients/entities/IPatient';
import { formatDate } from '../../utils/formatDate';
import { CreatePatientsServicesFactory } from '../../domain/modules/patients/factories/CreatePatientsServicesFactory';
import { MyPatientsStyles } from './_styles';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useToastMessage } from '../../hooks/useToastMessage';

interface INewOrEditPatientModalProps {
	onCloseAction?: () => void | Promise<void>;
}

export interface IINewOrEditPatientModalHandler {
	handleOpenModal(patient?: IPatient): Promise<void>;
}


// Services
const createPatientService = CreatePatientsServicesFactory.createCreatePatientService();
const updatePatientService = CreatePatientsServicesFactory.createUpdatePatientService();

export const NewOrEditPatientModal = forwardRef<IINewOrEditPatientModalHandler, INewOrEditPatientModalProps>(({ onCloseAction }, ref) => {

	const modalRef = useRef<IModalHandle>(null);
	const { register, handleSubmit, setValue, reset } = useForm();
	const { token } = useAuthentication();
	const { setToastMessage } = useToastMessage();

	const [modalTexts, setModalTexts] = useState({
		title: 'New patient',
		submit: 'Create'
	});

	const onSubmit = useCallback(async (data) => {
		try {

			if (!data.id) {
				await createPatientService.execute({
					...data,
					authorizeToken: token
				});
			} else {
				await updatePatientService.execute({
					...data,
					authorizeToken: token
				});
			}
			(onCloseAction && (onCloseAction()));
			modalRef.current?.closeModal();
		} catch (error) {
			setToastMessage({
				type: 'error',
				message: error.message
			});
		}
	}, [onCloseAction, token, setToastMessage]);

	const handleOpenModal: IINewOrEditPatientModalHandler['handleOpenModal'] = useCallback(async (patient?) => {
		if (patient) {
			if (patient) {
				setModalTexts({
					title: patient.name,
					submit: 'Edit'
				});
				for (const key of Object.keys(patient) as Array<keyof IPatient>) {
					if (key === 'birthDate' && patient[key]) {
						setValue(key, formatDate(patient[key] || ''));
					} else {
						setValue(key, patient[key] || '');
					}
				}
			}
		} else {
			setModalTexts({
				title: 'New patient',
				submit: 'Create'
			});
			reset();
			setValue('birthDate', formatDate(new Date()));
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

				<Select {...register('gender')} defaultValue="M" placeholder="gender">
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