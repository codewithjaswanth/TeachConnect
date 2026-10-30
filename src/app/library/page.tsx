import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ReviewModal } from "@/components/ReviewModal";
import {
  BookOpen,
  Download,
  Calendar,
  School,
  UserCheck,
  ExternalLink,
  Scroll,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const items = await prisma.libraryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-paper-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-paper-300 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-forest-800 uppercase tracking-wider mb-1.5">
            <Scroll className="w-4 h-4 text-brass-500" />
            <span>Personal Educator Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-ink-900">
            My Curriculum Library
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1">
            Lifetime access and immediate download fulfillment for all your acquired curriculum units
          </p>
        </div>

        <Link
          href="/search"
          className="btn-tactile self-start sm:self-auto px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-paper-50 rounded-xl text-xs font-bold shadow-editorial-xs transition border border-forest-850"
        >
          + Discover More Manuscripts
        </Link>
      </div>

      {/* Library Grid */}
      {items.length === 0 ? (
        <div className="bg-paper-50 rounded-3xl border border-paper-400 p-16 text-center space-y-4 shadow-editorial-xs animate-fade-in">
          <div className="w-16 h-16 bg-paper-200 rounded-2xl flex items-center justify-center mx-auto text-forest-700 border border-paper-400 shadow-editorial-xs">
            <BookOpen className="w-8 h-8 text-brass-500" />
          </div>
          <h3 className="text-xl font-serif font-bold text-ink-900">Your library vault is currently empty</h3>
          <p className="text-xs sm:text-sm text-ink-600 max-w-sm mx-auto leading-relaxed">
            Acquire teacher-created lesson plans, printables, and assessments to populate your permanent classroom library.
          </p>
          <Link
            href="/search"
            className="btn-tactile inline-block px-6 py-3 bg-forest-700 text-paper-50 rounded-xl text-xs font-bold hover:bg-forest-600 transition shadow-editorial-xs border border-forest-850"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="card-depth bg-paper-50 rounded-3xl border border-paper-400 p-6 flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={item.coverImageUrl}
                  alt={item.productTitle}
                  className="w-24 h-24 rounded-2xl object-cover bg-paper-200 flex-shrink-0 border border-paper-400 shadow-2xs"
                />

                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest-800 bg-forest-100 px-2.5 py-0.5 rounded-full mb-2 border border-forest-200">
                    {item.licenseType === "SCHOOL_SEAT" ? (
                      <>
                        <School className="w-3 h-3 text-brass-500" /> School Department License
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3 h-3 text-forest-700" /> Classroom License
                      </>
                    )}
                  </span>

                  <h3 className="text-sm sm:text-base font-serif font-bold text-ink-900 line-clamp-2 leading-snug">
                    {item.productTitle}
                  </h3>

                  <p className="text-xs text-ink-500 mt-1">
                    By <span className="font-semibold text-ink-800">{item.sellerStoreName}</span>
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-ink-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brass-500" />
                      Acquired {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="tabular-nums">{item.downloadCount} downloads</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 mt-6 border-t border-paper-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/product/${item.productSlug}`}
                    className="btn-tactile p-2 text-ink-600 hover:text-ink-900 rounded-xl hover:bg-paper-200 transition border border-paper-400"
                    title="View Product Page"
                    aria-label={`View page for ${item.productTitle}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <ReviewModal
                    productId={item.productId}
                    productTitle={item.productTitle}
                  />
                </div>

                <a
                  href={`/api/download/${item.downloadToken}`}
                  download
                  className="btn-tactile px-4 py-2 bg-forest-700 hover:bg-forest-600 text-paper-50 rounded-xl text-xs font-bold flex items-center gap-2 shadow-editorial-xs transition border border-forest-850"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Files</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
