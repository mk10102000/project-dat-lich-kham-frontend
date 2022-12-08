import { Navigate } from 'react-router';

export const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const ProtectedRouteAdmin = ({ isLogin, children }) => {
  if (
    !isLogin ||
    isLogin.maQuyen === 'user' ||
    isLogin.maQuyen === 'bacSi' ||
    isLogin.maQuyen === 'bacsi'
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};
