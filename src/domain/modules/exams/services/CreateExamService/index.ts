import { API_ROUTES } from "../../../../consts";
import { AppError } from "../../../../shared/errors/AppError";
import { FormValidationError } from "../../../../shared/errors/FormValidationError";
import { IFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IExam } from "../../entities/IExam";

interface ICreateExamServiceDTO {
	patientId: string;
	category: "ant" | "cran" | "post";
	dcm: File;
	label: string;
	date: string | Date;
	authorizeToken: string;
}

export class CreateExamService {

	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider
	) { }

	async execute({ patientId, category, dcm, label, date, authorizeToken }: ICreateExamServiceDTO): Promise<IExam> {

		if (!this.formValidationProvider.verifyFileType(dcm.name, ["dcm"])) {
			throw new FormValidationError("Invalid file type", "label");
		}

		if (!this.formValidationProvider.hasLength(patientId, 36)) {
			throw new AppError("Invalid patient", 400);
		}

		if (!this.formValidationProvider.hasLength(label, 1)) {
			throw new FormValidationError("Label is required", "label");
		}


		let formattedDate = date;

		if (typeof formattedDate == "string") {
			formattedDate = formattedDate.replace(/\//g, "-");
			if (!this.formValidationProvider.isValidDate(formattedDate)) {
				throw new FormValidationError("Invalid date format", "date");
			}
			const matches = /(\d+)-(\d+)-(\d+)/.exec(formattedDate);

			if (matches) {
				formattedDate = new Date(Number(matches[3]), (Number(matches[2]) - 1), Number(matches[1]));
			}
		}

		if (formattedDate instanceof Date && Date.now() < formattedDate.getTime()) {
			throw new FormValidationError("Invalid date", "date");
		}

		const body = new FormData();

		body.append("category", category);
		body.append("patientId", patientId);
		body.append("label", label);
		body.append("date", typeof formattedDate === "string" ? formattedDate : formattedDate.toISOString());
		body.append("dcm", dcm);

		const { data } = await this.httpClientProvider.post<IExam>({
			url: API_ROUTES.EXAMS,
			body,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authorizeToken}`
			}
		});

		return data;
	}
}