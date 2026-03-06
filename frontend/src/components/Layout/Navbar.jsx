import { Link } from "react-router-dom";
import { ScaleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav
      style={{ background: "#1a1a2e", borderBottom: "2px solid #c9a84c" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div
            style={{ background: "#c9a84c", borderRadius: "8px" }}
            className="p-2"
          >
            <ScaleIcon className="h-6 w-6 text-white" />
          </div>
          <span
            className="text-white text-2xl font-black tracking-tight"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.5px" }}
          >
            Law<span style={{ color: "#c9a84c" }}>Sarthi</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-gray-300 hover:text-amber-400 transition-colors text-sm tracking-wide font-medium"
            >
              {item}
            </a>
          ))}
          <Link
            to="/"
            className="text-gray-300 hover:text-amber-400 transition-colors text-sm tracking-wide font-medium"
          >
            Home
          </Link>
          <Link
            to="/query"
            style={{ background: "#c9a84c", color: "#1a1a2e" }}
            className="px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Legal Query
          </Link>
        </div>

        {/* Mobile menu - simple */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/"
            className="text-gray-300 hover:text-amber-400 text-sm transition-colors"
          >
            Home
          </Link>
          <Link
            to="/query"
            style={{ background: "#c9a84c", color: "#1a1a2e" }}
            className="px-4 py-2 rounded-lg font-bold text-sm"
          >
            Query
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
