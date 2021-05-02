import { AxiosHttpClientProvider } from '../../../../domain/shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { IHttpClientProvider } from '../../../../domain/shared/providers/HttpClientProvider/models/IHttpClientProvider';

class CreatePatientsServicesFactory {

	private static httpClientProvider: IHttpClientProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
	}

}

export { CreatePatientsServicesFactory };