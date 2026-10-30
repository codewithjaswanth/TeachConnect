"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Star,
  ShoppingBag,
  Check,
  BookOpen,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./CartContext";

interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price?: number;
  priceCents?: number;
  isFree?: boolean;
  gradeLevels?: string[];
  subjects?: string[];
  hasEaselActivity?: boolean;
  isEaselReady?: boolean;
  fileFormats?: string;
  pageCount?: number;
  coverImage?: string | null;
  coverImageUrl?: string | null;
  ratingAvg?: number;
  ratingAverage?: number;
  ratingCount?: number;
  seller?: {
    storeName: string;
    avatarUrl?: string | null;
    isExclusive?: boolean;
    storeSlug?: string;
  };
  sellerStoreName?: string;
}

interface CurriculumCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  badge?: string;
  autoPlayInterval?: number; // default 2800ms
}

export default function CurriculumCarousel({
  products,
  title,
  subtitle,
  badge,
  autoPlayInterval = 2800,
}: CurriculumCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = products.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay moves continuously until hovered or touched
  useEffect(() => {
    if (total <= 1 || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isHovered, nextSlide, total]);

  // Touch Swipe for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true); // pause on touch
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
      if (diff > 40) {
        nextSlide();
      } else if (diff < -40) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    // Resume after 2s
    setTimeout(() => setIsHovered(false), 2000);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  if (total === 0) return null;

  // Calculate circular offset distance
  const getOffset = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      className="relative my-12 select-none"
      aria-roledescription="carousel"
      aria-label={title || "Curriculum Book Folio Carousel"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header with Live Autoplay Status Badge */}
      {(title || subtitle || badge) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-brass-100 text-brass-700 border border-brass-200">
                  <Bookmark className="w-3 h-3 text-brass-600" />
                  <span>{badge}</span>
                </span>
              )}
              {/* Live Movement Indicator with Book Spine Pulse */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold border transition-all duration-300 ${
                  isHovered
                    ? "bg-paper-200 text-ink-600 border-paper-400"
                    : "bg-forest-100 text-forest-800 border-forest-200 animate-pulse-subtle"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isHovered ? "bg-brass-500" : "bg-forest-600 animate-ping"
                  }`}
                />
                <span>
                  {isHovered ? "Holding Page for Inspection" : "Turning Folio Pages Automatically"}
                </span>
              </span>

              {/* Folio Leaf Indicator */}
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-ink-500 bg-paper-200 border border-paper-300 tabular-nums">
                Leaf {activeIndex + 1} of {total}
              </span>
            </div>

            {title && (
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-ink-600 mt-1 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Curved Book Leaf Navigation Chevrons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={prevSlide}
              aria-label="Turn leaf backward"
              className="btn-tactile px-3.5 py-2.5 rounded-full border border-paper-400 bg-paper-50 text-ink-900 hover:bg-paper-200 hover:border-forest-700 shadow-editorial-xs cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4 text-forest-700" />
              <span className="hidden sm:inline">Previous Leaf</span>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Turn leaf forward"
              className="btn-tactile px-3.5 py-2.5 rounded-full border border-paper-400 bg-paper-50 text-ink-900 hover:bg-paper-200 hover:border-forest-700 shadow-editorial-xs cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <span className="hidden sm:inline">Next Leaf</span>
              <ChevronRight className="w-4 h-4 text-forest-700" />
            </button>
          </div>
        </div>
      )}

      {/* 3D Book Stage Container */}
      <div className="relative w-full h-[500px] sm:h-[530px] overflow-hidden flex items-center justify-center perspective-book py-6">
        {/* Open Book Arch Guide & Ambient Scholastic Horizon */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%] sm:w-[890px] h-[360px] rounded-t-full bg-gradient-to-t from-paper-200/50 via-paper-100/20 to-transparent pointer-events-none -z-0" />

        {/* Ambient Paper Sheen Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[300px] bg-brass-100/35 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* 3D Book Track */}
        <div className="relative w-full max-w-sm sm:max-w-md h-full flex items-center justify-center preserve-3d">
          {products.map((product, idx) => {
            const offset = getOffset(idx);
            const absOffset = Math.abs(offset);

            // Hide cards beyond 2 steps to optimize performance
            if (absOffset > 2.5) return null;

            const isCenter = offset === 0;
            const isLeft = offset < 0;
            const isRight = offset > 0;

            // Book spine leaf calculations
            const xDist = isMobile ? 180 : 300;
            const xTranslate = offset * xDist;
            const zTranslate = isCenter ? 55 : -absOffset * (isMobile ? 70 : 100);

            // Book page turn angle:
            // Left pages anchor on the right spine and rotate inward (+Y)
            // Right pages anchor on the left spine and rotate inward (-Y)
            const yRotate = isCenter
              ? 0
              : isLeft
              ? Math.min(34, absOffset * 22)
              : -Math.min(34, absOffset * 22);

            // Natural page droop / sag along the book curve
            const zRotate = isCenter ? 0 : offset * 1.5;

            const scale = isCenter ? 1.02 : Math.max(0.74, 1 - absOffset * 0.11);
            const opacity = Math.max(0, 1 - absOffset * 0.3);
            const zIndex = 35 - Math.round(absOffset * 10);

            // Origin anchored to the spine
            const transformOrigin = isCenter
              ? "center center"
              : isLeft
              ? "right center"
              : "left center";

            return (
              <div
                key={product.id}
                onClick={() => !isCenter && setActiveIndex(idx)}
                style={{
                  transformOrigin,
                  transform: `translateX(${xTranslate}px) translateZ(${zTranslate}px) rotateY(${yRotate}deg) rotateZ(${zRotate}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.72s ease",
                }}
                className={`absolute w-[295px] sm:w-[345px] cursor-pointer preserve-3d backface-hidden ${
                  isCenter ? "cursor-default" : "hover:brightness-105"
                }`}
              >
                <BookCurvedCard
                  product={product}
                  isCenter={isCenter}
                  isLeft={isLeft}
                  isRight={isRight}
                  plateNumber={idx + 1}
                  onAddToCart={triggerToast}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Pagination Dots with Folio Leaf Markers */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Jump to curriculum folio ${idx + 1}`}
            aria-current={activeIndex === idx ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? "w-9 bg-forest-700 shadow-sm"
                : "w-2.5 bg-paper-300 hover:bg-paper-400"
            }`}
          />
        ))}
      </div>

      {/* Tactile Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest-900 text-paper-50 px-5 py-3 rounded-2xl shadow-editorial-xl border border-brass-400/50 flex items-center gap-3 animate-fade-up">
          <div className="w-7 h-7 rounded-full bg-forest-700 text-brass-300 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-sans font-bold">{toastMessage}</p>
            <p className="text-[11px] text-paper-300">Available in your Educator Vault</p>
          </div>
          <Link
            href="/checkout"
            className="ml-2 px-3 py-1 bg-brass-500 hover:bg-brass-400 text-ink-900 text-xs font-bold rounded-lg transition-colors"
          >
            Vault & Cart
          </Link>
        </div>
      )}
    </section>
  );
}

// Bespoke Book-Curved & Bent Manuscript Card
function BookCurvedCard({
  product,
  isCenter,
  isLeft,
  isRight,
  plateNumber,
  onAddToCart,
}: {
  product: Product;
  isCenter: boolean;
  isLeft: boolean;
  isRight: boolean;
  plateNumber: number;
  onAddToCart: (msg: string) => void;
}) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const priceCents =
    product.priceCents !== undefined
      ? product.priceCents
      : product.price !== undefined
      ? Math.round(product.price * 100)
      : 0;
  const isFree = product.isFree || priceCents === 0;
  const coverUrl =
    product.coverImageUrl ||
    product.coverImage ||
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80";

  const isInCart = items.some((item) => item.productId === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      coverImageUrl: coverUrl,
      priceCents,
      sellerStoreName: product.seller?.storeName || product.sellerStoreName || "Master Educator",
      licenseType: "SINGLE_USER",
    });
    setJustAdded(true);
    onAddToCart(`"${product.title.slice(0, 24)}..." added`);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Asymmetric page corner curvature:
  // Left pages curve outward on the left and meet the binding on the right
  // Right pages curve outward on the right and meet the binding on the left
  // Center page has grand symmetrical curvature
  const cornerStyle = isCenter
    ? "rounded-[2.25rem]"
    : isLeft
    ? "rounded-l-[2.5rem] rounded-r-lg"
    : "rounded-r-[2.5rem] rounded-l-lg";

  const leafStackClass = isCenter
    ? "leaf-center-elevation"
    : isLeft
    ? "leaf-stack-left"
    : "leaf-stack-right";

  return (
    <div
      className={`group relative bg-paper-50 border-2 overflow-hidden flex flex-col transition-all duration-300 ${cornerStyle} ${leafStackClass} ${
        isCenter
          ? "border-forest-600 ring-4 ring-forest-700/15"
          : "border-paper-300 hover:border-paper-400"
      }`}
    >
      {/* Paper Curl Light & Shadow Overlay (simulates curved open page) */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 ${
          isLeft ? "paper-curl-left" : isRight ? "paper-curl-right" : ""
        }`}
      />

      {/* Gold Foil Ribbon Bookmark on Center Active Card */}
      {isCenter && (
        <div className="absolute top-0 right-7 z-30 flex flex-col items-center">
          <div className="bg-brass-500 text-ink-900 text-[9px] font-sans font-black px-2 py-1 shadow-editorial-xs uppercase tracking-wider rounded-b-sm border-x border-b border-brass-600">
            Plate #{plateNumber}
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[5px] border-t-brass-600" />
        </div>
      )}

      {/* Curved Image Top with Paper Grain */}
      <div
        className={`relative aspect-[16/11] overflow-hidden bg-paper-200 ${
          isCenter
            ? "rounded-t-[2.15rem]"
            : isLeft
            ? "rounded-tl-[2.35rem]"
            : "rounded-tr-[2.35rem]"
        }`}
      >
        <img
          src={coverUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-spring"
        />

        {/* Feature Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-forest-900/90 backdrop-blur-xs text-paper-50 text-[10px] font-sans font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-editorial-xs border border-brass-400/40">
            <BookOpen className="w-3 h-3 text-brass-300" />
            <span>Peer-Reviewed Folio</span>
          </span>
        </div>

        {isFree && (
          <div className="absolute top-3 right-3 bg-sage-600 text-white text-[10px] font-sans font-bold px-2.5 py-1 rounded-full shadow-editorial-xs uppercase tracking-wider">
            Free Folio
          </div>
        )}

        {/* Quick View Tag on Center */}
        {isCenter && (
          <Link
            href={`/product/${product.slug}`}
            className="absolute inset-0 bg-ink-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20"
          >
            <span className="px-4 py-2 rounded-full bg-paper-50 text-ink-900 text-xs font-sans font-bold shadow-editorial flex items-center gap-1.5 transform group-hover:scale-100 scale-90 transition-transform">
              <Eye className="w-3.5 h-3.5 text-forest-700" />
              <span>Inspect Folio</span>
            </span>
          </Link>
        )}
      </div>

      {/* Card Body with Editorial Typography */}
      <div className="p-5 flex-1 flex flex-col justify-between font-sans bg-paper-50 relative z-10">
        <div>
          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {(product.gradeLevels || ["5th Grade"]).slice(0, 2).map((grade, idx) => (
              <span
                key={idx}
                className="text-[10px] font-sans font-semibold bg-paper-200 text-forest-800 px-2.5 py-0.5 rounded-full border border-paper-400"
              >
                {grade}
              </span>
            ))}
            {product.fileFormats && (
              <span className="text-[10px] font-sans font-medium text-ink-500 bg-paper-100 px-2 py-0.5 rounded-full border border-paper-300">
                {product.fileFormats}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="text-sm font-serif font-bold text-ink-900 group-hover:text-forest-700 line-clamp-2 leading-snug transition-colors"
          >
            {product.title}
          </Link>

          <p className="text-xs text-ink-500 mt-1">
            By <span className="font-semibold text-ink-800">{product.seller?.storeName || product.sellerStoreName || "Master Educator"}</span>
          </p>

          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-brass-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-brass-500 stroke-brass-500 mr-1" />
              <span>{(product.ratingAverage || product.ratingAvg || 4.9).toFixed(1)}</span>
            </div>
            <span className="text-ink-500 tabular-nums">({product.ratingCount || 12} reviews)</span>
          </div>
        </div>

        {/* Footer with Tactile Action */}
        <div className="pt-3 mt-3 border-t border-paper-300 flex items-center justify-between">
          <span className="text-base font-sans font-black text-ink-900 tabular-nums">
            {isFree ? "Free" : formatPrice(priceCents)}
          </span>

          <button
            onClick={handleAdd}
            className={`btn-tactile px-3.5 py-1.5 rounded-full text-xs font-sans font-bold flex items-center gap-1.5 shadow-editorial-xs ${
              isInCart
                ? "bg-forest-100 text-forest-800 border border-forest-300"
                : "bg-forest-700 hover:bg-forest-600 text-paper-50 border border-forest-800"
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-forest-700" />
                <span>In Vault</span>
              </>
            ) : justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
