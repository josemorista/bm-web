import { container } from 'tsyringe';

import { LocalStorageCacheProvider } from '../providers/CacheProvider/implementations/LocalStorageCacheProvider';
import { ICacheProvider } from '../providers/CacheProvider/models/ICacheProvider';
import { RegexFormValidationProvider } from '../providers/FormValidationProvider/implementations/RegexFormValidationProvider';
import { IFormValidationProvider } from '../providers/FormValidationProvider/models/IFormValidationProvider';
import { AxiosHttpClientProvider } from '../providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { IHttpClientProvider } from '../providers/HttpClientProvider/models/IHttpClientProvider';

container.registerSingleton<IHttpClientProvider>('HttpClientProvider', AxiosHttpClientProvider);
container.registerSingleton<ICacheProvider>('CacheProvider', LocalStorageCacheProvider);
container.registerSingleton<IFormValidationProvider>('FormValidationProvider', RegexFormValidationProvider);