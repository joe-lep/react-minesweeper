import clsx from "clsx";
import { ReactNode } from "react";
import './Modal.css';

export interface ModalProps {
  open: boolean
  children: ReactNode
  className?: string
}

export default function Modal({ open, children, className }: ModalProps) {
  return (
    <div className={clsx('modal-background', { open })}>
      <div className={clsx('modal', className)}>
        {children}
      </div>
    </div>
  );
}
