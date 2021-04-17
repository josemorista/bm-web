import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ToastMessage } from '../../components/ToastMessage';

interface IToastMessage {
	message: string;
	type: 'error' | 'info' | 'success'
}

interface IToastMessageContext {
	setToastMessage: (data: IToastMessage) => void;
}

const toastMessageContext = createContext<IToastMessageContext>({} as IToastMessageContext);

interface IToastMessageProviderProps {
	children: React.ReactNode;
}

export const ToastMessageProvider = ({ children }: IToastMessageProviderProps) => {

	const [toastMessage, setMessage] = useState<IToastMessage | null>(null);

	useEffect(() => {
		if (toastMessage) {
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	}, [toastMessage]);

	const setToastMessage: IToastMessageContext['setToastMessage'] = useCallback((data) => {
		setMessage(data);
	}, []);

	return <toastMessageContext.Provider value={{ setToastMessage }}>
		{toastMessage && <ToastMessage message={toastMessage.message} variant={toastMessage.type} />}
		{children}
	</toastMessageContext.Provider>;
};


export const useToastMessage = (): IToastMessageContext => {
	return useContext(toastMessageContext);
};