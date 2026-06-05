<p align="center">
  <h1 align="center">🛒 AE Store</h1>
  <p align="center">
    A modern, full-featured e-commerce web application built as an assessment project for <strong>ElectroPi</strong>.
    <br />
    <a href="#-live-demo"><strong>View Live Demo »</strong></a>
  </p>
</p>

---

## 📖 Project Overview

**AE Store** is a responsive e-commerce storefront that lets users browse products, filter by category, search by name, view detailed product pages, manage a shopping cart, and curate a wishlist — all with a polished UI and smooth user experience.

The app consumes the [Platzi Fake Store API](https://fakeapi.platzi.com/) for product and category data and uses **NextAuth.js** for credential-based authentication. Client-side state (cart & wishlist) is managed with **Zustand**, while server/async state is handled by **TanStack React Query**.

---

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) primitives + [shadcn/ui](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Authentication** | [NextAuth.js v4](https://next-auth.js.org/) (Credentials provider) |
| **Server State** | [TanStack React Query v5](https://tanstack.com/query) |
| **Client State** | [Zustand](https://zustand.docs.pmnd.rs/) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| **Image Uploads** | [Cloudinary](https://cloudinary.com/) via `next-cloudinary` |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) (Light / Dark / System) |

---

## ✨ Core Features

- **Product Catalog** — Browse a paginated grid of products fetched from a REST API.
- **Category Filtering** — Filter products by category using a sidebar with checkbox controls.
- **Search** — Search products by title directly from the navbar.
- **Product Details** — View full product information with an image gallery, pricing, quantity selector, and related products.
- **Shopping Cart** — Add products with quantity control, view an order summary, and proceed to checkout (Zustand-powered).
- **Wishlist** — Toggle products in and out of a wishlist; bulk-clear with a single click.
- **Authentication** — Register and log in with email/password credentials via NextAuth.js.
- **Dark Mode** — System-aware theme switching (light / dark / system) with `next-themes`.
- **Skeleton Loading** — Graceful loading states with animated skeleton placeholders for products, cart, and sidebar.
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop viewports with a collapsible mobile menu (Sheet).
- **Share Product** — Copy a product's URL to the clipboard for easy sharing.
- **Custom 404 Page** — A branded "Page Not Found" screen with navigation options.
- **Pagination** — Navigate through product pages with a clean pagination component.

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or yarn / pnpm)

### 1. Clone the repository

```bash
git clone https://github.com/abdelrhman-elnhas/electropi-assessment.git
cd electropi-assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root with the following variables:

```env
# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Platzi Fake Store API (default base URL)
NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production (optional)

```bash
npm run build
npm start
```

---

## 🗂 Project Tree

```
electropi-assessment/
├── app/
│   ├── (main)/                    # Main layout group (Navbar + Footer)
│   │   ├── layout.tsx             # Shared layout with Navbar & Footer
│   │   ├── page.tsx               # Home — product catalog with filters
│   │   ├── cart/
│   │   │   └── page.tsx           # Shopping cart page
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Product details (dynamic route)
│   │   └── wishlist/
│   │       └── page.tsx           # Wishlist page
│   │
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/     # NextAuth.js API route
│   │
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx           # Login page
│   │   └── register/
│   │       └── page.tsx           # Registration page
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── skeleton.tsx
│   │   ├── CartContent.tsx        # Cart items & order summary
│   │   ├── CartSkeleton.tsx       # Cart loading skeleton
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   ├── PaginationSection.tsx  # Reusable pagination controls
│   │   ├── ProductCard.tsx        # Product grid card
│   │   ├── ProductsContent.tsx    # Product listing with sidebar filters
│   │   ├── ProductsSkeleton.tsx   # Products loading skeleton
│   │   ├── QueryClientWrapper.tsx # React Query provider
│   │   └── SectionHeader.tsx      # Reusable section header
│   │
│   ├── hooks/
│   │   ├── useCategories.tsx      # Fetch all categories
│   │   ├── useProducts.tsx        # Fetch paginated/filtered products
│   │   ├── useProductsByCategoryId.tsx
│   │   └── useSingleProduct.tsx   # Fetch a single product by ID
│   │
│   ├── lib/                       # Shared libraries & configs
│   │
│   ├── providers/
│   │   ├── NextAuthProvider.tsx   # NextAuth session provider
│   │   └── Providers.tsx          # Theme provider (next-themes)
│   │
│   ├── services/
│   │   ├── fetchProducts.tsx      # Products API service
│   │   ├── getCategories.tsx      # Categories API service
│   │   ├── getProductById.tsx     # Single product API service
│   │   ├── getProductsByCategoryId.tsx
│   │   └── uploadToCloudinary.tsx # Cloudinary upload helper
│   │
│   ├── store/
│   │   ├── cart.ts                # Zustand cart store
│   │   └── wishlist.ts            # Zustand wishlist store
│   │
│   ├── types/
│   │   ├── next-auth.d.ts         # NextAuth type augmentation
│   │   └── types.ts               # Product, Category, User interfaces
│   │
│   ├── utils/
│   │   └── utils.ts               # cn() Tailwind merge utility
│   │
│   ├── validators/
│   │   └── auth.schema.ts         # Zod schemas for login & register
│   │
│   ├── globals.css                # Global styles & Tailwind imports
│   ├── layout.tsx                 # Root layout (providers, fonts)
│   └── not-found.tsx              # Custom 404 page
│
├── .env.local                     # Environment variables (not committed)
├── .gitignore
├── components.json                # shadcn/ui configuration
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🔗 Live Demo

<!-- > 🚧 _Coming soon — deployment link will be added here._ -->

 [Live Demo](https://your-deployment-url.vercel.app)

---

## 👤 Author

**Abdelrhman A. Elnhas**

- GitHub: [@abdelrhman-elnhas](https://github.com/abdelrhman-elnhas)

---

<p align="center">
  Built with ❤️ for the <strong>ElectroPi</strong> assessment.
</p>
