"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/actions/seller";
import { formatPrice } from "@/lib/utils";
import {
  Upload,
  FileText,
  Sparkles,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  Eye,
  Star,
  Check,
} from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("5th Grade Decimal Operations & Area Models Mastery Folio");
  const [description, setDescription] = useState(
    "A rigorous, 3-week comprehensive decimal operations unit. Features 18 visual guided lessons, base-ten block model scaffolds, daily error-analysis warm-ups, and summative assessments with full answer keys."
  );
  const [priceUsd, setPriceUsd] = useState("5.50");
  const [isFree, setIsFree] = useState(false);
  const [pageCount, setPageCount] = useState(32);
  const [isEaselReady, setIsEaselReady] = useState(true);
  const [standards, setStandards] = useState("CCSS.MATH.CONTENT.5.NBT.B.7");
  const [fileName, setFileName] = useState("Decimal_Operations_Master_Unit.pdf");
  const [coverImageUrl, setCoverImageUrl] = useState(
    "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80"
  );

  const [selectedGrades, setSelectedGrades] = useState<string[]>(["5th Grade"]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Math"]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Unit Plans", "Worksheets"]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleGrade = (g: string) => {
    setSelectedGrades((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const toggleSubject = (s: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Title and curriculum description are required.");
      return;
    }

    if (selectedGrades.length === 0) {
      setErrorMessage("Please select at least one grade level.");
      return;
    }

    if (selectedSubjects.length === 0) {
      setErrorMessage("Please select at least one subject area.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const priceCents = isFree ? 0 : Math.round(parseFloat(priceUsd) * 100);
      const standardsList = standards
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await createProduct({
        title,
        description,
        priceCents,
        isFree,
        gradeLevels: selectedGrades,
        subjects: selectedSubjects,
        resourceTypes: selectedTypes,
        pageCount: Number(pageCount),
        fileFormats: isEaselReady ? "PDF, Easel Activity" : "PDF Printable",
        isEaselReady,
        standardsAlignment: standardsList,
        coverImageUrl,
        files: [
          {
            fileName: fileName.trim() || "Curriculum_Package.pdf",
            fileSize: 16500000,
            mimeType: "application/pdf",
          },
        ],
      });

      if (res.success && res.slug) {
        router.push(`/product/${res.slug}`);
      } else {
        setErrorMessage(res.error || "Failed to publish curriculum.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const parsedPriceCents = isFree ? 0 : Math.round((parseFloat(priceUsd) || 0) * 100);

  return (
    <div className="space-y-8 pb-16 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Ingestion Controls */}
        <div className="lg:col-span-7 bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-6 sm:p-8 shadow-editorial-xs">
          <div className="mb-6 pb-4 border-b border-[#EAE4D5]">
            <span className="text-xs font-bold text-[#2D3A22] uppercase tracking-wider">
              Teacher-Author Publishing Studio
            </span>
            <h2 className="text-2xl font-serif font-black text-[#1C1E18] mt-1">
              Upload & Publish Curriculum Unit
            </h2>
            <p className="text-xs text-[#4D5244] mt-1 leading-relaxed">
              Our automated asset pipeline extracts preview thumbnails, stamps diagonal DRM watermarks, and configures secure digital tokens.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-900 text-xs rounded-2xl font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#1C1E18] mb-1.5">
                Resource Title <span className="text-[#C25E3E]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 5th Grade Decimal Operations Mastery Unit"
                className="w-full px-4 py-2.5 bg-[#F3EFE6] border border-[#DDD4C1] focus:border-[#2D3A22] rounded-xl text-xs text-[#1C1E18] placeholder-[#686E5D] focus:outline-none focus:bg-[#FAF9F5] shadow-inner"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#1C1E18] mb-1.5">
                Curriculum Synopsis & Teacher Guidance <span className="text-[#C25E3E]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the instructional design, what is included (lesson plans, answer keys, worksheets), and student benefits..."
                className="w-full px-4 py-2.5 bg-[#F3EFE6] border border-[#DDD4C1] focus:border-[#2D3A22] rounded-xl text-xs text-[#1C1E18] placeholder-[#686E5D] focus:outline-none focus:bg-[#FAF9F5] shadow-inner"
              />
            </div>

            {/* Grade Level Selector */}
            <div>
              <label className="block text-xs font-bold text-[#1C1E18] mb-2">
                Target Grade Levels <span className="text-[#C25E3E]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Pre-K",
                  "Kindergarten",
                  "1st Grade",
                  "2nd Grade",
                  "3rd Grade",
                  "4th Grade",
                  "5th Grade",
                  "6th Grade",
                  "7th Grade",
                  "8th Grade",
                  "High School",
                ].map((grade) => {
                  const isSelected = selectedGrades.includes(grade);
                  return (
                    <button
                      type="button"
                      key={grade}
                      onClick={() => toggleGrade(grade)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#2D3A22] text-[#FAF9F5] font-bold shadow-editorial-xs"
                          : "bg-[#F3EFE6] text-[#4D5244] hover:bg-[#EAE4D5] hover:text-[#1C1E18] border border-[#DDD4C1]"
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject Area Selector */}
            <div>
              <label className="block text-xs font-bold text-[#1C1E18] mb-2">
                Subject Area <span className="text-[#C25E3E]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Math",
                  "ELA",
                  "Reading",
                  "Writing",
                  "Science",
                  "Social Studies",
                  "Special Education",
                  "Classroom Management",
                ].map((sub) => {
                  const isSelected = selectedSubjects.includes(sub);
                  return (
                    <button
                      type="button"
                      key={sub}
                      onClick={() => toggleSubject(sub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#2D3A22] text-[#FAF9F5] font-bold shadow-editorial-xs"
                          : "bg-[#F3EFE6] text-[#4D5244] hover:bg-[#EAE4D5] hover:text-[#1C1E18] border border-[#DDD4C1]"
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Standards & Page Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1E18] mb-1.5">
                  Standards Alignment (CCSS, NGSS)
                </label>
                <input
                  type="text"
                  value={standards}
                  onChange={(e) => setStandards(e.target.value)}
                  placeholder="e.g. CCSS.MATH.CONTENT.5.NBT.B.7"
                  className="w-full px-4 py-2.5 bg-[#F3EFE6] border border-[#DDD4C1] focus:border-[#2D3A22] rounded-xl text-xs text-[#1C1E18] focus:outline-none focus:bg-[#FAF9F5] shadow-inner font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1E18] mb-1.5">
                  Total Page Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-[#F3EFE6] border border-[#DDD4C1] focus:border-[#2D3A22] rounded-xl text-xs text-[#1C1E18] focus:outline-none focus:bg-[#FAF9F5] shadow-inner tabular-nums"
                />
              </div>
            </div>

            {/* Digital File Attachment Pipeline */}
            <div className="p-5 bg-[#F3EFE6] rounded-2xl border border-[#DDD4C1] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1C1E18]">
                <Upload className="w-4 h-4 text-[#2D3A22]" />
                <span>Digital Asset Ingestion Pipeline</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4D5244] mb-1">
                    Primary File Name
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD4C1] rounded-xl text-xs text-[#1C1E18]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4D5244] mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD4C1] rounded-xl text-xs text-[#1C1E18]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#4D5244] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#2D3A22] flex-shrink-0" />
                <span>Files will be ingested into encrypted S3 vaults with automated DRM watermarking.</span>
              </div>
            </div>

            {/* Pricing & Easel Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Pricing Box */}
              <div className="p-4 bg-[#F3EFE6] rounded-2xl border border-[#DDD4C1] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1C1E18]">Pricing</label>
                  <label className="flex items-center gap-1.5 text-xs text-[#4D5244] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFree}
                      onChange={(e) => setIsFree(e.target.checked)}
                      className="rounded text-[#2D3A22] focus:ring-[#2D3A22]"
                    />
                    <span className="font-semibold">Complimentary</span>
                  </label>
                </div>

                {!isFree && (
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#686E5D] text-xs font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.25"
                      min="0.50"
                      value={priceUsd}
                      onChange={(e) => setPriceUsd(e.target.value)}
                      className="w-full pl-7 pr-4 py-2 bg-[#FAF9F5] border border-[#DDD4C1] rounded-xl text-xs font-bold text-[#1C1E18] focus:outline-none focus:border-[#2D3A22] tabular-nums"
                    />
                  </div>
                )}
              </div>

              {/* Easel Toggle */}
              <div className="p-4 bg-[#E4E9DC]/70 rounded-2xl border border-[#C7D4B8] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D3A22]">
                    <Sparkles className="w-4 h-4 text-[#9C7A3C]" />
                    <span>Easel by TeachConnect Suite</span>
                  </div>
                  <p className="text-[11px] text-[#4D5244] mt-1 leading-relaxed">
                    Auto-enables interactive assignment dispatch for Google Classroom.
                  </p>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-[#2D3A22] cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    checked={isEaselReady}
                    onChange={(e) => setIsEaselReady(e.target.checked)}
                    className="rounded text-[#2D3A22] focus:ring-[#2D3A22]"
                  />
                  <span>Enable Easel Digital Interactivity</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#2D3A22] hover:bg-[#3B4D2B] disabled:opacity-50 text-[#FAF9F5] font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-editorial transition border border-[#222C1A] active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span>Publishing to Marketplace & Generating Watermarks...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#E9DAA2]" />
                  <span>Publish to TeachConnect Catalog</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Sticky Preview: Real-time Live Product Preview Card */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9C7A3C] flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#2D3A22]" /> Live Catalog Rendering
            </span>
            <span className="text-[11px] text-[#686E5D]">Updates in real-time</span>
          </div>

          <div className="bg-[#FAF9F5] rounded-3xl border border-[#DDD4C1] p-5 shadow-editorial space-y-4">
            {/* Mock Card */}
            <div className="rounded-2xl border border-[#DDD4C1] overflow-hidden bg-[#FAF9F5] shadow-editorial-xs">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFE6]">
                <img
                  src={coverImageUrl}
                  alt="Live Cover Preview"
                  className="w-full h-full object-cover"
                />
                {isEaselReady && (
                  <div className="absolute top-2.5 left-2.5 bg-[#2D3A22]/90 backdrop-blur-xs text-[#FAF9F5] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-editorial-xs border border-[#9C7A3C]/40">
                    <Sparkles className="w-3 h-3 text-[#E9DAA2]" />
                    <span>Easel Activity</span>
                  </div>
                )}
                {isFree && (
                  <div className="absolute top-2.5 right-2.5 bg-[#557054] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-editorial-xs uppercase tracking-wider">
                    Free Folio
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {selectedGrades.map((g) => (
                    <span
                      key={g}
                      className="text-[10px] font-semibold bg-[#F3EFE6] text-[#2D3A22] px-2 py-0.5 rounded border border-[#DDD4C1]"
                    >
                      {g}
                    </span>
                  ))}
                  {selectedSubjects.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-semibold bg-[#E4E9DC] text-[#2D3A22] px-2 py-0.5 rounded border border-[#C7D4B8]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <h3 className="font-serif font-bold text-[#1C1E18] text-sm line-clamp-2 leading-snug">
                  {title || "Untitled Curriculum Unit"}
                </h3>

                <p className="text-xs text-[#686E5D]">
                  By <span className="font-semibold text-[#1C1E18]">MathCraft Studios</span>
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[#9C7A3C]">
                  <span>★ 5.0</span>
                  <span className="text-[#686E5D] font-normal">(New Publication)</span>
                </div>

                <div className="pt-3 border-t border-[#EAE4D5] flex items-center justify-between">
                  <span className="font-bold text-base text-[#1C1E18] tabular-nums">
                    {formatPrice(parsedPriceCents)}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1.5 bg-[#2D3A22] text-[#FAF9F5] rounded-xl shadow-editorial-xs">
                    Add to Cart
                  </span>
                </div>
              </div>
            </div>

            {/* Spec info */}
            <div className="p-4 bg-[#F3EFE6] rounded-2xl border border-[#DDD4C1] text-xs space-y-1.5 text-[#4D5244]">
              <div className="flex justify-between">
                <span>Aligned Standard:</span>
                <span className="font-mono font-bold text-[#1C1E18]">{standards || "None specified"}</span>
              </div>
              <div className="flex justify-between">
                <span>Manuscript Length:</span>
                <span className="font-bold text-[#1C1E18] tabular-nums">{pageCount} pages</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Take Rate:</span>
                <span className="font-bold text-[#2D3A22]">77.5% ($4.26 / sale)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
