import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { ModalStyles } from "./styles";

export interface IModalHandle {
	openModal: () => void;
	closeModal: () => void;
}

interface IModalProps {
	initialModalState?: boolean;
	open?: boolean;
	listenClickAway?: boolean;
	onCloseEvent?(): Promise<void> | void;
	children?: React.ReactNode;
}

export const Modal = forwardRef<IModalHandle, IModalProps>(
	({ children, open, onCloseEvent, initialModalState, listenClickAway = true }, ref) => {

		const [isOpen, setIsOpen] = useState<boolean>(() => {
			if (open !== undefined) return open;
			if (initialModalState !== undefined) return initialModalState;
			return false;
		});

		const modalContentRef = useRef<HTMLDivElement>(null);

		const openModal = useCallback(() => {
			if (open === undefined) {
				setIsOpen(true);
			}
		}, [open]);

		const closeModal = useCallback(() => {
			if (open === undefined) {
				setIsOpen(false);
			}
		}, [open]);

		useImperativeHandle(ref, () => {
			return {
				openModal,
				closeModal
			};
		});

		useEffect(() => {
			if (open !== undefined) {
				setIsOpen(open);
			}
		}, [open]);

		if (!isOpen) {
			return null;
		}

		return <ModalStyles.Container className='modal' onClick={(event) => {
			if (listenClickAway) {
				if (!modalContentRef.current?.contains(event.target as Node)) {
					if (onCloseEvent) {
						onCloseEvent();
					}
					if (open === undefined) {
						setIsOpen(false);
					}
				}
			}
		}}>
			<div className="content" ref={modalContentRef}>
				{children}
			</div>
		</ModalStyles.Container>;
	});