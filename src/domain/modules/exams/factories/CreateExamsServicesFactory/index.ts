import { RegexFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { CreateExamService } from '../../services/CreateExamService';
import { GetExamsFromPatientService } from '../../services/GetExamsFromPatientService';

class CreateExamsServicesFactory {
	private static httpClientProvider: IHttpClientProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
	}

	static createGetExamsFromPatientService(): GetExamsFromPatientService {
		return (new GetExamsFromPatientService(this.httpClientProvider));
	}

	static createCreateExamService(): CreateExamService {
		return (new CreateExamService(this.httpClientProvider, (new RegexFormValidationProvider())));
	}
}

CreateExamsServicesFactory.initialize();

export { CreateExamsServicesFactory };
