import { ButtonHTMLAttributes } from "react";
import { ButtonStyles } from "./_styles";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	ariaLabel: string
	children: React.ReactNode;
}

export const Button = ({ variant = "primary", children, ariaLabel, ...rest }: IButtonProps) => {
	return <ButtonStyles.Container variant={variant} {...rest}>
		<div className="content" aria-label={ariaLabel} >
			{children}
		</div>
	</ButtonStyles.Container>;
};