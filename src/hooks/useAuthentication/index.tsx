import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { IUser } from '../../domain/modules/users/entities/IUser';
import { CloseUserSessionServiceFactory } from '../../domain/modules/users/factories/CloseUserSessionServiceFactory';
import { CreateUserServiceFactory } from '../../domain/modules/users/factories/CreateUserServiceFactory';
import { CreateUserSessionServiceFactory } from '../../domain/modules/users/factories/CreateUserSessionServiceFactory';
import { GetUserFromSessionServiceFactory } from '../../domain/modules/users/factories/GetUserFromSessionServiceFactory';

interface IAuthenticationContext {
	user: IUser;
	signed: boolean;
	signIn(data: Pick<IUser, 'email' | 'password'>): Promise<void>;
	signUp(data: Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'job' | 'relatedInstitution'>): Promise<void>;
	logout(): Promise<void>
}

const authenticationContext = createContext<IAuthenticationContext>({} as IAuthenticationContext);

interface IAuthenticationProviderProps {
	children: React.ReactNode;
}

// services
const createUserService = CreateUserServiceFactory.create();
const createUserSessionService = CreateUserSessionServiceFactory.create();
const getUserFromSessionService = GetUserFromSessionServiceFactory.create();
const closeUserSessionService = CloseUserSessionServiceFactory.create();

export const AuthenticationProvider = ({ children }: IAuthenticationProviderProps) => {

	const [user, setUser] = useState<IUser | undefined>(undefined);

	useEffect(() => {
		getUserFromSessionService.execute().then(resp => {
			if (resp) {
				setUser(resp);
			} else {
				setUser({} as IUser);
			}
		});
	}, []);

	const signIn: IAuthenticationContext['signIn'] = useCallback(async (data) => {
		await createUserSessionService.execute(data);
		const fetchedUser = await getUserFromSessionService.execute();
		if (fetchedUser) {
			setUser(fetchedUser);
		}
	}, []);

	const signUp: IAuthenticationContext['signUp'] = useCallback((data) => {
		return createUserService.execute(data);
	}, []);

	const logout: IAuthenticationContext['logout'] = useCallback(async () => {
		await closeUserSessionService.execute();
		setUser({} as IUser);
	}, []);

	if (user === undefined) {
		return null;
	}

	return <authenticationContext.Provider value={{
		user,
		signIn,
		signUp,
		logout,
		signed: !!user.id
	}}>
		{children}
	</authenticationContext.Provider>;
};

export const useAuthentication = (): IAuthenticationContext => {
	return (useContext(authenticationContext));
};