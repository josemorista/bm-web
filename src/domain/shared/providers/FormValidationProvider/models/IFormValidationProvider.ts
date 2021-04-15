export interface IFormValidationProvider {
	isEmail(data: string): boolean;
	hasLength(data: string, length: number): boolean;
	isSafePassword(data: string): boolean;
	isValidDate(date: string): boolean;
}