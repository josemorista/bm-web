import { IFormValidationProvider } from '../models/IFormValidationProvider';

export class RegexFormValidationProvider implements IFormValidationProvider {

	hasLength(data: string, length: number): boolean {
		return new RegExp(`.{${length},}`, 'ig').test(data);
	}

	isEmail(data: string): boolean {
		return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(data));
	}

	isSafePassword(data: string): boolean {
		return this.hasLength(data, 6) && /\d/.test(data) && /[a-z]/ig.test(data);
	}

	isValidDate(data: string): boolean {
		return (/^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/.test(data));
	}

	verifyFileType(data: string, extensions: Array<string>): boolean {
		return (new RegExp(`\\w+.(${extensions.join('|')})`)).test(data);
	}

}