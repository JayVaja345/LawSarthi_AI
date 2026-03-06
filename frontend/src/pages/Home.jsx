// frontend/src/pages/Home.jsx

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ScaleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── FAQ Item ── */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-amber-100 last:border-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left group"
      >
        <span className="text-gray-800 font-semibold text-lg group-hover:text-amber-700 transition-colors">
          {q}
        </span>
        <ChevronDownIcon
          className="h-5 w-5 text-amber-600 flex-shrink-0 ml-4 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ value, suffix, label, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div className="text-center group">
      <div className="text-5xl font-black text-amber-700 mb-2 tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-gray-500 text-sm uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Is LawSarthi a replacement for a real lawyer?",
    a: "No. LawSarthi is an AI-powered assistant that helps you understand your legal situation, identify relevant IPC sections, and draft initial documents. For court representation or complex matters, always consult a qualified advocate.",
  },
  {
    q: "Which laws does LawSarthi cover?",
    a: "LawSarthi currently focuses on Indian criminal law under the Indian Penal Code (IPC), Bharatiya Nyaya Sanhita (BNS), and related statutes. Civil and family law support is coming soon.",
  },
  {
    q: "How accurate are the drafted documents?",
    a: "Documents are generated using AI trained on legal templates and IPC provisions. They serve as strong starting drafts. We recommend having a legal professional review before formal submission.",
  },
  {
    q: "Is my data safe and private?",
    a: "Your queries are processed securely and are not stored permanently. We do not share your information with third parties. Each session is treated as confidential.",
  },
  {
    q: "Can I upload documents for analysis?",
    a: "Yes! You can paste or upload existing documents — FIRs, notices, contracts — and LawSarthi will analyze and help you understand or respond to them.",
  },
];

const Home = () => {
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);

  /* Intersection observer for stats */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsStarted(true);
      },
      { threshold: 0.4 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* Typewriter effect */
  const phrases = [
    "File an FIR",
    "Draft a Legal Notice",
    "Know Your Rights",
    "Identify IPC Sections",
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        35,
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx]);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#fdfaf5",
      }}
    >
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          minHeight: "92vh",
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, #c9a84c 40px, #c9a84c 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #c9a84c 40px, #c9a84c 41px)`,
          }}
        />

        {/* Glowing orbs */}
        <div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#c9a84c" }}
        />
        <div
          className="absolute bottom-10 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "#4f8ef7" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
            style={{
              borderColor: "#c9a84c44",
              background: "#c9a84c11",
              color: "#c9a84c",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">
              AI-Powered Legal Guidance for India
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-white font-black leading-tight mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontFamily: "'Georgia', serif",
              maxWidth: "900px",
            }}
          >
            Your Digital Guide to{" "}
            <span style={{ color: "#c9a84c" }}>Justice</span>
          </h1>

          {/* Typewriter */}
          <div
            className="flex items-center gap-3 mb-8"
            style={{ minHeight: "56px" }}
          >
            <span className="text-gray-300 text-xl">Helping you</span>
            <span
              className="text-2xl font-bold px-4 py-2 rounded-lg"
              style={{
                background: "#c9a84c22",
                color: "#f5c842",
                border: "1px solid #c9a84c44",
                minWidth: "280px",
                textAlign: "left",
              }}
            >
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Describe your legal issue in plain language. LawSarthi identifies
            IPC sections, finds relevant precedents, and drafts professional
            legal documents — instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/query"
              className="group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "#c9a84c",
                color: "#1a1a2e",
                boxShadow: "0 0 30px #c9a84c44",
              }}
            >
              <ScaleIcon className="h-6 w-6" />
              Start Your Legal Query
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors font-medium"
            >
              See how it works
              <ChevronDownIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDownIcon className="h-6 w-6 text-amber-500 opacity-60" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        ref={statsRef}
        id="stats"
        style={{
          background: "#1a1a2e",
          borderTop: "2px solid #c9a84c33",
          borderBottom: "2px solid #c9a84c33",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 500, suffix: "+", label: "IPC Sections Covered" },
            { value: 10000, suffix: "+", label: "Queries Processed" },
            { value: 98, suffix: "%", label: "Accuracy Rate" },
            { value: 24, suffix: "/7", label: "Always Available" },
          ].map((s) => (
            <div key={s.label} className="text-center group py-4">
              <div
                className="text-5xl font-black mb-2 tabular-nums"
                style={{ color: "#c9a84c", fontFamily: "'Georgia', serif" }}
              >
                {statsStarted ? <AnimatedNumber value={s.value} /> : 0}
                {s.suffix}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        className="py-24 px-6"
        style={{ background: "#fdfaf5" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-700 font-semibold uppercase tracking-widest text-sm mb-3">
              What We Offer
            </p>
            <h2
              className="text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Legal Help, Simplified
            </h2>
            <div
              className="w-16 h-1 mx-auto mt-4 rounded-full"
              style={{ background: "#c9a84c" }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <DocumentTextIcon className="h-8 w-8" />,
                title: "Legal Document Drafting",
                desc: "Get professionally formatted FIRs, legal notices, complaints, and petitions — ready to submit.",
                color: "#4f8ef7",
              },
              {
                icon: <ScaleIcon className="h-8 w-8" />,
                title: "IPC Section Analysis",
                desc: "Automatic identification of applicable Indian Penal Code and BNS sections relevant to your case.",
                color: "#c9a84c",
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8" />,
                title: "Legal Precedents",
                desc: "Reference to landmark court judgments and similar cases that strengthen your legal position.",
                color: "#22c55e",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl p-8 border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "white" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ background: `${f.color}18`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                <div
                  className="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: f.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-24 px-6"
        style={{ background: "#f5f0e8" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-700 font-semibold uppercase tracking-widest text-sm mb-3">
              The Process
            </p>
            <h2
              className="text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              How LawSarthi Works
            </h2>
            <div
              className="w-16 h-1 mx-auto mt-4 rounded-full"
              style={{ background: "#c9a84c" }}
            />
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-10 left-0 right-0 h-0.5 mx-24"
              style={{
                background:
                  "linear-gradient(90deg, #c9a84c, #4f8ef7, #22c55e, #c9a84c)",
              }}
            />

            <div className="grid md:grid-cols-4 gap-8 relative">
              {[
                {
                  num: "01",
                  title: "Describe Your Case",
                  desc: "Tell us what happened in plain language — no legal jargon needed.",
                },
                {
                  num: "02",
                  title: "AI Analyzes",
                  desc: "Our crew of AI agents break down your case facts and identify legal issues.",
                },
                {
                  num: "03",
                  title: "IPC Sections Found",
                  desc: "Relevant penal code sections and precedents are automatically retrieved.",
                },
                {
                  num: "04",
                  title: "Get Your Document",
                  desc: "A professionally drafted legal document is ready for your review.",
                },
              ].map((step, i) => (
                <div key={i} className="text-center group">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 font-black text-2xl relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: "#1a1a2e",
                      color: "#c9a84c",
                      fontFamily: "'Georgia', serif",
                      border: "3px solid #c9a84c",
                    }}
                  >
                    {step.num}
                  </div>
                  <h4
                    className="font-bold text-gray-900 text-lg mb-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-24 px-6"
        style={{ background: "#fdfaf5" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-700 font-semibold uppercase tracking-widest text-sm mb-3">
              Got Questions?
            </p>
            <h2
              className="text-4xl font-black text-gray-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Frequently Asked Questions
            </h2>
            <div
              className="w-16 h-1 mx-auto mt-4 rounded-full"
              style={{ background: "#c9a84c" }}
            />
          </div>

          <div
            className="rounded-2xl overflow-hidden border border-amber-100 shadow-sm"
            style={{ background: "white" }}
          >
            <div className="px-8">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 px-6"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "#c9a84c" }}
          >
            <ScaleIcon className="h-8 w-8 text-white" />
          </div>
          <h2
            className="text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Justice Shouldn't Be Complicated
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            LawSarthi is your trusted guide through India's legal system. Start
            your query today — it's free.
          </p>
          <Link
            to="/query"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "#c9a84c",
              color: "#1a1a2e",
              boxShadow: "0 0 40px #c9a84c55",
            }}
          >
            <ScaleIcon className="h-6 w-6" />
            Start Your Legal Query
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

/* Animated number component */
function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = null;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <>{count.toLocaleString()}</>;
}

export default Home;
