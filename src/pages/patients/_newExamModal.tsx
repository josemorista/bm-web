import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { IModalHandle, Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { PatientStyles } from './_[patientId]_styles';
import { useDropzone } from 'react-dropzone';
import { CreateExamsServicesFactory } from '../../domain/modules/exams/factories/CreateExamsServicesFactory';
import { AppError } from '../../domain/shared/errors/AppError';
import { useToastMessage } from '../../hooks/useToastMessage';
import { useAuthentication } from '../../hooks/useAuthentication';

interface INewExamModalProps {
	patientId: string;
	onCloseAction?: () => void | Promise<void>;
}

export interface IINewExamModalHandler {
	handleOpenModal(): Promise<void>;
}

// Services
const createExamService = CreateExamsServicesFactory.createCreateExamService();

export const NewExamModal = forwardRef<IINewExamModalHandler, INewExamModalProps>(({ onCloseAction, patientId }, ref) => {

	const modalRef = useRef<IModalHandle>(null);
	const { token } = useAuthentication();
	const { register, handleSubmit, reset } = useForm();
	const { setToastMessage } = useToastMessage();
	const [dcmFile, setDcmFile] = useState<File | null>(null);

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		setDcmFile(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const onSubmit = useCallback(async (data) => {
		try {
			if (dcmFile) {
				await createExamService.execute({
					...data,
					authorizeToken: token,
					patientId: patientId,
					dcm: dcmFile
				});
			} else {
				throw new AppError('Missing dcm file', 400);
			}

			(onCloseAction && (onCloseAction()));
			modalRef.current?.closeModal();
		} catch (error) {
			if (error.message) {
				setToastMessage({
					message: error.message,
					type: 'error'
				});
			}
		}
	}, [onCloseAction, dcmFile, setToastMessage, patientId]);

	const handleOpenModal: IINewExamModalHandler['handleOpenModal'] = useCallback(async () => {
		reset();
		modalRef.current?.openModal();
	}, [reset]);

	useImperativeHandle(ref, () => ({
		handleOpenModal
	}));

	return <Modal ref={modalRef} onCloseEvent={() => {
		(onCloseAction && (onCloseAction()));
		modalRef.current?.closeModal();
	}}>
		<PatientStyles.NewExamModal>
			<h1>
				New Exam
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input  {...register('label')} placeholder="Exam label" />
				<Select {...register('category')} placeholder="Category">
					<option value="post">Backscan</option>
					<option value="ant">Frontscan</option>
					<option value="cra">Cranium</option>
				</Select>
				<Input  {...register('date')} type='text' placeholder="Exam date" />
				<div {...getRootProps()} className="dropzoneContainer">
					<input {...getInputProps()} />
					{!dcmFile ? <p>Drop the file here ...</p> : <p>{dcmFile.name}</p>}
				</div>
				<section className="submitButtonContainer">
					<Button type="submit" variant="primary">
						New
					</Button>
				</section>
			</form>
		</PatientStyles.NewExamModal>
	</Modal>;
});