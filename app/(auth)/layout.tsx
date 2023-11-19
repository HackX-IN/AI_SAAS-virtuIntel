const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      {children}
    </div>
  );
};
export default AuthLayout;
