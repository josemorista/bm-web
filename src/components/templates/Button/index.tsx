import { ButtonHTMLAttributes } from 'react';
import { ButtonStyles } from './_styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, ...rest }: IButtonProps) => {
	return <ButtonStyles.Container variant={variant} {...rest}>
		<div className="content">
			{children}
		</div>
	</ButtonStyles.Container>;
};