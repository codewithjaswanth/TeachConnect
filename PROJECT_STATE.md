# TeachConnect Project State

## Architecture & Stack
- Framework: Next.js 15 (App Router, Server Actions, RSC)
- Runtime: Node v24.22.0
- Styling: Tailwind CSS 3.4.17 with Scholastic Tokens & 3D Book Curve Transforms
- Database: SQLite via Prisma ORM v6.19.3
- Dev Server Port: 3000 (Strict)

## Design System: Academic Scholastic Archive
- Palette: Warm Paper (#FAF9F5), Linen (#F3EFE6), Border (#E8E2D2), Forest Olive (#2D3A22, #3B4D2B), Antique Brass (#9C7A3C, #B8934A), Ink Charcoal (#1C1E18, #4D5244)
- Typography: Editorial Serif (Headings & Display), Modern Sans (UI, Controls, Tables, Forms), Tabular Numerals (Data, Pricing)
- Principles: High readability, WCAG 2.2 AA contrast, purposeful spring motion, full keyboard accessibility

## Key Routes & Milestones
- `/` - Homepage: Dynamic Staggered Hero, Rotating Headline Cycler, Live Count-Up Stats, 3D Book-Curved Bent Autoplay Carousel (hover/touch pause), Book-Spine Grade Bands, Earnings Calculator
- `/search` - Faceted Discovery: Mobile Drawer, Active Filter Pills, CCSS/NGSS Filtering, Sort
- `/product/[slug]` - Detail & Dual Licensing: Watermark Preview Modal, Related Curriculum Book Carousel
- `/checkout` & `/checkout/success` - Secure Purchase: Promo engine (BTS2026), PO & Card, Instant Vault
- `/library` - Educator Vault: Download Token Generation, Search, Review Flow
- `/seller/*` - Teacher-Author Portal: Dynamic Tab Nav, Live Ingestion Preview, Stripe Payouts
- `/_not-found` - Scholastic Archive Not-Found Fallback

## Verification Status
- Production Build: 13 routes compiled cleanly (0 lint/type errors)
- E2E Test Suite: 15/15 tests passing (database, royalty tiers, licensing, tokens, reviews)
- Visual & Responsive: Verified via Playwright (Desktop 1440x900 & Mobile 375x812, 0 console errors)
- Easel Canvas: Cleanly removed from homepage and navigation
- Carousel Physics: Book bend, leaf-stack shadows, spine crease, and page-turn animation verified
