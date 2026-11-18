import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-blue-500/20">404</p>
      <h1 className="font-display mt-2 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-navy-900/60">The software you're looking for may have moved.</p>
      <Link to="/software" className="mt-6 inline-block rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white">
        Browse all software
      </Link>
    </div>
  );
}
