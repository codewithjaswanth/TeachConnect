import React from "react";
import Link from "next/link";
import { searchProducts, SearchParams } from "@/lib/search";
import { ProductCard } from "@/components/ProductCard";
import { SearchFilters } from "@/components/SearchFilters";
import { AlertCircle, ArrowUpDown, Scroll, X, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const products = await searchProducts(resolvedParams);

  const queryTitle = resolvedParams.q
    ? `Results for "${resolvedParams.q}"`
    : resolvedParams.subject && resolvedParams.subject !== "all"
      ? `${resolvedParams.subject} Curriculum Units`
      : resolvedParams.grade && resolvedParams.grade !== "all"
        ? `${resolvedParams.grade} Lesson Folios`
        : "Complete Curriculum Catalog";

  // Active filter items for pills
  const activeFilters: { key: string; label: string; value: string }[] = [];
  if (resolvedParams.grade && resolvedParams.grade !== "all") {
    activeFilters.push({ key: "grade", label: `Grade: ${resolvedParams.grade}`, value: resolvedParams.grade });
  }
  if (resolvedParams.subject && resolvedParams.subject !== "all") {
    activeFilters.push({ key: "subject", label: `Subject: ${resolvedParams.subject}`, value: resolvedParams.subject });
  }
  if (resolvedParams.format && resolvedParams.format !== "all") {
    activeFilters.push({ key: "format", label: `Format: ${resolvedParams.format}`, value: resolvedParams.format });
  }
  if (resolvedParams.price && resolvedParams.price !== "all") {
    activeFilters.push({ key: "price", label: `Price: ${resolvedParams.price}`, value: resolvedParams.price });
  }
  if (resolvedParams.q) {
    activeFilters.push({ key: "q", label: `Search: "${resolvedParams.q}"`, value: resolvedParams.q });
  }

  const createFilterUrlWithout = (keyToRemove: string) => {
    const p = new URLSearchParams();
    if (resolvedParams.q && keyToRemove !== "q") p.set("q", resolvedParams.q);
    if (resolvedParams.grade && keyToRemove !== "grade" && resolvedParams.grade !== "all") p.set("grade", resolvedParams.grade);
    if (resolvedParams.subject && keyToRemove !== "subject" && resolvedParams.subject !== "all") p.set("subject", resolvedParams.subject);
    if (resolvedParams.price && keyToRemove !== "price" && resolvedParams.price !== "all") p.set("price", resolvedParams.price);
    if (resolvedParams.format && keyToRemove !== "format" && resolvedParams.format !== "all") p.set("format", resolvedParams.format);
    if (resolvedParams.sort) p.set("sort", resolvedParams.sort);
    const qs = p.toString();
    return `/search${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen font-sans">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Scroll className="w-4 h-4 text-emerald-600" />
            <span>Peer-Reviewed Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900">{queryTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Displaying <span className="font-bold text-slate-900 tabular-nums">{products.length}</span> verified curriculum units
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
          <span className="text-xs text-slate-500 pl-2.5 font-semibold flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" /> Sort:
          </span>
          {[
            { label: "Acclaimed", value: "popular" },
            { label: "Top Rated", value: "rating" },
            { label: "Price: Low", value: "price-low" },
          ].map((s) => {
            const isSelected = (resolvedParams.sort || "popular") === s.value;
            const params = new URLSearchParams();
            if (resolvedParams.q) params.set("q", resolvedParams.q);
            if (resolvedParams.grade) params.set("grade", resolvedParams.grade);
            if (resolvedParams.subject) params.set("subject", resolvedParams.subject);
            if (resolvedParams.price) params.set("price", resolvedParams.price);
            if (resolvedParams.format) params.set("format", resolvedParams.format);
            params.set("sort", s.value);

            return (
              <Link
                key={s.value}
                href={`/search?${params.toString()}`}
                className={`btn-tactile text-xs px-3 py-1.5 rounded-lg font-sans font-semibold transition-all ${isSelected
                  ? "bg-emerald-700 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-slate-100/80 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-900 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-emerald-700" /> Active Filters:
          </span>
          {activeFilters.map((af) => (
            <Link
              key={af.key}
              href={createFilterUrlWithout(af.key)}
              className="btn-tactile inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-xs font-medium text-emerald-900 rounded-lg border border-slate-200 transition-colors shadow-2xs group"
            >
              <span>{af.label}</span>
              <X className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600" />
            </Link>
          ))}
          <Link
            href="/search"
            className="text-xs text-red-600 font-semibold hover:underline ml-2"
          >
            Clear all
          </Link>
        </div>
      )}

      {/* Main Grid Layout: Facets + Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Facet Sidebar */}
        <div className="lg:col-span-1">
          <SearchFilters />
        </div>

        {/* Product Results */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 sm:p-16 text-center shadow-sm animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-2xs">
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                No matching curricula found
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                We couldn't locate any manuscripts matching your active criteria. Try broadening your keywords or clearing selected filters.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/search"
                  className="btn-tactile px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition shadow-xs border border-emerald-800"
                >
                  Reset All Filters
                </Link>
                <Link
                  href="/search?price=free"
                  className="btn-tactile px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition border border-slate-200"
                >
                  Browse Free Units
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  slug={product.slug}
                  priceCents={product.priceCents}
                  isFree={product.isFree}
                  coverImageUrl={product.coverImageUrl}
                  gradeLevels={JSON.parse(product.gradeLevels)}
                  subjects={JSON.parse(product.subjects)}
                  isEaselReady={product.isEaselReady}
                  ratingAverage={product.ratingAverage}
                  ratingCount={product.ratingCount}
                  sellerStoreName={product.seller.storeName}
                  sellerSlug={product.seller.storeSlug}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
