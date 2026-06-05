export default function AuthLayout({ children }) {
  return (
    <div className="bg-pattern flex min-h-screen items-center justify-center p-4">
      {children}
    </div>
  );
}
