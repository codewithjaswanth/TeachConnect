"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Zap,
  ShieldCheck,
  School,
  UserCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  Check,
} from "lucide-react";

interface ProductPurchaseCardProps {
  productId: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  priceCents: number;
  isFree: boolean;
  pageCount: number;
  fileFormats: string;
  isEaselReady: boolean;
  sellerStoreName: string;
  sellerRating: number;
  sellerRatingCount: number;
  sellerAvatarUrl?: string | null;
}

export function ProductPurchaseCard({
  productId,
  title,
  slug,
  coverImageUrl,
  priceCents,
  isFree,
  pageCount,
  fileFormats,
  isEaselReady,
  sellerStoreName,
  sellerRating,
  sellerRatingCount,
  sellerAvatarUrl,
}: ProductPurchaseCardProps) {
  const router = useRouter();
  const { addToCart, items } = useCart();
  const [licenseType, setLicenseType] = useState<"SINGLE_USER" | "SCHOOL_SEAT">("SINGLE_USER");
  const [seatCount, setSeatCount] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isInCart = items.some((item) => item.productId === productId);

  // Calculate pricing based on volume seats
  const calculateTotal = () => {
    if (isFree) return 0;
    if (licenseType === "SCHOOL_SEAT" && seatCount > 1) {
      const base = priceCents;
      const additional = (seatCount - 1) * Math.round(priceCents * 0.85);
      return base + additional;
    }
    return priceCents * seatCount;
  };

  const totalPriceCents = calculateTotal();

  const handleAddToCart = () => {
    addToCart({
      productId,
      title,
      slug,
      coverImageUrl,
      priceCents,
      sellerStoreName,
      licenseType,
      seatCount,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      productId,
      title,
      slug,
      coverImageUrl,
      priceCents,
      sellerStoreName,
      licenseType,
      seatCount,
    });
    router.push("/checkout");
  };

  return (
    <div className="bg-paper-50 rounded-3xl border border-paper-400 p-6 shadow-editorial space-y-6 sticky top-28 font-sans">
      {/* Price Header */}
      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-sans font-black text-ink-900 tabular-nums">
            {isFree ? "Free" : formatPrice(totalPriceCents)}
          </span>
          {isFree ? (
            <span className="px-3 py-1 bg-forest-100 text-forest-800 text-xs font-bold rounded-lg border border-forest-200">
              Complimentary Folio
            </span>
          ) : (
            <span className="text-xs text-ink-500 font-medium">Digital Download</span>
          )}
        </div>
        <p className="text-xs text-ink-600 mt-1">
          {licenseType === "SINGLE_USER"
            ? "Single educator classroom license (lifetime personal access)"
            : `${seatCount} transferable school department licenses (15% seat discount)`}
        </p>
      </div>

      {/* Licensing Engine */}
      {!isFree && (
        <div className="space-y-3 pt-3 border-t border-paper-300">
          <h4 className="text-[11px] font-bold uppercase text-forest-800 tracking-wider">
            Choose License Scope
          </h4>

          <div className="space-y-2">
            {/* Single User */}
            <label
              onClick={() => {
                setLicenseType("SINGLE_USER");
                setSeatCount(1);
              }}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                licenseType === "SINGLE_USER"
                  ? "border-forest-700 bg-paper-200 ring-1 ring-forest-700/20 shadow-editorial-xs"
                  : "border-paper-400 bg-paper-50 hover:bg-paper-200/60"
              }`}
            >
              <input
                type="radio"
                name="license"
                checked={licenseType === "SINGLE_USER"}
                onChange={() => {}}
                className="mt-1 text-forest-700 focus:ring-forest-700"
              />
              <div className="text-xs">
                <span className="font-bold text-ink-900 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-forest-700" /> Individual Classroom License
                </span>
                <p className="text-ink-500 mt-0.5 leading-relaxed">
                  For use by one educator in their personal classroom and student roster.
                </p>
              </div>
            </label>

            {/* School Seat */}
            <label
              onClick={() => setLicenseType("SCHOOL_SEAT")}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                licenseType === "SCHOOL_SEAT"
                  ? "border-forest-700 bg-paper-200 ring-1 ring-forest-700/20 shadow-editorial-xs"
                  : "border-paper-400 bg-paper-50 hover:bg-paper-200/60"
              }`}
            >
              <input
                type="radio"
                name="license"
                checked={licenseType === "SCHOOL_SEAT"}
                onChange={() => {}}
                className="mt-1 text-forest-700 focus:ring-forest-700"
              />
              <div className="text-xs flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink-900 flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-brass-500" /> Multi-Seat School License
                  </span>
                  <span className="text-[10px] font-bold text-forest-800 bg-forest-100 px-2 py-0.5 rounded-full border border-forest-200">
                    Save 15%
                  </span>
                </div>
                <p className="text-ink-500 mt-0.5 leading-relaxed">
                  Institutionally owned license transferable across department colleagues.
                </p>

                {/* Seat Stepper */}
                {licenseType === "SCHOOL_SEAT" && (
                  <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-paper-300">
                    <span className="font-semibold text-ink-900">Teacher Seats:</span>
                    <div className="flex items-center border border-paper-400 rounded-xl overflow-hidden bg-paper-50 shadow-2xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSeatCount((c) => Math.max(1, c - 1));
                        }}
                        className="btn-tactile px-3 py-1 bg-paper-200 hover:bg-paper-300 font-bold text-ink-900 transition"
                        aria-label="Decrease seat count"
                      >
                        -
                      </button>
                      <span className="px-3.5 py-1 font-bold text-ink-900 tabular-nums">
                        {seatCount}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSeatCount((c) => c + 1);
                        }}
                        className="btn-tactile px-3 py-1 bg-paper-200 hover:bg-paper-300 font-bold text-ink-900 transition"
                        aria-label="Increase seat count"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Primary Actions */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className={`btn-tactile w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-editorial-xs ${
            isInCart
              ? "bg-forest-100 text-forest-800 border border-forest-300"
              : "bg-forest-700 hover:bg-forest-600 text-paper-50 border border-forest-800"
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added to Cart!</span>
            </>
          ) : isInCart ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-forest-700" />
              <span>In Cart Vault (Add Another Seat)</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          className="btn-tactile w-full py-3.5 px-4 bg-ink-900 hover:bg-black text-paper-50 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-editorial-xs border border-ink-900"
        >
          <Zap className="w-4 h-4 text-brass-300" />
          <span>{isFree ? "Download Complimentary Folio" : "Instant Checkout"}</span>
        </button>
      </div>

      {/* Curriculum Specifications */}
      <div className="pt-4 border-t border-paper-300 space-y-2 text-xs text-ink-600">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-ink-500">
            <FileText className="w-3.5 h-3.5 text-brass-500" /> Total Length:
          </span>
          <span className="font-bold text-ink-900 tabular-nums">{pageCount} pages</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-ink-500">File Formats:</span>
          <span className="font-bold text-ink-900 truncate max-w-[180px] text-right">
            {fileFormats}
          </span>
        </div>
        {isEaselReady && (
          <div className="flex items-center justify-between text-forest-800 font-semibold bg-forest-100 p-2.5 rounded-xl border border-forest-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brass-500" /> Digital Activity:
            </span>
            <span className="font-bold">Easel Ready</span>
          </div>
        )}
      </div>

      {/* Teacher Store Mini Card */}
      <div className="pt-4 border-t border-paper-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={sellerAvatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"}
            alt={sellerStoreName}
            className="w-10 h-10 rounded-xl object-cover border border-paper-400 shadow-2xs"
          />
          <div>
            <h4 className="text-xs font-bold text-ink-900 line-clamp-1">{sellerStoreName}</h4>
            <div className="flex items-center gap-1 text-[11px] text-brass-600 font-bold">
              <span>★ {sellerRating.toFixed(1)}</span>
              <span className="text-ink-500 font-normal tabular-nums">({sellerRatingCount})</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsFollowing((f) => !f)}
          className={`btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
            isFollowing
              ? "bg-forest-100 text-forest-800 border-forest-200"
              : "bg-paper-200 hover:bg-paper-300 text-ink-900 border-paper-400"
          }`}
        >
          {isFollowing ? "Following" : "+ Follow"}
        </button>
      </div>

      {/* Educator Guarantee */}
      <div className="p-3 bg-paper-200 rounded-2xl flex items-center gap-2.5 text-[11px] text-ink-600 border border-paper-400">
        <ShieldCheck className="w-4 h-4 text-forest-700 flex-shrink-0" />
        <span>Instant download delivered to your permanent library vault upon order.</span>
      </div>
    </div>
  );
}
