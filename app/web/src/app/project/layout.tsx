
// No SEO yet and Meta tags are remaining
export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-2xl mx-auto px-2.5">
      {children}
    </div>
  );
}
