"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Feather, CheckCircle2, Lock, FileCheck } from "lucide-react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-paper-200 border-t border-paper-300 mt-24 text-ink-900 font-sans">
      {/* Newsletter / Educator Digest Banner */}
      <div className="border-b border-paper-300 bg-paper-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-[11px] font-bold text-brass-600 uppercase tracking-wider block">
                Educator Curriculum Dispatch
              </span>
              <h3 className="text-xl font-serif font-black text-ink-900 mt-1">
                Weekly master lesson plans & free printables
              </h3>
              <p className="text-xs text-ink-600 mt-1 leading-relaxed">
                Join 45,000+ classroom teachers receiving peer-reviewed unit folios directly to their inbox every Sunday afternoon.
              </p>
            </div>

            <div className="w-full md:w-auto flex-1 max-w-md">
              {subscribed ? (
                <div className="p-3 bg-forest-100 text-forest-800 rounded-xl text-xs font-bold flex items-center gap-2 border border-forest-200 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-forest-700" />
                  <span>Subscribed! Check your school inbox for your first free curriculum unit.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your school email (.edu or district)..."
                    className="flex-1 px-4 py-2.5 bg-paper-200 border border-paper-400 focus:border-forest-700 rounded-xl text-xs font-sans text-ink-900 placeholder-ink-500 focus:outline-none focus:bg-paper-50 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="btn-tactile px-4 py-2.5 bg-forest-700 hover:bg-forest-600 text-paper-50 text-xs font-sans font-bold rounded-xl shadow-editorial-xs flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Subscribe</span>
                  </button>
                </form>
              )}
              <div className="flex items-center gap-3 mt-2 text-[10px] text-ink-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-forest-700" /> 100% Free
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-forest-700" /> No Spam, Unsubscribe Anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-forest-700 border border-brass-400/40 flex items-center justify-center text-paper-50 shadow-editorial-xs">
                <GraduationCap className="w-5 h-5 text-brass-200" />
              </div>
              <div>
                <span className="font-serif font-black text-lg text-ink-900 tracking-tight">TeachConnect</span>
                <span className="block text-[9px] uppercase tracking-widest text-brass-600 font-bold">
                  Scholastic Marketplace
                </span>
              </div>
            </Link>
            <p className="text-xs text-ink-600 leading-relaxed">
              The premier educator-to-educator curriculum exchange. Peer-reviewed unit plans, Common Core aligned decodables, and interactive digital assignments.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest-800 bg-forest-100 px-2 py-0.5 rounded-md border border-forest-200">
                <FileCheck className="w-3 h-3 text-forest-700" />
                <span>CCSS & NGSS Mapped</span>
              </span>
            </div>
          </div>

          {/* Curriculum Index */}
          <div>
            <h4 className="text-xs font-bold uppercase text-forest-800 tracking-wider mb-4 border-b border-paper-400 pb-1.5">
              Curriculum Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-600">
              <li>
                <Link href="/search?grade=Kindergarten" className="hover:text-forest-700 transition-colors">
                  Early Childhood (Pre-K – K)
                </Link>
              </li>
              <li>
                <Link href="/search?grade=1st+Grade" className="hover:text-forest-700 transition-colors">
                  Primary Elementary (1st – 3rd)
                </Link>
              </li>
              <li>
                <Link href="/search?grade=5th+Grade" className="hover:text-forest-700 transition-colors">
                  Upper Elementary (4th – 5th)
                </Link>
              </li>
              <li>
                <Link href="/search?grade=6th+Grade" className="hover:text-forest-700 transition-colors">
                  Middle School Curricula
                </Link>
              </li>
              <li>
                <Link href="/search?grade=High+School" className="hover:text-forest-700 transition-colors">
                  High School Academics
                </Link>
              </li>
              <li>
                <Link href="/search?price=free" className="text-forest-800 font-semibold hover:underline">
                  Free Teacher Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Teacher-Authors */}
          <div>
            <h4 className="text-xs font-bold uppercase text-forest-800 tracking-wider mb-4 border-b border-paper-400 pb-1.5">
              Teacher-Authors
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-600">
              <li>
                <Link href="/seller/dashboard" className="hover:text-forest-700 transition-colors">
                  Author Desk & Analytics
                </Link>
              </li>
              <li>
                <Link href="/seller/products/new" className="hover:text-forest-700 transition-colors">
                  Publish New Curriculum
                </Link>
              </li>
              <li>
                <Link href="/seller/payouts" className="hover:text-forest-700 transition-colors">
                  Stripe Payouts & 77.5% Tiers
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-forest-700 transition-colors">
                  Buyer Download Vault
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-forest-700 transition-colors">
                  School District PO Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase text-forest-800 tracking-wider mb-4 border-b border-paper-400 pb-1.5">
              Educational Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-600">
              <li className="flex items-center gap-2 text-forest-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-brass-500 flex-shrink-0" />
                <span>100% Peer-Reviewed</span>
              </li>
              <li>
                <span>COPPA & FERPA Compliant</span>
              </li>
              <li>
                <span>256-Bit SSL Stripe Security</span>
              </li>
              <li>
                <span>Digital DRM Watermarked Previews</span>
              </li>
              <li>
                <span>Expiring Secure Download Vault</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="border-t border-paper-400 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-600">
          <p>© 2026 TeachConnect Technologies Inc. Built with care for educators worldwide.</p>
          <p className="flex items-center gap-1.5 mt-3 sm:mt-0 font-serif italic text-ink-900">
            Crafted with warm paper, clear ink & classroom devotion
            <Feather className="w-3.5 h-3.5 text-brass-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
