"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Scroll, Sparkles, ArrowRight, ShieldCheck, Award } from "lucide-react";

export default function HeroAnimatedSection() {
  const [mounted, setMounted] = useState(false);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  // Animated counters
  const [countUnits, setCountUnits] = useState(0);
  const [countTeachers, setCountTeachers] = useState(0);
  const [countRoyalty, setCountRoyalty] = useState(0);

  const rotatingTopics = [
    "Common Core Mathematics",
    "Decodable Phonics Folios",
    "NGSS Science Codices",
    "Curated Unit Folios",
    "Grade-Level Unit Plans",
  ];

  useEffect(() => {
    setMounted(true);

    // Rotating headline topic every 2.8s
    const wordTimer = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % rotatingTopics.length);
    }, 2800);

    // Count-up animation on landing
    const duration = 1600; // 1.6s
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const countTimer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCountUnits(Math.round(eased * 10000));
      setCountTeachers(Math.round(eased * 45000));
      setCountRoyalty(parseFloat((eased * 77.5).toFixed(1)));

      if (step >= steps) {
        clearInterval(countTimer);
      }
    }, stepTime);

    return () => {
      clearInterval(wordTimer);
      clearInterval(countTimer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper-200 via-paper-100 to-paper-100 pt-16 pb-20 border-b border-paper-300">
      {/* Floating Ambient Glowing Atmospheric Orbs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-forest-100/60 blur-3xl pointer-events-none animate-orb-float-1 -z-0" />
      <div className="absolute top-24 right-1/4 w-96 h-96 rounded-full bg-brass-100/50 blur-3xl pointer-events-none animate-orb-float-2 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Step 1: Scholastic Pill with Floating Sparkle */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold mb-6 border border-forest-200 shadow-editorial-xs transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Scroll className="w-3.5 h-3.5 text-brass-500 animate-float-subtle" />
          <span>Curated by Master Educators & National Board Certified Fellows</span>
          <span className="w-1.5 h-1.5 rounded-full bg-forest-600 animate-ping" />
        </div>

        {/* Step 2: Main Dynamic Headline with Rotating Topic */}
        <h1
          className={`text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-ink-900 tracking-tight max-w-4xl mx-auto leading-[1.12] transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Timeless teaching manuscripts for{" "}
          <span className="relative inline-block text-forest-700 font-serif italic font-normal">
            <span
              key={activeWordIdx}
              className="inline-block animate-fade-up"
            >
              {rotatingTopics[activeWordIdx]}
            </span>
          </span>
        </h1>

        {/* Step 3: Subtitle */}
        <p
          className={`mt-6 text-base sm:text-lg text-ink-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Spend less time planning on Sunday nights. Discover peer-reviewed unit folios, decodable readers, science codices, and classroom-ready assessment guides.
        </p>

        {/* Step 4: Quick Search Bar with Glowing Pulse */}
        <div
          className={`mt-10 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <form
            action="/search"
            method="GET"
            className="relative flex items-center shadow-editorial rounded-2xl ring-2 ring-forest-700/10 focus-within:ring-forest-700/40 transition-all"
          >
            <input
              type="text"
              name="q"
              placeholder="Search by topic, unit keyword, or CCSS standard (e.g. 5.NF.A.1)..."
              className="w-full pl-12 pr-32 py-4 rounded-2xl border-2 border-paper-400 text-sm sm:text-base text-ink-900 placeholder-ink-500 focus:outline-none focus:border-forest-700 focus:ring-4 focus:ring-forest-100 transition-all bg-paper-50"
            />
            <Search className="w-5 h-5 text-brass-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="submit"
              className="btn-tactile absolute right-2 px-6 py-2.5 bg-forest-700 hover:bg-forest-600 text-paper-50 font-bold rounded-xl text-sm flex items-center gap-2 shadow-editorial-xs border border-forest-800"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Trending Curricula Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-ink-500">
            <span className="font-bold text-ink-900">Popular topics:</span>
            <Link
              href="/search?q=Fractions"
              className="btn-tactile px-3 py-1 bg-paper-200 border border-paper-400 rounded-lg hover:border-forest-700 hover:text-forest-700 transition-colors"
            >
              Fractions Unit
            </Link>
            <Link
              href="/search?q=Phonics"
              className="btn-tactile px-3 py-1 bg-paper-200 border border-paper-400 rounded-lg hover:border-forest-700 hover:text-forest-700 transition-colors"
            >
              CVC Phonics
            </Link>
            <Link
              href="/search?q=Plate+Tectonics"
              className="btn-tactile px-3 py-1 bg-paper-200 border border-paper-400 rounded-lg hover:border-forest-700 hover:text-forest-700 transition-colors"
            >
              Plate Tectonics
            </Link>
            <Link
              href="/search?price=free"
              className="btn-tactile px-3 py-1 bg-forest-100 text-forest-800 border border-forest-200 rounded-lg font-bold hover:bg-forest-200 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-brass-500" />
              <span>Free Resources</span>
            </Link>
          </div>
        </div>

        {/* Step 5: Live Animated Count-Up Scholastic Strip */}
        <div
          className={`mt-14 pt-8 border-t border-paper-300 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto transition-all duration-700 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Metric 1 */}
          <div className="card-depth-subtle p-4 bg-paper-50/90 rounded-2xl border border-paper-300 shadow-editorial-xs group">
            <p className="font-serif text-3xl font-extrabold text-forest-700 tabular-nums">
              {countUnits.toLocaleString()}+
            </p>
            <p className="text-xs text-ink-500 mt-1 font-medium">Peer-Reviewed Units</p>
            <div className="w-8 h-0.5 bg-forest-600/40 rounded-full mx-auto mt-2 group-hover:w-16 transition-all duration-300" />
          </div>

          {/* Metric 2 */}
          <div className="card-depth-subtle p-4 bg-paper-50/90 rounded-2xl border border-paper-300 shadow-editorial-xs group">
            <p className="font-serif text-3xl font-extrabold text-forest-700 tabular-nums">
              {countTeachers.toLocaleString()}+
            </p>
            <p className="text-xs text-ink-500 mt-1 font-medium">Classroom Teachers</p>
            <div className="w-8 h-0.5 bg-forest-600/40 rounded-full mx-auto mt-2 group-hover:w-16 transition-all duration-300" />
          </div>

          {/* Metric 3 */}
          <div className="card-depth-subtle p-4 bg-paper-50/90 rounded-2xl border border-paper-300 shadow-editorial-xs group">
            <p className="font-serif text-3xl font-extrabold text-forest-700 tabular-nums">
              {countRoyalty}%
            </p>
            <p className="text-xs text-ink-500 mt-1 font-medium">Teacher Royalty Tier</p>
            <div className="w-8 h-0.5 bg-brass-500 rounded-full mx-auto mt-2 group-hover:w-16 transition-all duration-300" />
          </div>

          {/* Metric 4 */}
          <div className="card-depth-subtle p-4 bg-paper-50/90 rounded-2xl border border-paper-300 shadow-editorial-xs group">
            <p className="font-serif text-3xl font-extrabold text-forest-700 tabular-nums">
              100%
            </p>
            <p className="text-xs text-ink-500 mt-1 font-medium">CCSS/NGSS Aligned</p>
            <div className="w-8 h-0.5 bg-forest-600/40 rounded-full mx-auto mt-2 group-hover:w-16 transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

