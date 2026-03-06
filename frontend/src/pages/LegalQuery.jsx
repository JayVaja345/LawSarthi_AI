// frontend/src/pages/LegalQuery.jsx

import { useState } from "react";
import QueryForm from "../components/LegalQuery/QueryForm";
import DocumentDisplay from "../components/LegalQuery/DocumentDisplay";
import { legalApi } from "../services/api";
import { ScaleIcon } from "@heroicons/react/24/outline";

const LegalQuery = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await legalApi.sendQuery(query);

      if (response.success) {
        setResult(response.drafted_document);
      } else {
        setError(
          response.error || "An error occurred while processing your request.",
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuery = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div
      className="min-h-screen py-12"
      style={{
        background: "linear-gradient(160deg, #fdfaf5 0%, #f5f0e8 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "#1a1a2e0a",
              border: "1px solid #c9a84c44",
              color: "#c9a84c",
            }}
          >
            <ScaleIcon className="h-4 w-4" />
            <span
              className="text-sm font-medium tracking-wide"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              AI-Powered Legal Guidance
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-1px" }}
          >
            Law<span style={{ color: "#c9a84c" }}>Sarthi</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Describe your situation in plain language — get professionally
            drafted legal documents instantly.
          </p>

          {/* Divider */}
          <div
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #4f8ef7)",
            }}
          />
        </div>

        {/* Main Content */}
        {!result ? (
          <>
            <QueryForm onSubmit={handleSubmit} loading={loading} />

            {error && (
              <div
                className="mt-6 rounded-xl p-5 flex items-start gap-3"
                style={{
                  background: "#fff5f5",
                  border: "1px solid #fca5a5",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                <span className="text-red-500 text-lg mt-0.5">⚠️</span>
                <div>
                  <p className="text-red-700 font-semibold text-sm mb-1">
                    Something went wrong
                  </p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <DocumentDisplay document={result} />

            <div className="mt-8 text-center">
              <button
                onClick={handleNewQuery}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
                  color: "#c9a84c",
                  border: "2px solid #c9a84c44",
                  boxShadow: "0 4px 20px #1a1a2e22",
                  fontFamily: "'Georgia', serif",
                }}
              >
                ← New Legal Query
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalQuery;
