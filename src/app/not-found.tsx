import React from "react";
import Link from "next/link";
import { BookOpen, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-paper-100 px-4 py-16">
      <div className="max-w-md w-full bg-paper-50 border-2 border-paper-300 rounded-[2.25rem] p-8 text-center shadow-editorial-lg">
        <div className="w-16 h-16 rounded-2xl bg-forest-100 border border-forest-200 text-forest-700 mx-auto flex items-center justify-center mb-6">
          <BookOpen className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold text-brass-600 uppercase tracking-wider block mb-1">
          Catalog Archive
        </span>
        <h1 className="font-serif text-3xl font-black text-ink-900 tracking-tight">
          Manuscript Not Found
        </h1>
        <p className="text-xs sm:text-sm text-ink-600 mt-3 leading-relaxed">
          The educational folio, lesson bundle, or teacher manuscript you requested cannot be located in the current curriculum repository.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-tactile px-5 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-600 text-paper-50 text-xs font-bold flex items-center justify-center gap-2 border border-forest-800 shadow-editorial-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Repository</span>
          </Link>
          <Link
            href="/search"
            className="btn-tactile px-5 py-2.5 rounded-xl bg-paper-200 hover:bg-paper-300 text-ink-900 text-xs font-bold flex items-center justify-center gap-2 border border-paper-400"
          >
            <Search className="w-4 h-4" />
            <span>Search Folios</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

