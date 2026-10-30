"use client";

import React, { useState, useEffect } from "react";
import { Star, X, CheckCircle2 } from "lucide-react";
import { submitReview } from "@/app/actions/review";

interface ReviewModalProps {
  productId: string;
  productTitle: string;
}

export function ReviewModal({ productId, productTitle }: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [gradeTaught, setGradeTaught] = useState("5th Grade");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData();
    fd.append("productId", productId);
    fd.append("rating", rating.toString());
    fd.append("comment", comment);
    fd.append("gradeTaught", gradeTaught);

    const res = await submitReview(fd);
    setIsSubmitting(false);
    if (res.success) {
      setIsDone(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsDone(false);
      }, 1500);
    }
  };

  const ratingDescriptions: Record<number, string> = {
    1: "Needs significant improvement",
    2: "Fair - required heavy adaptation",
    3: "Good - solid classroom supplement",
    4: "Very good - highly engaging for students",
    5: "Exceptional master curriculum - flawless",
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-tactile px-3.5 py-2 rounded-xl text-xs font-sans font-semibold text-forest-800 bg-paper-200 hover:bg-paper-300 border border-paper-400 flex items-center gap-1.5 transition-colors shadow-editorial-xs"
        aria-label={`Write a review for ${productTitle}`}
      >
        <Star className="w-3.5 h-3.5 text-brass-500 fill-brass-500" />
        <span>Review Resource</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink-900/75 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-paper-50 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-editorial-xl relative border border-paper-400"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="btn-tactile absolute right-4 top-4 text-ink-500 hover:text-ink-900 p-1.5 rounded-xl hover:bg-paper-200 transition"
              aria-label="Close Review Dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isDone ? (
              <div className="py-8 text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 bg-forest-100 text-forest-700 rounded-2xl flex items-center justify-center mx-auto border border-forest-200 shadow-editorial-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-black text-ink-900">
                  Thank you for your educator review!
                </h3>
                <p className="text-xs text-ink-600 leading-relaxed max-w-xs mx-auto">
                  Your classroom feedback helps fellow teachers discover dependable teaching materials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brass-600 font-bold block">
                    Verified Educator Evaluation
                  </span>
                  <h3 className="text-lg font-serif font-black text-ink-900 mt-0.5">Review Curriculum</h3>
                  <p className="text-xs text-ink-600 line-clamp-1 mt-0.5">{productTitle}</p>
                </div>

                {/* Rating Stars with Hover Feedback */}
                <div className="p-3.5 bg-paper-200 rounded-2xl border border-paper-400">
                  <label className="block text-xs font-bold text-ink-900 mb-1.5">
                    Instructional Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || rating);
                      return (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="btn-tactile p-1 hover:scale-115 transition-transform"
                          aria-label={`Rate ${star} out of 5 stars`}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              active
                                ? "text-brass-500 fill-brass-500"
                                : "text-paper-400 fill-paper-100"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-forest-800 font-semibold mt-2">
                    {ratingDescriptions[hoverRating || rating]}
                  </p>
                </div>

                {/* Grade Taught */}
                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1.5">
                    Grade Level You Taught
                  </label>
                  <input
                    type="text"
                    required
                    value={gradeTaught}
                    onChange={(e) => setGradeTaught(e.target.value)}
                    placeholder="e.g. 5th Grade, Kindergarten, 8th Grade Science"
                    className="w-full px-3.5 py-2.5 bg-paper-200 border border-paper-400 focus:border-forest-700 rounded-xl text-xs text-ink-900 placeholder-ink-500 focus:outline-none focus:bg-paper-50 shadow-inner"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-ink-900 mb-1.5">
                    Classroom Experience & Student Response
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe how your students responded to this unit, helpful differentiation tips, or lesson highlights..."
                    className="w-full px-3.5 py-2.5 bg-paper-200 border border-paper-400 focus:border-forest-700 rounded-xl text-xs text-ink-900 placeholder-ink-500 focus:outline-none focus:bg-paper-50 shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-tactile w-full py-3 bg-forest-700 hover:bg-forest-600 disabled:opacity-50 text-paper-50 rounded-xl text-xs font-bold transition shadow-editorial-xs"
                >
                  {isSubmitting ? "Submitting Review..." : "Post Teacher Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
