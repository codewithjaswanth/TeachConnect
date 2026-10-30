"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import {
  Search,
  ShoppingBag,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Layers,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Tag,
} from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalCount, setIsDrawerOpen } = useCart();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: '/' focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setMobileMenuOpen(false);
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-paper-100/95 backdrop-blur-md border-b border-paper-300 shadow-editorial-xs">
      {/* Top Banner - Scholastic Announcement */}
      <div className="bg-forest-900 text-paper-50 text-xs py-2 px-4 text-center font-sans tracking-normal flex items-center justify-center gap-2 border-b border-forest-950">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brass-400" />
          <span>Fall Semester Curriculum Archives: Over 10,000+ teacher-reviewed unit folios & classroom manuscripts.</span>
        </span>
        <Link
          href="/search?price=free"
          className="inline-flex items-center gap-0.5 font-bold text-brass-200 hover:text-white underline underline-offset-2 ml-1"
        >
          <span>Free Curriculum</span>
          <ArrowRight className="w-3 h-3 inline" />
        </Link>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 flex-shrink-0 group focus-visible:ring-2 focus-visible:ring-forest-700 rounded-xl"
            aria-label="TeachConnect Home"
          >
            <div className="w-11 h-11 rounded-xl bg-forest-700 border border-brass-400/40 flex items-center justify-center text-paper-50 shadow-editorial-sm group-hover:bg-forest-600 transition-colors">
              <GraduationCap className="w-6 h-6 text-brass-200" />
            </div>
            <div>
              <span className="text-2xl font-serif font-black tracking-tight text-ink-900 flex items-center leading-none">
                Teach<span className="text-forest-700 font-serif italic font-normal ml-0.5">Connect</span>
              </span>
              <span className="block text-[10px] text-brass-600 font-sans tracking-widest uppercase font-bold mt-1">
                Educator Resource Marketplace
              </span>
            </div>
          </Link>

          {/* Search Bar with Shortcut */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl relative hidden md:block" role="search">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search unit plans, decodable readers, CCSS standards (e.g. 5.NF.A.1)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-2.5 bg-paper-200/80 border border-paper-400 hover:border-paper-500 focus:border-forest-700 focus:bg-paper-50 rounded-xl text-xs font-sans text-ink-900 placeholder-ink-500 focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-brass-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-ink-500 bg-paper-300 border border-paper-400 rounded shadow-2xs">
                  /
                </kbd>
                <button
                  type="submit"
                  className="btn-tactile px-3 py-1.5 bg-forest-700 hover:bg-forest-600 text-paper-50 text-xs font-sans font-semibold rounded-lg shadow-xs"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Navigation Links & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/search"
              className={`btn-tactile hidden sm:flex items-center gap-1.5 text-xs font-sans font-semibold px-3 py-2 rounded-xl transition ${
                pathname.startsWith("/search")
                  ? "bg-forest-100 text-forest-800 font-bold"
                  : "text-ink-900 hover:text-forest-700 hover:bg-paper-200"
              }`}
            >
              <Layers className="w-4 h-4 text-brass-500" />
              <span>Catalog</span>
            </Link>

            <Link
              href="/library"
              className={`btn-tactile flex items-center gap-1.5 text-xs font-sans font-semibold px-3 py-2 rounded-xl transition ${
                pathname.startsWith("/library")
                  ? "bg-forest-100 text-forest-800 font-bold"
                  : "text-ink-900 hover:text-forest-700 hover:bg-paper-200"
              }`}
            >
              <BookOpen className="w-4 h-4 text-brass-500" />
              <span className="hidden sm:inline">My Library</span>
            </Link>

            <Link
              href="/seller/dashboard"
              className={`btn-tactile hidden md:flex items-center gap-1.5 text-xs font-sans font-semibold px-3.5 py-2 rounded-xl border transition shadow-editorial-xs ${
                pathname.startsWith("/seller")
                  ? "bg-forest-700 text-paper-50 border-forest-800 font-bold"
                  : "bg-forest-100 text-forest-800 border-forest-200 hover:bg-forest-200"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-brass-500" />
              <span>Author Desk</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="btn-tactile relative p-2.5 text-ink-900 hover:text-forest-700 rounded-xl hover:bg-paper-200 border border-paper-400 bg-paper-50 shadow-editorial-xs focus-visible:ring-2 focus-visible:ring-forest-700"
              aria-label={`Shopping cart with ${totalCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-forest-700" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-forest-700 text-paper-50 text-[11px] font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-paper-50 shadow-editorial-xs tabular-nums">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-tactile p-2.5 text-ink-900 hover:text-forest-700 rounded-xl hover:bg-paper-200 border border-paper-400 md:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="py-2.5 md:hidden border-t border-paper-300">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search curriculum, printables, CCSS..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-20 py-2 bg-paper-200 border border-paper-400 rounded-xl text-xs font-sans text-ink-900 placeholder-ink-500 focus:outline-none focus:border-forest-700"
            />
            <Search className="w-4 h-4 text-brass-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="submit"
              className="btn-tactile absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-forest-700 text-paper-50 text-xs font-sans font-semibold rounded-lg"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-paper-300 space-y-2 font-sans animate-fade-in">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-tactile flex items-center justify-between p-3 rounded-xl bg-paper-200 text-xs font-semibold text-ink-900"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brass-500" />
                <span>Explore Full Catalog</span>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-500" />
            </Link>

            <Link
              href="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-tactile flex items-center justify-between p-3 rounded-xl bg-paper-200 text-xs font-semibold text-ink-900"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brass-500" />
                <span>My Library Vault</span>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-500" />
            </Link>

            <Link
              href="/seller/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-tactile flex items-center justify-between p-3 rounded-xl bg-forest-100 text-xs font-bold text-forest-800 border border-forest-200"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-forest-700" />
                <span>Author Desk (Seller Portal)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-forest-700" />
            </Link>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <Link
                href="/search?price=free"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-tactile px-3 py-1.5 bg-paper-50 border border-paper-400 rounded-lg text-forest-800 font-semibold flex items-center gap-1"
              >
                <Tag className="w-3.5 h-3.5 text-brass-500" />
                <span>Free Resources</span>
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-tactile px-3 py-1.5 bg-paper-50 border border-paper-400 rounded-lg text-forest-800 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-brass-500" />
                <span>Curated Unit Folios</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
