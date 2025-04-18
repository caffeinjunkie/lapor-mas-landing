export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-center justify-center py-4 lg:py-8 px-8">
      {children}
    </section>
  );
}
