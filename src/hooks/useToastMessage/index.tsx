import { createContext, useCallback, useContext, useState } from "react";
import { ToastMessage } from "../../components/templates/ToastMessage";

interface IToastMessage {
	message: string;
	type: "error" | "info" | "success"
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

	const setToastMessage: IToastMessageContext["setToastMessage"] = useCallback((data) => {
		setMessage(data);
		setTimeout(() => {
			setMessage(null);
		}, 5000);
	}, []);

	return <toastMessageContext.Provider value={{ setToastMessage }}>
		{toastMessage && <ToastMessage message={toastMessage.message} variant={toastMessage.type} />}
		{children}
	</toastMessageContext.Provider>;
};


export const useToastMessage = (): IToastMessageContext => {
	return useContext(toastMessageContext);
};