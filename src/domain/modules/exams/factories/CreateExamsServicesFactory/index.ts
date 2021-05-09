import { RegexFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { CreateExamService } from '../../services/CreateExamService';
import { GetExamByIdService } from '../../services/GetExamByIdService';
import { GetExamsFromPatientService } from '../../services/GetExamsFromPatientService';
import { ProcessExamService } from '../../services/ProcessExamService';

class CreateExamsServicesFactory {
	private static httpClientProvider: IHttpClientProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
	}

	static createGetExamsFromPatientService(): GetExamsFromPatientService {
		return (new GetExamsFromPatientService(this.httpClientProvider));
	}

	static createGetExamByIdService(): GetExamByIdService {
		return (new GetExamByIdService(this.httpClientProvider));
	}

	static createCreateExamService(): CreateExamService {
		return (new CreateExamService(this.httpClientProvider, (new RegexFormValidationProvider())));
	}

	static createProcessExamService(): ProcessExamService {
		return (new ProcessExamService(this.httpClientProvider));
	}
}

CreateExamsServicesFactory.initialize();

export { CreateExamsServicesFactory };
