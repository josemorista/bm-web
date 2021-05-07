import { ToastMessageStyles } from './_styles';
import { FiAlertCircle, FiInfo } from 'react-icons/fi';
import { AiOutlineLike } from 'react-icons/ai';

interface IToastMessageProps {
	variant?: 'error' | 'success' | 'info';
	message: string;
}

const variantsIcons = {
	error: <FiAlertCircle />,
	info: <FiInfo />,
	success: <AiOutlineLike />
};

export const ToastMessage = ({ message, variant = 'info' }: IToastMessageProps) => {
	return <ToastMessageStyles.Container variant={variant}>
		{variantsIcons[variant]}
		<p>
			{message}
		</p>
	</ToastMessageStyles.Container>;
};