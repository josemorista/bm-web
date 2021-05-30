import { IFormValidationProvider } from '../models/IFormValidationProvider';

export class RegexFormValidationProvider implements IFormValidationProvider {

	hasLength(data: string, length: number): boolean {
		return new RegExp(`.{${length},}`, 'ig').test(data);
	}

	isEmail(data: string): boolean {
		return (/[\w.]+@[\w]+\..*/gi.test(data));
	}

	isSafePassword(data: string): boolean {
		return this.hasLength(data, 6) && /\d/.test(data) && /[a-z]/ig.test(data);
	}

	isValidDate(data: string): boolean {
		return (/(?<month>[0-1]?[0-9]{1})-(?<day>[0-3]?[0-9]{1})-(?<year>\d{4})$/.test(data));
	}

	verifyFileType(data: string, extensions: Array<string>): boolean {
		return (new RegExp(`\\w+.(${extensions.join('|')})`)).test(data);
	}

}