import clsx from "clsx";
import { ElementType, ReactNode } from "react";
import './CapsuleControl.scss';

export interface CapsuleControlProps {
  children?: ReactNode,
  Component?: ElementType,
  WrapperComponent?: ElementType,
  className?: string,
  wrapperClassName?: string,
}

export default function CapsuleControl({ children, WrapperComponent= 'div', Component = 'div', className, wrapperClassName }: CapsuleControlProps) {
  return (
    <WrapperComponent className={clsx('capsule-control-wrapper', wrapperClassName)}>
      <Component className={clsx('capsule-control', className)}>
        {children}
      </Component>
    </WrapperComponent>
  );
}
