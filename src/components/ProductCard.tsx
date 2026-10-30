"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import { Star, Sparkles, Check, ShoppingBag, Eye } from "lucide-react";

export interface ProductCardProps {
  id?: string;
  title?: string;
  slug?: string;
  priceCents?: number;
  isFree?: boolean;
  coverImageUrl?: string;
  gradeLevels?: string[];
  subjects?: string[];
  isEaselReady?: boolean;
  ratingAverage?: number;
  ratingCount?: number;
  sellerStoreName?: string;
  sellerSlug?: string;
  product?: {
    id: string;
    title: string;
    slug: string;
    priceCents?: number;
    price?: number;
    isFree?: boolean;
    coverImageUrl?: string | null;
    coverImage?: string | null;
    gradeLevels?: string[] | string;
    subjects?: string[] | string;
    isEaselReady?: boolean;
    hasEaselActivity?: boolean;
    ratingAverage?: number;
    ratingAvg?: number;
    ratingCount?: number;
    seller?: {
      storeName: string;
      storeSlug?: string;
    };
    sellerStoreName?: string;
  };
}

export function ProductCard(props: ProductCardProps) {
  const p = props.product;
  const id = props.id || p?.id || "";
  const title = props.title || p?.title || "";
  const slug = props.slug || p?.slug || "";
  const priceCents =
    props.priceCents !== undefined
      ? props.priceCents
      : p?.priceCents !== undefined
      ? p.priceCents
      : p?.price !== undefined
      ? Math.round(p.price * 100)
      : 0;
  const isFree = props.isFree !== undefined ? props.isFree : p?.isFree || priceCents === 0;
  const coverImageUrl =
    props.coverImageUrl ||
    p?.coverImageUrl ||
    p?.coverImage ||
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80";

  const rawGradeLevels = props.gradeLevels || p?.gradeLevels || [];
  const gradeLevels: string[] = Array.isArray(rawGradeLevels)
    ? rawGradeLevels
    : typeof rawGradeLevels === "string"
    ? JSON.parse(rawGradeLevels || "[]")
    : [];

  const rawSubjects = props.subjects || p?.subjects || [];
  const subjects: string[] = Array.isArray(rawSubjects)
    ? rawSubjects
    : typeof rawSubjects === "string"
    ? JSON.parse(rawSubjects || "[]")
    : [];

  const isEaselReady =
    props.isEaselReady !== undefined
      ? props.isEaselReady
      : p?.isEaselReady !== undefined
      ? p.isEaselReady
      : p?.hasEaselActivity || false;

  const ratingAverage =
    props.ratingAverage !== undefined
      ? props.ratingAverage
      : p?.ratingAverage !== undefined
      ? p.ratingAverage
      : p?.ratingAvg || 4.9;

  const ratingCount =
    props.ratingCount !== undefined ? props.ratingCount : p?.ratingCount || 12;

  const sellerStoreName =
    props.sellerStoreName || p?.sellerStoreName || p?.seller?.storeName || "Master Educator";

  const { addToCart, items } = useCart();
  const isInCart = items.some((item) => item.productId === id);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: id,
      title,
      slug,
      coverImageUrl,
      priceCents,
      sellerStoreName,
      licenseType: "SINGLE_USER",
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="group bg-paper-50 rounded-2xl border border-paper-300 hover:border-forest-600 overflow-hidden shadow-editorial-xs hover:shadow-editorial-lg transition-all duration-300 ease-spring hover:-translate-y-1.5 flex flex-col h-full relative focus-within:ring-2 focus-within:ring-forest-700">
      {/* Cover Image & Badges */}
      <Link
        href={`/product/${slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-paper-200 block focus:outline-none"
        aria-label={`View ${title}`}
      >
        <img
          src={coverImageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-spring"
        />

        {/* Feature Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {isEaselReady && (
            <span className="bg-forest-900/90 backdrop-blur-xs text-paper-50 text-[10px] font-sans font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-editorial-xs border border-brass-400/40">
              <Sparkles className="w-3 h-3 text-brass-300" />
              <span>Easel Activity</span>
            </span>
          )}
        </div>

        {isFree && (
          <div className="absolute top-2.5 right-2.5 bg-sage-600 text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded-md shadow-editorial-xs uppercase tracking-wider">
            Free Folio
          </div>
        )}

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-ink-900/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-paper-50 text-ink-900 text-xs font-sans font-bold shadow-editorial flex items-center gap-1.5 transform group-hover:scale-100 scale-90 transition-transform duration-300 ease-spring">
            <Eye className="w-3.5 h-3.5 text-forest-700" />
            <span>Examine Folio</span>
          </span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between font-sans">
        <div>
          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {gradeLevels.slice(0, 2).map((grade, idx) => (
              <span
                key={idx}
                className="text-[10px] font-sans font-semibold bg-paper-200 text-forest-800 px-2 py-0.5 rounded-md border border-paper-400"
              >
                {grade}
              </span>
            ))}
            {subjects.slice(0, 1).map((sub, idx) => (
              <span
                key={idx}
                className="text-[10px] font-sans font-semibold bg-forest-100 text-forest-900 px-2 py-0.5 rounded-md border border-forest-200"
              >
                {sub}
              </span>
            ))}
          </div>

          {/* Title */}
          <Link
            href={`/product/${slug}`}
            className="text-sm font-serif font-bold text-ink-900 group-hover:text-forest-700 line-clamp-2 leading-snug transition-colors focus:outline-none"
          >
            {title}
          </Link>

          {/* Seller / Author */}
          <p className="text-xs text-ink-500 mt-1.5 flex items-center gap-1">
            <span>By</span>
            <span className="font-semibold text-ink-800 hover:text-forest-700 transition-colors">
              {sellerStoreName}
            </span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-brass-500">
              <Star className="w-3.5 h-3.5 fill-brass-500 stroke-brass-500" />
              <span className="text-xs font-bold text-ink-900 ml-1 tabular-nums">
                {ratingAverage.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-ink-500 tabular-nums">({ratingCount} reviews)</span>
          </div>
        </div>

        {/* Footer: Price and Cart Action */}
        <div className="pt-3.5 mt-3.5 border-t border-paper-300 flex items-center justify-between">
          <div>
            <span className="text-base font-sans font-black text-ink-900 tabular-nums">
              {isFree ? "Free" : formatPrice(priceCents)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 shadow-editorial-xs ${
              isInCart
                ? "bg-forest-100 text-forest-800 border border-forest-300"
                : "bg-forest-700 hover:bg-forest-600 text-paper-50 border border-forest-800"
            }`}
            aria-label={isInCart ? "Resource in cart" : "Add resource to cart"}
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

export default ProductCard;
