"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Eye, ShieldAlert, ZoomIn, ZoomOut, CheckCircle2 } from "lucide-react";

export interface PreviewItem {
  id: string;
  previewUrl: string;
  pageNumber: number;
  watermarkText: string;
}

interface WatermarkPreviewModalProps {
  previews: PreviewItem[];
  title: string;
}

export function WatermarkPreviewModal({ previews, title }: WatermarkPreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : previews.length - 1));
  }, [previews.length]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev < previews.length - 1 ? prev + 1 : 0));
  }, [previews.length]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleNext, handlePrev]);

  if (!previews || previews.length === 0) return null;

  const currentPreview = previews[currentIndex];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 py-3.5 px-4 bg-[#2D3A22] hover:bg-[#3B4D2B] text-[#FAF9F5] text-xs font-sans font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-editorial border border-[#222C1A] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2D3A22]"
      >
        <Eye className="w-4 h-4 text-[#E9DAA2]" />
        <span>Inspect Watermarked Manuscript Samples ({previews.length} pages)</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1E18]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-[#FAF9F5] rounded-3xl max-w-4xl w-full overflow-hidden shadow-editorial-xl flex flex-col max-h-[92vh] border border-[#DDD4C1]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Verified Padding */}
            <div className="px-6 py-5 border-b border-[#EAE4D5] flex items-center justify-between bg-[#F3EFE6] gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans font-bold text-[#2D3A22] bg-[#E4E9DC] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#C7D4B8]">
                    Page {currentIndex + 1} of {previews.length}
                  </span>
                  <span className="text-xs text-[#686E5D] hidden sm:inline">• Evaluation Preview</span>
                </div>
                <h3 id="preview-modal-title" className="text-sm sm:text-base font-serif font-bold text-[#1C1E18] truncate mt-1">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2 text-[#4D5244] hover:text-[#1C1E18] rounded-xl hover:bg-[#EAE4D5] transition"
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                  aria-label={isZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#4D5244] hover:text-[#1C1E18] rounded-xl hover:bg-[#EAE4D5] transition focus-visible:ring-2 focus-visible:ring-[#2D3A22]"
                  aria-label="Close Preview Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Image Stage with Watermark Layer */}
            <div className="flex-1 relative bg-[#EAE4D5]/30 flex items-center justify-center overflow-auto min-h-[440px] max-h-[64vh] select-none p-4 sm:p-6">
              {/* The Actual Page Image */}
              <div className="relative inline-block max-w-full">
                <img
                  src={currentPreview.previewUrl}
                  alt={`Manuscript page ${currentPreview.pageNumber}`}
                  className={`max-h-[58vh] w-auto object-contain shadow-editorial-lg rounded-xl border border-[#DDD4C1] bg-[#FAF9F5] transition-transform duration-200 cursor-zoom-in ${
                    isZoomed ? "scale-140 cursor-zoom-out" : "scale-100"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Diagonal Watermark Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center rotate-[-25deg] space-y-10 sm:space-y-16 opacity-35 overflow-hidden">
                  <span className="text-xl sm:text-3xl font-serif font-black text-[#1C1E18] tracking-widest uppercase border-4 border-[#1C1E18] px-6 py-2.5 rounded-xl bg-[#FAF9F5]/70 shadow-editorial-sm text-center">
                    {currentPreview.watermarkText}
                  </span>
                  <span className="text-base sm:text-2xl font-serif font-black text-[#2D3A22] tracking-widest uppercase">
                    TEACHCONNECT EVALUATION SAMPLE
                  </span>
                </div>
              </div>

              {/* Prev / Next Nav Buttons */}
              {previews.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-3 rounded-full bg-[#FAF9F5]/90 hover:bg-[#FAF9F5] text-[#1C1E18] shadow-editorial transition-all border border-[#DDD4C1] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#2D3A22]"
                    aria-label="Previous Page (Left Arrow)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-3 rounded-full bg-[#FAF9F5]/90 hover:bg-[#FAF9F5] text-[#1C1E18] shadow-editorial transition-all border border-[#DDD4C1] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#2D3A22]"
                    aria-label="Next Page (Right Arrow)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {previews.length > 1 && (
              <div className="p-3 bg-[#F3EFE6] border-t border-[#EAE4D5] flex items-center justify-center gap-3">
                {previews.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsZoomed(false);
                      setCurrentIndex(idx);
                    }}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      currentIndex === idx
                        ? "border-[#2D3A22] ring-2 ring-[#2D3A22]/20 scale-105 shadow-editorial-sm bg-[#FAF9F5]"
                        : "border-[#DDD4C1] opacity-70 hover:opacity-100 bg-[#FAF9F5]"
                    }`}
                    aria-label={`Jump to page ${idx + 1}`}
                  >
                    <img
                      src={item.previewUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 bg-[#1C1E18]/80 text-[#FAF9F5] text-[9px] font-sans font-bold px-1 rounded-tl">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Modal Footer / DRM Notice */}
            <div className="px-6 py-3.5 bg-[#FAF9F5] border-t border-[#EAE4D5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#4D5244] gap-2 font-sans">
              <span className="flex items-center gap-2 text-[#1C1E18]">
                <ShieldAlert className="w-4 h-4 text-[#9C7A3C] flex-shrink-0" />
                <span>Protected by TeachConnect Scholastic DRM. High-resolution files delivered upon checkout.</span>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#686E5D] hidden sm:inline">Use ← → keys to browse</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 bg-[#F3EFE6] hover:bg-[#EAE4D5] text-[#2D3A22] rounded-xl font-bold transition border border-[#DDD4C1]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
