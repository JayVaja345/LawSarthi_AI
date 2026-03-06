import { useState } from "react";
import { ScaleIcon } from "@heroicons/react/24/outline";

const QueryForm = ({ onSubmit, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <div
      className="rounded-2xl p-8 mb-8"
      style={{
        background: "white",
        border: "1px solid #c9a84c33",
        boxShadow: "0 4px 40px rgba(201,168,76,0.08)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ background: "#1a1a2e" }}>
          <ScaleIcon className="h-5 w-5" style={{ color: "#c9a84c" }} />
        </div>
        <h2
          className="text-2xl font-black text-gray-900"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Describe Your Legal Issue
        </h2>
      </div>
      <p className="text-gray-400 text-sm mb-8 ml-12">
        Write in plain language — no legal jargon needed.
      </p>

      {/* Divider */}
      <div
        className="h-px w-full mb-8"
        style={{
          background:
            "linear-gradient(90deg, #c9a84c44, #4f8ef722, transparent)",
        }}
      />

      <div className="mb-6">
        <label
          htmlFor="query"
          className="block text-sm font-semibold mb-3 uppercase tracking-widest"
          style={{ color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}
        >
          Your Question or Case Description
        </label>
        <div className="relative">
          <textarea
            id="query"
            rows={6}
            className="w-full px-4 py-4 rounded-xl text-gray-800 placeholder-gray-300 transition-all duration-200 outline-none resize-none"
            style={{
              border: "1.5px solid #e5e0d5",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.95rem",
              lineHeight: "1.7",
              background: "#fdfaf5",
            }}
            onFocus={(e) => {
              e.target.style.border = "1.5px solid #c9a84c";
              e.target.style.boxShadow = "0 0 0 3px #c9a84c18";
            }}
            onBlur={(e) => {
              e.target.style.border = "1.5px solid #e5e0d5";
              e.target.style.boxShadow = "none";
            }}
            placeholder="Example: A man broke into my house at night while my family was sleeping. He stole jewelry and cash from our bedroom. When I confronted him, he threatened me with a knife and ran away. What legal charges should be filed?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          {/* Character count */}
          <span
            className="absolute bottom-3 right-4 text-xs"
            style={{
              color: query.length > 800 ? "#ef4444" : "#c9a84c99",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {query.length} chars
          </span>
        </div>
      </div>

      {/* Tip box */}
      <div
        className="rounded-xl px-5 py-4 mb-6 flex gap-3 items-start"
        style={{ background: "#1a1a2e08", border: "1px solid #c9a84c22" }}
      >
        <span style={{ color: "#c9a84c", fontSize: "1.1rem" }}>💡</span>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "#6b7280", fontFamily: "system-ui, sans-serif" }}
        >
          <strong style={{ color: "#1a1a2e" }}>Tip:</strong> Include details
          like when it happened, who was involved, what was said or done, and
          any evidence you have. The more detail you provide, the better the
          legal analysis.
        </p>
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading || !query.trim()}
        className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3"
        style={{
          background:
            loading || !query.trim()
              ? "#d1c9b8"
              : "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
          color: loading || !query.trim() ? "#9ca3af" : "#c9a84c",
          cursor: loading || !query.trim() ? "not-allowed" : "pointer",
          border: "2px solid",
          borderColor: loading || !query.trim() ? "transparent" : "#c9a84c44",
          boxShadow: loading || !query.trim() ? "none" : "0 4px 20px #1a1a2e33",
          fontFamily: "'Georgia', serif",
          letterSpacing: "0.5px",
        }}
        onMouseEnter={(e) => {
          if (!loading && query.trim()) e.target.style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
        }}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analyzing Your Case...
          </>
        ) : (
          <>
            <ScaleIcon className="h-5 w-5" />
            Get Legal Analysis
          </>
        )}
      </button>

      {/* Disclaimer */}
      <p
        className="text-center text-xs mt-4"
        style={{ color: "#9ca3af", fontFamily: "system-ui, sans-serif" }}
      >
        🔒 Your query is processed securely. LawSarthi does not store personal
        data.
      </p>
    </div>
  );
};

export default QueryForm;
