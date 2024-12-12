type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  console.log('protected');
  return children;
};
