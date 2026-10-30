import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WatermarkPreviewModal } from "@/components/WatermarkPreviewModal";
import { ProductPurchaseCard } from "@/components/ProductPurchaseCard";
import { ReviewModal } from "@/components/ReviewModal";
import CurriculumCarousel from "@/components/CurriculumCarousel";
import {
  Star,
  ShieldCheck,
  Download,
  FileCheck2,
  Bookmark,
  ChevronRight,
  Share2,
  Heart,
  BookOpen,
  Scroll,
  Sparkles,
  CheckCircle2,
  Layers,
  FileText,
  BadgeCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      seller: true,
      files: true,
      previews: {
        orderBy: { sortOrder: "asc" },
      },
      reviews: {
        orderBy: { helpfulVotes: "desc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
    },
    include: {
      seller: true,
    },
    take: 6,
  });

  const formattedRelated = relatedProducts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    price: p.priceCents / 100,
    priceCents: p.priceCents,
    isFree: p.isFree,
    gradeLevels: JSON.parse(p.gradeLevels),
    subjects: JSON.parse(p.subjects),
    hasEaselActivity: p.isEaselReady,
    isEaselReady: p.isEaselReady,
    fileFormats: p.fileFormats,
    pageCount: p.pageCount,
    coverImage: p.coverImageUrl,
    coverImageUrl: p.coverImageUrl,
    ratingAvg: p.ratingAverage,
    ratingAverage: p.ratingAverage,
    ratingCount: p.ratingCount,
    standards: p.standardsAlignment ? JSON.parse(p.standardsAlignment) : [],
    seller: {
      storeName: p.seller.storeName,
      storeSlug: p.seller.storeSlug,
      avatarUrl: p.seller.avatarUrl,
      isExclusive: p.seller.tier === "EXCLUSIVE",
    },
    sellerStoreName: p.seller.storeName,
  }));

  const gradeLevels: string[] = JSON.parse(product.gradeLevels);
  const subjects: string[] = JSON.parse(product.subjects);
  const resourceTypes: string[] = JSON.parse(product.resourceTypes);
  const standards: string[] = product.standardsAlignment ? JSON.parse(product.standardsAlignment) : [];

  // Calculate review score distributions
  const totalReviews = product.reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => {
    const count = product.reviews.filter((r) => r.rating === stars).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, count, percentage };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#FAF9F5] min-h-screen font-sans">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#686E5D] mb-8 flex-wrap border-b border-[#EAE4D5] pb-3">
        <Link href="/" className="hover:text-[#2D3A22] transition-colors font-medium">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#9C7A3C]" />
        <Link
          href={`/search?subject=${encodeURIComponent(subjects[0] || "")}`}
          className="hover:text-[#2D3A22] transition-colors"
        >
          {subjects[0] || "Curriculum"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#9C7A3C]" />
        <Link
          href={`/search?grade=${encodeURIComponent(gradeLevels[0] || "")}`}
          className="hover:text-[#2D3A22] transition-colors"
        >
          {gradeLevels[0] || "Grade Level"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#9C7A3C]" />
        <span className="text-[#1C1E18] font-bold truncate max-w-sm">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Media, Details, Specs, Reviews */}
        <div className="lg:col-span-2 space-y-10">
          {/* Main Cover & Watermark Preview Action */}
          <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 shadow-editorial-xs">
            <div className="relative aspect-[16/10] max-h-[460px] rounded-2xl overflow-hidden bg-[#F3EFE6] flex items-center justify-center border border-[#DDD4C1]">
              <img
                src={product.coverImageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.isEaselReady && (
                <div className="absolute top-4 left-4 bg-[#2D3A22]/90 backdrop-blur-xs text-[#FAF9F5] text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 border border-[#9C7A3C]/40 shadow-editorial-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E9DAA2]" />
                  <span>Easel Digital Interactive Assignment Included</span>
                </div>
              )}
            </div>

            {/* Watermark Preview Modal Trigger */}
            <WatermarkPreviewModal
              previews={product.previews}
              title={product.title}
            />
          </div>

          {/* Product Overview Card */}
          <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 sm:p-8 shadow-editorial-xs space-y-6">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {gradeLevels.map((g, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1 bg-[#F3EFE6] text-[#2D3A22] rounded-xl border border-[#DDD4C1]"
                  >
                    {g}
                  </span>
                ))}
                {subjects.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1 bg-[#E4E9DC] text-[#2D3A22] rounded-xl border border-[#C7D4B8]"
                  >
                    {s}
                  </span>
                ))}
                {resourceTypes.map((r, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 bg-[#FAF9F5] text-[#4D5244] rounded-xl border border-[#DDD4C1]"
                  >
                    {r}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#1C1E18] leading-tight">
                {product.title}
              </h1>

              {/* Author & Review Line */}
              <div className="flex items-center gap-4 mt-4 flex-wrap pt-4 border-t border-[#EAE4D5] text-xs">
                <Link
                  href={`/search?seller=${encodeURIComponent(product.seller.storeName)}`}
                  className="font-bold text-[#2D3A22] hover:text-[#3B4D2B] hover:underline"
                >
                  By {product.seller.storeName}
                </Link>

                <div className="flex items-center gap-1.5 text-[#9C7A3C] font-bold">
                  <Star className="w-4 h-4 fill-[#9C7A3C] stroke-[#9C7A3C]" />
                  <span className="text-[#1C1E18] tabular-nums">{product.ratingAverage.toFixed(1)}</span>
                  <span className="text-[#686E5D] font-normal tabular-nums">
                    ({product.ratingCount} educator reviews)
                  </span>
                </div>

                <div className="text-[#4D5244]">
                  <span className="font-bold text-[#1C1E18] tabular-nums">{product.totalDownloads}</span> downloads
                </div>
              </div>
            </div>

            {/* Standards Alignment Tags */}
            {standards.length > 0 && (
              <div className="p-5 bg-[#E4E9DC]/70 rounded-2xl border border-[#C7D4B8] space-y-2.5">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#2D3A22]" />
                  <h3 className="text-xs font-bold text-[#2D3A22] uppercase tracking-wider">
                    Educational Standards Alignment (CCSS & NGSS)
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {standards.map((code, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#FAF9F5] text-[#2D3A22] font-mono text-xs font-bold rounded-xl border border-[#C7D4B8] shadow-2xs"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Synopsis */}
            <div className="space-y-3 pt-4 border-t border-[#EAE4D5]">
              <h3 className="text-lg font-serif font-bold text-[#1C1E18]">
                Curriculum Synopsis & Overview
              </h3>
              <p className="text-sm text-[#4D5244] leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Included Files Inventory */}
            <div className="space-y-3 pt-6 border-t border-[#EAE4D5]">
              <h3 className="text-lg font-serif font-bold text-[#1C1E18]">
                Manuscripts & Files Included in Unit
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {product.files.map((file) => (
                  <div
                    key={file.id}
                    className="p-3.5 bg-[#F3EFE6] rounded-2xl border border-[#DDD4C1] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#E4E9DC] text-[#2D3A22] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-[#2D3A22]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1C1E18] truncate">{file.fileName}</p>
                        <p className="text-[11px] text-[#686E5D] tabular-nums">
                          {(file.fileSize / 1024 / 1024).toFixed(1)} MB • {file.mimeType}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2D3A22] bg-[#E4E9DC] px-2.5 py-1 rounded-lg border border-[#C7D4B8] whitespace-nowrap ml-2">
                      {file.fileType.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 sm:p-8 shadow-editorial-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE4D5]">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1C1E18]">
                  Educator Classroom Reviews
                </h3>
                <p className="text-xs text-[#4D5244] mt-0.5">
                  Verified teacher purchases and classroom trial feedback
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-serif font-black text-[#1C1E18] tabular-nums">
                    {product.ratingAverage.toFixed(1)}
                  </div>
                  <div className="text-xs text-[#9C7A3C] font-bold">
                    <span>★ {product.ratingAverage.toFixed(1)} / 5</span>
                  </div>
                </div>

                <ReviewModal
                  productId={product.id}
                  productTitle={product.title}
                />
              </div>
            </div>

            {/* Rating Distribution Breakdown */}
            <div className="p-4 bg-[#F3EFE6] rounded-2xl border border-[#DDD4C1] grid grid-cols-1 sm:grid-cols-5 gap-3">
              {ratingCounts.map((rc) => (
                <div key={rc.stars} className="flex sm:flex-col items-center justify-between sm:justify-center text-xs">
                  <span className="font-semibold text-[#1C1E18]">{rc.stars} Stars</span>
                  <div className="w-24 sm:w-full h-2 bg-[#FAF9F5] rounded-full overflow-hidden my-1 border border-[#DDD4C1]">
                    <div
                      className="h-full bg-[#9C7A3C] rounded-full transition-all"
                      style={{ width: `${rc.percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#686E5D] tabular-nums">{rc.count} reviews</span>
                </div>
              ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-[#F3EFE6]/60 rounded-2xl border border-[#DDD4C1] space-y-2 hover:border-[#2D3A22] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1C1E18]">{rev.userName}</span>
                      <span className="text-[10px] font-semibold text-[#2D3A22] bg-[#E4E9DC] px-2 py-0.5 rounded-full border border-[#C7D4B8]">
                        Verified Educator
                      </span>
                    </div>
                    <span className="text-xs text-[#9C7A3C] font-bold">
                      {"★".repeat(rev.rating)}
                    </span>
                  </div>

                  {rev.gradeTaught && (
                    <span className="inline-block text-[11px] font-semibold text-[#2D3A22]">
                      Taught: {rev.gradeTaught}
                    </span>
                  )}
                  <p className="text-xs sm:text-sm text-[#4D5244] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Sticky Purchase Card */}
        <div className="lg:col-span-1">
          <ProductPurchaseCard
            productId={product.id}
            title={product.title}
            slug={product.slug}
            coverImageUrl={product.coverImageUrl}
            priceCents={product.priceCents}
            isFree={product.isFree}
            pageCount={product.pageCount}
            fileFormats={product.fileFormats}
            isEaselReady={product.isEaselReady}
            sellerStoreName={product.seller.storeName}
            sellerRating={product.seller.ratingAverage}
            sellerRatingCount={product.seller.ratingCount}
            sellerAvatarUrl={product.seller.avatarUrl}
          />
        </div>
      </div>

      {/* Related Curriculum Carousel */}
      {formattedRelated.length > 0 && (
        <div className="mt-16 pt-12 border-t border-paper-300">
          <CurriculumCarousel
            products={formattedRelated}
            badge="Pedagogical Complements"
            title="Educators Who Examined This Also Acquired"
            subtitle="Explore complementary lesson units, guided workbooks, and standards-aligned assessment folios"
          />
        </div>
      )}
    </div>
  );
}
