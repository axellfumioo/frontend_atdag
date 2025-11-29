export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* COPYRIGHT */}
        <p className="text-sm text-slate-600">
          © {year} Export Indonesia — All rights reserved.
        </p>

        {/* LINKS */}
        <div className="flex items-center gap-4 text-sm">
          <a href="/terms" className="hover:underline text-slate-600">
            Terms
          </a>
          <a href="/privacy" className="hover:underline text-slate-600">
            Privacy
          </a>
        </div>

      </div>
    </footer>
  );
}
