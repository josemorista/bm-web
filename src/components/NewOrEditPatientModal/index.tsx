import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../templates/Button";
import { Input } from "../templates/Input";
import { IModalHandle, Modal } from "../templates/Modal";
import { Select } from "../templates/Select";
import { Textarea } from "../templates/Textarea";
import { IPatient } from "../../domain/modules/patients/entities/IPatient";
import { formatDate } from "../../utils/formatDate";
import { CreatePatientsServicesFactory } from "../../domain/modules/patients/factories/CreatePatientsServicesFactory";
import { MyPatientsStyles } from "../../styles/pages/patients";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useTranslation } from "../../hooks/useTranslation";

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
	const { t } = useTranslation();
	const { token } = useAuthentication();
	const { setToastMessage } = useToastMessage();

	const [modalTexts, setModalTexts] = useState({
		title: "New patient",
		submit: "Create"
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
				type: "error",
				message: error.message
			});
		}
	}, [onCloseAction, token, setToastMessage]);

	const handleOpenModal: IINewOrEditPatientModalHandler["handleOpenModal"] = useCallback(async (patient?) => {
		if (patient) {
			if (patient) {
				setModalTexts({
					title: patient.name,
					submit: "Edit"
				});
				for (const key of Object.keys(patient) as Array<keyof IPatient>) {
					if (key === "birthDate" && patient[key]) {
						setValue(key, formatDate(patient[key] || ""));
					} else {
						setValue(key, patient[key] || "");
					}
				}
			}
		} else {
			setModalTexts({
				title: "New patient",
				submit: "Create"
			});
			reset();
			setValue("birthDate", formatDate(new Date()));
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
				{t(modalTexts.title)}
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>

				<Input  {...register("name")} placeholder={t("Patient name") + "(Ex: Jhon Doe)"} />
				<Input  {...register("birthDate")} type='date' />

				<Select {...register("gender")} defaultValue="M" placeholder={t("Gender")}>
					<option value="M">{t("Male")}</option>
					<option value="F">{t("Female")}</option>
				</Select>

				<Textarea {...register("description")} placeholder={t("Description")}></Textarea>

				<section className="submitButtonContainer">
					<Button ariaLabel="Submit or edit new patient" type="submit" variant="primary">
						{t(modalTexts.submit)}
					</Button>
				</section>
			</form>
		</MyPatientsStyles.NewOrEditPatientModal>
	</Modal>;
});