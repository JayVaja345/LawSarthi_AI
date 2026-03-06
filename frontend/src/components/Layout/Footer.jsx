import React from "react";
import { ScaleIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer style={{ background: "#111122", borderTop: "1px solid #c9a84c33" }}>
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <ScaleIcon className="h-5 w-5" style={{ color: "#c9a84c" }} />
          <span
            className="text-white font-bold"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Law<span style={{ color: "#c9a84c" }}>Sarthi</span>
          </span>
        </div>
        <p className="text-gray-500 text-sm text-center">
          © 2025 LawSarthi. For informational purposes only. Not a substitute
          for legal advice.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-gray-500 hover:text-amber-400 text-sm transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
