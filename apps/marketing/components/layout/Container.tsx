import { ReactNode } from "react";

interface ContainerProps {
  children : ReactNode;
  className ?: string
}

export default function Container({
  children,
  className = ""
}: ContainerProps){
  return (
    <div className={`mx-auto w-full px-6 max-w-[1900px] lg:px-10 xl:px-11 ${className}`}>
      {children}
    </div>
  );
}