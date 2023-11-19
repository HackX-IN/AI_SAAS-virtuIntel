const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex translate-x-3/2 translate-y-1/2 items-center justify-center">
      {children}
    </div>
  );
};
export default AuthLayout;
