export const RenderIf = ({
  condition,
  children,
  fallback,
}: {
  condition?: unknown;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  if (!!condition) {
    return children;
  }

  return fallback ?? null;
};
