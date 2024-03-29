import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../templates/Button";
import { Input } from "../templates/Input";
import { IModalHandle, Modal } from "../templates/Modal";
import { Select } from "../templates/Select";
import { PatientStyles } from "../../styles/pages/patients/patientId";
import { useDropzone } from "react-dropzone";
import { CreateExamsServicesFactory } from "../../domain/modules/exams/factories/CreateExamsServicesFactory";
import { AppError } from "../../domain/shared/errors/AppError";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useTranslation } from "../../hooks/useTranslation";

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
	const { t } = useTranslation();
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
				throw new AppError("Missing dcm file", 400);
			}

			(onCloseAction && (onCloseAction()));
			modalRef.current?.closeModal();
		} catch (error) {
			if (error.message) {
				setToastMessage({
					message: t(error.message),
					type: "error"
				});
			}
		}
	}, [onCloseAction, dcmFile, setToastMessage, patientId, token, t]);

	const handleOpenModal: IINewExamModalHandler["handleOpenModal"] = useCallback(async () => {
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
				{t("New exam")}
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input  {...register("label")} placeholder={t("Exam label (Unifier identification for search purposes)")} />
				<Select {...register("category")} placeholder={t("Category")}>
					<option value="ant">{t("Frontscan")}</option>
					<option value="post">{t("Backscan")}</option>
					<option value="cra">{t("Cranium")}</option>
				</Select>
				<Input {...register("radioTracerApplicationHours")} type="number" placeholder={t("Radio tracer application hours")} />
				<Input  {...register("date")} type='date' placeholder={t("Exam date")} />
				<div {...getRootProps()} className="dropzoneContainer">
					<input {...getInputProps()} />
					{!dcmFile ? <p>{t("Drop the file here")}...</p> : <p>{dcmFile.name}</p>}
				</div>
				<section className="submitButtonContainer">
					{!!dcmFile && <Button ariaLabel="Submit new exam" type="submit" variant="primary">
						{t("Add exam")}
					</Button>}
				</section>
			</form>
		</PatientStyles.NewExamModal>
	</Modal>;
});