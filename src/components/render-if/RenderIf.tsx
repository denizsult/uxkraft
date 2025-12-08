import type { ReactNode } from "react";

export const RenderIf = ({
  condition,
  children,
  fallback,
}: {
  condition?: unknown;
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  if (!!condition) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
};
