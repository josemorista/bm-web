export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	job: string | null;
	relatedInstitution: string | null;
	password: string;
	avatarURL: string | null;
}