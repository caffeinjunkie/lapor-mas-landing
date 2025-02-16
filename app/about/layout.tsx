import { Link } from "@heroui/link";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
      <footer className="w-full flex items-center justify-center py-3 absolute bottom-4">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/caffeinjunkie/lapor-mas-landing"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Copyright © 2025</span>
          <p className="text-primary">Caffeinjunkie</p>
        </Link>
      </footer>
    </section>
  );
}
