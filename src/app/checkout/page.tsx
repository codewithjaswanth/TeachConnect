"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { processCheckout } from "@/app/actions/checkout";
import { formatPrice } from "@/lib/utils";
import {
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Scroll,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, clearCart } = useCart();

  const [buyerName, setBuyerName] = useState("Sarah Jenkins");
  const [buyerEmail, setBuyerEmail] = useState("teacher@school.edu");
  const [schoolName, setSchoolName] = useState("Oakridge Elementary School");
  const [paymentMethod, setPaymentMethod] = useState<"STRIPE_CARD" | "SCHOOL_PO">("STRIPE_CARD");
  const [poNumber, setPoNumber] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "BTS2026") {
      setAppliedPromo("BTS2026");
      setDiscountPercent(20);
      setErrorMessage("");
    } else if (code === "TEACHER10") {
      setAppliedPromo("TEACHER10");
      setDiscountPercent(10);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid promo code. Enter 'BTS2026' for 20% Back-to-School discount.");
    }
  };

  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  const finalTotalCents = Math.max(0, subtotalCents - discountCents);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage("Your cart vault is empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await processCheckout({
        buyerName,
        buyerEmail,
        schoolName: schoolName.trim() || undefined,
        paymentMethod,
        poNumber: poNumber.trim() || undefined,
        promoCode: appliedPromo || undefined,
        items: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          priceCents: i.priceCents,
          licenseType: i.licenseType,
          seatCount: i.seatCount,
        })),
      });

      if (res.success && res.orderId) {
        clearCart();
        router.push(`/checkout/success?orderId=${res.orderId}`);
      } else {
        setErrorMessage(res.error || "Acquisition failed. Please verify order details.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4 bg-paper-100 min-h-[70vh] font-sans">
        <div className="w-16 h-16 bg-paper-200 rounded-2xl flex items-center justify-center mx-auto text-forest-700 border border-paper-400 shadow-editorial-xs">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-black text-ink-900">Your Cart Vault is Empty</h1>
        <p className="text-xs sm:text-sm text-ink-600 max-w-sm mx-auto leading-relaxed">
          Add teacher-created lesson plans, printables, or digital Easel activities to proceed with checkout.
        </p>
        <Link
          href="/search"
          className="btn-tactile inline-block px-6 py-3 bg-forest-700 hover:bg-forest-600 text-paper-50 rounded-xl text-xs font-bold transition shadow-editorial-xs border border-forest-800"
        >
          Explore Scholastic Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-paper-100 min-h-screen font-sans">
      {/* Checkout Header */}
      <div className="mb-8 border-b border-paper-300 pb-6">
        <span className="text-xs font-bold text-forest-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
          <Scroll className="w-4 h-4 text-brass-500" />
          <span>Secure Scholastic Acquisition</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-ink-900">
          Review & Complete Order
        </h1>
        <p className="text-xs sm:text-sm text-ink-600 mt-1">
          Instant digital fulfillment delivered to your library vault upon confirmation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Forms */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-2 space-y-8">
          {errorMessage && (
            <div className="p-4 bg-terracotta-50 border border-terracotta-200 text-terracotta-700 text-xs rounded-2xl font-medium animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* 1. Educator & District Info */}
          <div className="bg-paper-50 rounded-3xl border border-paper-400 p-6 sm:p-8 space-y-5 shadow-editorial-xs">
            <h2 className="text-base font-serif font-bold text-ink-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-forest-700 text-paper-50 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Educator & Institution Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1.5">
                  Full Educator Name
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-paper-200 border border-paper-400 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-forest-700 focus:bg-paper-50 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 mb-1.5">
                  School / Work Email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-paper-200 border border-paper-400 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-forest-700 focus:bg-paper-50 shadow-inner"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-ink-900 mb-1.5">
                  School or District Name
                </label>
                <input
                  type="text"
                  autoComplete="organization"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. Oakridge Public School District"
                  className="w-full px-4 py-2.5 bg-paper-200 border border-paper-400 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-forest-700 focus:bg-paper-50 shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="bg-paper-50 rounded-3xl border border-paper-400 p-6 sm:p-8 space-y-5 shadow-editorial-xs">
            <h2 className="text-base font-serif font-bold text-ink-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-forest-700 text-paper-50 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Payment & Procurement Method</span>
            </h2>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("STRIPE_CARD")}
                className={`btn-tactile p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                  paymentMethod === "STRIPE_CARD"
                    ? "border-forest-700 bg-paper-200 ring-1 ring-forest-700/20 shadow-editorial-xs"
                    : "border-paper-400 bg-paper-50 hover:bg-paper-200/60"
                }`}
              >
                <CreditCard className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-ink-900">Credit or Debit Card</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">Secure 256-bit encryption via Stripe</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("SCHOOL_PO")}
                className={`btn-tactile p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                  paymentMethod === "SCHOOL_PO"
                    ? "border-forest-700 bg-paper-200 ring-1 ring-forest-700/20 shadow-editorial-xs"
                    : "border-paper-400 bg-paper-50 hover:bg-paper-200/60"
                }`}
              >
                <Building2 className="w-5 h-5 text-brass-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-ink-900">School Purchase Order</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">Official Net-30 district invoice</p>
                </div>
              </button>
            </div>

            {/* Card Simulator */}
            {paymentMethod === "STRIPE_CARD" ? (
              <div className="p-5 bg-paper-200 rounded-2xl border border-paper-400 space-y-3.5">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-paper-400">
                  <span className="flex items-center gap-1.5 font-bold text-forest-800">
                    <Lock className="w-3.5 h-3.5 text-forest-700" />
                    Stripe PCI-DSS Level 1 Encrypted
                  </span>
                  <span className="font-mono text-[10px] text-brass-600 font-bold">DEMO SANDBOX READY</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-ink-900 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="•••• •••• •••• 4242 (Instant Verification)"
                    className="w-full px-3.5 py-2.5 bg-paper-50 border border-paper-400 rounded-xl text-xs font-mono text-ink-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-ink-900 mb-1">
                      Expiration
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="12 / 28"
                      className="w-full px-3.5 py-2.5 bg-paper-50 border border-paper-400 rounded-xl text-xs font-mono text-ink-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-ink-900 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="•••"
                      className="w-full px-3.5 py-2.5 bg-paper-50 border border-paper-400 rounded-xl text-xs font-mono text-ink-900"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-forest-100/70 rounded-2xl border border-forest-200 space-y-3">
                <label className="block text-xs font-bold text-forest-800">
                  District Purchase Order (PO) Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PO-2026-DISTRICT-8491"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-paper-50 border-2 border-forest-300 rounded-xl text-xs text-ink-900 focus:outline-none focus:border-forest-700"
                />
                <p className="text-[11px] text-ink-600 leading-relaxed">
                  Your district business office will receive the official Net-30 invoice with itemized line items upon confirmation.
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-tactile w-full py-4 px-6 bg-forest-700 hover:bg-forest-600 disabled:opacity-50 text-paper-50 font-bold rounded-2xl text-sm flex items-center justify-center gap-2.5 transition shadow-editorial border border-forest-850"
          >
            {isSubmitting ? (
              <span>Processing Acquisition & Generating Tokens...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-brass-300" />
                <span>Complete Acquisition & Open Vault ({formatPrice(finalTotalCents)})</span>
              </>
            )}
          </button>
        </form>

        {/* Right 1 Column: Summary */}
        <div className="space-y-6">
          <div className="bg-paper-50 rounded-3xl border border-paper-400 p-6 space-y-6 shadow-editorial-xs sticky top-28">
            <h3 className="text-base font-serif font-bold text-ink-900">
              Order Summary ({items.length} folios)
            </h3>

            {/* Items list */}
            <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 text-xs">
                  <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover bg-paper-200 flex-shrink-0 border border-paper-400"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ink-900 truncate">{item.title}</p>
                    <p className="text-[11px] text-ink-500">
                      {item.seatCount}x {item.licenseType === "SCHOOL_SEAT" ? "School License" : "Classroom License"}
                    </p>
                    <p className="font-extrabold text-ink-900 mt-0.5 tabular-nums">
                      {formatPrice(item.priceCents * item.seatCount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <div className="pt-4 border-t border-paper-300">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (try BTS2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-paper-200 border border-paper-400 rounded-xl text-xs uppercase text-ink-900 placeholder-ink-500 focus:outline-none focus:border-forest-700"
                />
                <button
                  type="submit"
                  className="btn-tactile px-4 py-2 bg-ink-900 hover:bg-black text-paper-50 text-xs font-bold rounded-xl transition"
                >
                  Apply
                </button>
              </form>
              {appliedPromo && (
                <p className="text-[11px] text-forest-800 bg-forest-100 p-2 rounded-xl mt-2 flex items-center gap-1.5 border border-forest-200 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-forest-700" /> Code {appliedPromo} applied ({discountPercent}% scholarship discount)!
                </p>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="pt-4 border-t border-paper-300 space-y-2.5 text-xs text-ink-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-ink-900 tabular-nums">{formatPrice(subtotalCents)}</span>
              </div>

              {discountCents > 0 && (
                <div className="flex justify-between text-forest-800 font-bold">
                  <span>Educator Discount ({discountPercent}%)</span>
                  <span className="tabular-nums">-{formatPrice(discountCents)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Educational Tax Status</span>
                <span className="text-forest-800 font-semibold">Exempt ($0.00)</span>
              </div>

              <div className="flex justify-between text-base font-serif font-black text-ink-900 pt-3 border-t border-paper-300">
                <span>Total Due</span>
                <span className="text-lg text-forest-800 tabular-nums">{formatPrice(finalTotalCents)}</span>
              </div>
            </div>

            <div className="p-3 bg-forest-100/60 rounded-2xl flex items-center gap-2.5 text-[11px] text-forest-800 border border-forest-200">
              <ShieldCheck className="w-4 h-4 text-forest-700 flex-shrink-0" />
              <span>Instant digital archive access. Permanent backup in your library vault.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
