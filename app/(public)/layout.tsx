export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-3xl">
        {children}
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground pb-8">
        Powered by DropForm
      </footer>
    </div>
  );
}
