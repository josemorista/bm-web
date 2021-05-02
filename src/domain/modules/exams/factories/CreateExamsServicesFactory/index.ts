import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { GetExamsFromPatientService } from '../../services/GetExamsFromPatientService';

class CreateExamsServicesFactory {
	private static httpClientProvider: IHttpClientProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
	}

	static createGetExamsFromPatientService(): GetExamsFromPatientService {
		return (new GetExamsFromPatientService(this.httpClientProvider));
	}
}

CreateExamsServicesFactory.initialize();

export { CreateExamsServicesFactory };
