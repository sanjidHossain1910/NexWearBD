# Nexwear

Production-ready men's fashion e-commerce starter built with Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui-style primitives, MongoDB/Mongoose, NextAuth credentials, React Hook Form, Zod, Zustand, Cloudinary, and Lucide icons.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Set `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Google OAuth credentials, and Cloudinary credentials.

4. Seed sample data:
   ```bash
   npm run seed
   ```

5. Start development:
   ```bash
   npm run dev
   ```

Admin login after seeding:

```text
admin@nexwear.com
admin123
```

## Google OAuth

Add these values to `.env`:

```text
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

In Google Cloud Console, add this authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

For production, also add:

```text
https://your-domain.com/api/auth/callback/google
```

## Architecture

- `src/app`: App Router pages, route handlers, metadata, sitemap, robots.
- `src/components`: Reusable UI split by domain: layout, home, products, cart, checkout, account, admin, ui.
- `src/models`: Mongoose schemas for User, Product, Category, Cart, Order, Review, Coupon, Banner.
- `src/services`: Database-backed read/write services shared by pages and APIs.
- `src/actions`: Server Actions for auth, checkout, and admin product writes.
- `src/validators`: Zod schemas for auth, product, order, and review payloads.
- `src/store`: Redux user/product slices plus Zustand stores for cart and wishlist.
- `src/hooks`: Reusable client hooks such as recently viewed products.

## API Routes

- `GET/POST /api/products`
- `GET /api/products/[slug]`
- `GET /api/categories`
- `GET/PUT /api/cart`
- `GET/POST /api/orders`
- `PATCH /api/orders/[id]`
- `POST /api/reviews`
- `GET /api/coupons`
- `GET /api/banners`
- `POST /api/uploads`
- `POST /api/auth/register`
- `GET/POST /api/auth/[...nextauth]`
