export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-accent-warm/5 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
