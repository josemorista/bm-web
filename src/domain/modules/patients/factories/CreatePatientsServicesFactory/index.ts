import { CreatePatientService } from '../../services/CreatePatientService';
import { GetPatientsByUserService } from '../../services/GetPatientsByUserService';
import { RegexFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { UpdatePatientService } from '../../services/UpdatePatientService';
import { GetPatientByIdService } from '../../services/GetPatientByIdService';
import { DeletePatientService } from '../../services/DeletePatientService';

class CreatePatientsServicesFactory {

	private static httpClientProvider: IHttpClientProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
	}

	static createGetPatientsFromUserService(): GetPatientsByUserService {
		return (new GetPatientsByUserService(this.httpClientProvider));
	}

	static createCreatePatientService(): CreatePatientService {
		return (new CreatePatientService(this.httpClientProvider, (new RegexFormValidationProvider())));
	}

	static createUpdatePatientService(): UpdatePatientService {
		return (new UpdatePatientService(this.httpClientProvider, (new RegexFormValidationProvider())));
	}

	static createGetPatientByIdService(): GetPatientByIdService {
		return (new GetPatientByIdService(this.httpClientProvider));
	}

	static createDeletePatientService(): DeletePatientService {
		return (new DeletePatientService(this.httpClientProvider, (new RegexFormValidationProvider())));
	}

}

CreatePatientsServicesFactory.initialize();

export { CreatePatientsServicesFactory };