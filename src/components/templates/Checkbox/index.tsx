import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FiCheck } from "react-icons/fi";
import { CheckboxStyles } from "./_styles";

interface ICheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string;
}

export const Checkbox = ({ label, checked, ...rest }: ICheckboxProps) => {
	return <CheckboxStyles.Container checked={!!checked}>
		<div className="checkboxMask">
			<FiCheck />
			<input onClick={() => {
				console.log("click");
			}} type="checkbox" checked={checked} {...rest} />
		</div>
		<label>{label}</label>
	</CheckboxStyles.Container>;
};