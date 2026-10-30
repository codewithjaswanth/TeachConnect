"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, School, UserCheck } from "lucide-react";

export function CartDrawer() {
  const { items, isDrawerOpen, setIsDrawerOpen, removeFromCart, updateSeats, subtotalCents } = useCart();

  // Close on Escape key
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden font-sans"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-paper-100 shadow-editorial-xl flex flex-col border-l border-paper-400 animate-fade-in">
          {/* Drawer Header */}
          <div className="p-5 border-b border-paper-300 flex items-center justify-between bg-paper-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-700 text-paper-50 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-brass-300" />
              </div>
              <div>
                <h2 className="font-serif font-black text-ink-900 text-base leading-none">
                  Curriculum Vault Cart
                </h2>
                <span className="text-[11px] text-ink-500 font-sans mt-0.5 block tabular-nums">
                  {items.length} {items.length === 1 ? "resource" : "resources"} selected
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="btn-tactile p-2 rounded-xl text-ink-600 hover:text-ink-900 hover:bg-paper-300 transition-colors focus-visible:ring-2 focus-visible:ring-forest-700"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-ink-500">
                <div className="w-16 h-16 rounded-2xl bg-paper-200 border border-paper-400 flex items-center justify-center text-brass-500 mb-4 shadow-editorial-xs">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif font-bold text-ink-900">Your cart vault is empty</h3>
                <p className="text-xs text-ink-500 mt-1.5 mb-6 max-w-xs leading-relaxed">
                  Discover peer-reviewed lesson folios, decodable units, and interactive Easel activities to begin.
                </p>
                <Link
                  href="/search"
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn-tactile px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-paper-50 rounded-xl text-xs font-bold transition shadow-editorial-xs"
                >
                  Explore Catalog
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3.5 p-4 bg-paper-50 border border-paper-400 rounded-2xl shadow-editorial-xs hover:border-forest-700 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-paper-200 flex-shrink-0 border border-paper-400">
                    <img
                      src={item.coverImageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-xs font-serif font-bold text-ink-900 line-clamp-2 hover:text-forest-700 transition-colors leading-snug"
                      >
                        {item.title}
                      </Link>
                      <p className="text-[11px] text-ink-500 mt-0.5 truncate">
                        By <span className="font-semibold text-ink-800">{item.sellerStoreName}</span>
                      </p>

                      <div className="mt-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-paper-200 text-forest-800 rounded-md border border-paper-400">
                          {item.licenseType === "SCHOOL_SEAT" ? (
                            <>
                              <School className="w-3 h-3 text-brass-500" />
                              <span>School Department License</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3 h-3 text-forest-700" />
                              <span>Classroom License</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-paper-300">
                      {/* Seat Stepper */}
                      <div className="flex items-center border border-paper-400 rounded-lg overflow-hidden bg-paper-50 shadow-2xs">
                        <button
                          onClick={() => updateSeats(item.productId, item.seatCount - 1)}
                          className="btn-tactile px-2 py-0.5 bg-paper-200 hover:bg-paper-300 text-ink-900 font-bold text-xs transition"
                          aria-label="Decrease seat count"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold text-xs text-ink-900 tabular-nums">
                          {item.seatCount}
                        </span>
                        <button
                          onClick={() => updateSeats(item.productId, item.seatCount + 1)}
                          className="btn-tactile px-2 py-0.5 bg-paper-200 hover:bg-paper-300 text-ink-900 font-bold text-xs transition"
                          aria-label="Increase seat count"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-bold text-ink-900 tabular-nums">
                          {formatPrice(item.priceCents * item.seatCount)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="btn-tactile p-1 text-ink-400 hover:text-terracotta-600 transition-colors rounded"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-paper-300 bg-paper-200 space-y-3.5">
              <div className="flex items-center justify-between text-xs text-ink-600">
                <span>Vault Subtotal</span>
                <span className="font-serif font-black text-ink-900 text-xl tabular-nums">
                  {formatPrice(subtotalCents)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-forest-800 bg-forest-100 p-2.5 rounded-xl border border-forest-200">
                <ShieldCheck className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span>Instant library vault delivery & permanent license backup</span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsDrawerOpen(false)}
                className="btn-tactile w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-forest-700 hover:bg-forest-600 text-paper-50 rounded-xl font-bold text-sm shadow-editorial transition-all border border-forest-850"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
