import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { IUser } from '../../domain/modules/users/entities/IUser';
import { IUserCredentials } from '../../domain/modules/users/entities/IUserCredentials';
import { UserServicesFactory } from '../../domain/modules/users/factories/UserServicesFactory';
import { UserSessionsServicesFactory } from '../../domain/modules/users/factories/UserSessionsServicesFactory';

interface IAuthenticationContext {
	user: IUser;
	signed: boolean;
	token: string;
	signIn(data: Pick<IUser, 'email' | 'password'>): Promise<void>;
	signUp(data: Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'job' | 'relatedInstitution'>): Promise<void>;
	logout(): Promise<void>
}

const authenticationContext = createContext<IAuthenticationContext>({} as IAuthenticationContext);

interface IAuthenticationProviderProps {
	children: React.ReactNode;
}

// services
const createUserService = UserServicesFactory.createCreateUserService();
const createUserSessionService = UserSessionsServicesFactory.createCreateUserSessionService();
const getUserSessionService = UserSessionsServicesFactory.createGetUserSessionService();
const closeUserSessionService = UserSessionsServicesFactory.createCloseUserSessionService();
const getUserService = UserServicesFactory.createGetUserService();

export const AuthenticationProvider = ({ children }: IAuthenticationProviderProps) => {

	const [contextState, setContextState] = useState<{
		user: IUser,
		credentials: IUserCredentials
	} | undefined>(undefined);

	const signIn: IAuthenticationContext['signIn'] = useCallback(async (data) => {
		const credentials = await createUserSessionService.execute(data);
		const user = await getUserService.execute({
			userId: credentials.userId,
			authorizeToken: credentials.token
		});
		if (user) {
			setContextState({
				user,
				credentials
			});
		}
	}, []);

	const signUp: IAuthenticationContext['signUp'] = useCallback((data) => {
		return createUserService.execute(data);
	}, []);

	const logout: IAuthenticationContext['logout'] = useCallback(async () => {
		await closeUserSessionService.execute();
		setContextState({
			user: {} as IUser,
			credentials: {} as IUserCredentials
		});
	}, []);

	useEffect(() => {
		getUserSessionService.execute().then(credentials => {
			if (credentials) {
				getUserService.execute({
					userId: credentials.userId,
					authorizeToken: credentials.token
				}).then(user => {
					if (user) {
						setContextState({
							user,
							credentials
						});
					} else {
						logout();
					}
				});
			} else {
				logout();
			}
		}).catch(() => {
			logout();
		});
	}, [logout]);

	if (contextState === undefined) {
		return null;
	}

	return <authenticationContext.Provider value={{
		user: contextState.user,
		token: contextState.credentials.token,
		signIn,
		signUp,
		logout,
		signed: !!contextState.user.id
	}}>
		{children}
	</authenticationContext.Provider>;
};

export const useAuthentication = (): IAuthenticationContext => {
	return (useContext(authenticationContext));
};