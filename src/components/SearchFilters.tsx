"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw, Check, ChevronDown, ChevronUp } from "lucide-react";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGrade = searchParams.get("grade") || "all";
  const currentSubject = searchParams.get("subject") || "all";
  const currentPrice = searchParams.get("price") || "all";
  const currentFormat = searchParams.get("format") || "all";
  const currentQ = searchParams.get("q") || "";

  const [openSections, setOpenSections] = useState({
    grade: true,
    subject: true,
    format: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/search?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/search");
  };

  const grades = [
    { label: "All Grades", value: "all" },
    { label: "Pre-K & Kindergarten", value: "Kindergarten" },
    { label: "1st – 2nd Grade", value: "1st Grade" },
    { label: "3rd Grade", value: "3rd Grade" },
    { label: "5th Grade", value: "5th Grade" },
    { label: "6th – 8th Grade", value: "6th Grade" },
    { label: "High School (9–12)", value: "High School" },
  ];

  const subjects = [
    { label: "All Subjects", value: "all" },
    { label: "Math & Operations", value: "Math" },
    { label: "ELA & Phonics", value: "ELA" },
    { label: "Science & Discovery", value: "Science" },
    { label: "Social Studies & History", value: "Social Studies" },
    { label: "Classroom Management", value: "Classroom Management" },
  ];

  const formats = [
    { label: "All Formats", value: "all" },
    { label: "⚡ Easel Interactive Activity", value: "Easel" },
    { label: "📄 PDF Printable Unit", value: "PDF" },
    { label: "📊 Google Slides & Apps", value: "Google" },
  ];

  const prices = [
    { label: "Any Price", value: "all" },
    { label: "Free Resources", value: "free" },
    { label: "Under $5.00", value: "under-5" },
    { label: "$5.00 – $10.00", value: "5-to-10" },
    { label: "$10.00+", value: "10-plus" },
  ];

  const hasActiveFilters =
    currentGrade !== "all" ||
    currentSubject !== "all" ||
    currentPrice !== "all" ||
    currentFormat !== "all" ||
    currentQ !== "";

  return (
    <aside className="bg-paper-50 rounded-3xl border border-paper-400 p-5 space-y-6 shadow-editorial-xs font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-300">
        <div className="flex items-center gap-2 font-bold text-ink-900 text-sm">
          <Filter className="w-4 h-4 text-forest-700" />
          <span>Filter Resources</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="btn-tactile text-xs text-terracotta-600 hover:underline flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Grade Level */}
      <div>
        <button
          onClick={() => toggleSection("grade")}
          className="btn-tactile w-full flex items-center justify-between text-xs font-bold uppercase text-forest-800 tracking-wider mb-2.5"
        >
          <span>Grade Band</span>
          {openSections.grade ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.grade && (
          <div className="space-y-1 animate-fade-in">
            {grades.map((g) => (
              <button
                key={g.value}
                onClick={() => updateParam("grade", g.value)}
                className={`btn-tactile w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  currentGrade === g.value
                    ? "bg-forest-100 text-forest-800 font-bold border border-forest-200"
                    : "text-ink-600 hover:bg-paper-200 hover:text-ink-900"
                }`}
              >
                <span>{g.label}</span>
                {currentGrade === g.value && <Check className="w-3.5 h-3.5 text-forest-700" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subject Area */}
      <div className="pt-4 border-t border-paper-300">
        <button
          onClick={() => toggleSection("subject")}
          className="btn-tactile w-full flex items-center justify-between text-xs font-bold uppercase text-forest-800 tracking-wider mb-2.5"
        >
          <span>Subject Area</span>
          {openSections.subject ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.subject && (
          <div className="space-y-1 animate-fade-in">
            {subjects.map((s) => (
              <button
                key={s.value}
                onClick={() => updateParam("subject", s.value)}
                className={`btn-tactile w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  currentSubject === s.value
                    ? "bg-forest-100 text-forest-800 font-bold border border-forest-200"
                    : "text-ink-600 hover:bg-paper-200 hover:text-ink-900"
                }`}
              >
                <span>{s.label}</span>
                {currentSubject === s.value && <Check className="w-3.5 h-3.5 text-forest-700" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Format */}
      <div className="pt-4 border-t border-paper-300">
        <button
          onClick={() => toggleSection("format")}
          className="btn-tactile w-full flex items-center justify-between text-xs font-bold uppercase text-forest-800 tracking-wider mb-2.5"
        >
          <span>Format & Tooling</span>
          {openSections.format ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.format && (
          <div className="space-y-1 animate-fade-in">
            {formats.map((f) => (
              <button
                key={f.value}
                onClick={() => updateParam("format", f.value)}
                className={`btn-tactile w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  currentFormat === f.value
                    ? "bg-forest-100 text-forest-800 font-bold border border-forest-200"
                    : "text-ink-600 hover:bg-paper-200 hover:text-ink-900"
                }`}
              >
                <span>{f.label}</span>
                {currentFormat === f.value && <Check className="w-3.5 h-3.5 text-forest-700" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="pt-4 border-t border-paper-300">
        <button
          onClick={() => toggleSection("price")}
          className="btn-tactile w-full flex items-center justify-between text-xs font-bold uppercase text-forest-800 tracking-wider mb-2.5"
        >
          <span>Price Filter</span>
          {openSections.price ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {openSections.price && (
          <div className="space-y-1 animate-fade-in">
            {prices.map((p) => (
              <button
                key={p.value}
                onClick={() => updateParam("price", p.value)}
                className={`btn-tactile w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  currentPrice === p.value
                    ? "bg-forest-100 text-forest-800 font-bold border border-forest-200"
                    : "text-ink-600 hover:bg-paper-200 hover:text-ink-900"
                }`}
              >
                <span>{p.label}</span>
                {currentPrice === p.value && <Check className="w-3.5 h-3.5 text-forest-700" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
