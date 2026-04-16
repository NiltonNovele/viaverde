import React, { ReactNode } from "react";

interface AppMarginProps {
  children: ReactNode;
  className?: string;
}

export default function AppMargin({ children, className = "" }: AppMarginProps) {
  return (
    <div className={`mx-auto max-w-full px-4 py-10 lg:px-[160px] ${className}`}>
      {children}
    </div>
  );
}
