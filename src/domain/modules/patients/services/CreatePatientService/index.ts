import { API_ROUTES } from "../../../../consts";
import { FormValidationError } from "../../../../shared/errors/FormValidationError";
import { IFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IPatient } from "../../entities/IPatient";

interface ICreatePatientServiceDTO extends Pick<IPatient, "name" | "birthDate" | "description" | "gender"> {
	authorizeToken: string;
}

export class CreatePatientService {

	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider) { }

	async execute({ authorizeToken, name, birthDate, ...rest }: ICreatePatientServiceDTO): Promise<void> {
		if (!this.formValidationProvider.hasLength(name, 1)) {
			throw new FormValidationError("Missing required field", "name");
		}
		let formattedDate = birthDate;
		if (formattedDate && typeof formattedDate === "string") {
			formattedDate = new Date(birthDate || "");
		}

		if (formattedDate instanceof Date && Date.now() < formattedDate.getTime()) {
			throw new FormValidationError("Invalid date", "birthDate");
		}

		await this.httpClientProvider.post({
			url: API_ROUTES.PATIENTS,
			body: {
				name,
				birthDate: formattedDate,
				...rest
			},
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});
	}
}