import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { IModalHandle, Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { PatientStyles } from './_[patient]_styles';
import { useDropzone } from 'react-dropzone';

interface INewExamModalProps {
	patientId: string;
	onCloseAction?: () => void | Promise<void>;
}

export interface IINewExamModalHandler {
	handleOpenModal(): Promise<void>;
}

export const NewExamModal = forwardRef<IINewExamModalHandler, INewExamModalProps>(({ onCloseAction, patientId }, ref) => {

	const modalRef = useRef<IModalHandle>(null);
	const { register, handleSubmit, setValue, reset } = useForm();

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		console.log(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const onSubmit = useCallback((data) => {
		console.table(data);
		(onCloseAction && (onCloseAction()));
		modalRef.current?.closeModal();
	}, [onCloseAction]);

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
					<option value="ant">Backscan</option>
					<option value="post">Frontscan</option>
					<option value="cra">Cranium</option>
				</Select>
				<div {...getRootProps()} className="dropzoneContainer">
					<input {...getInputProps()} />
					<p>Drop the file here ...</p>
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