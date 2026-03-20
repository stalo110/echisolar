# EchiSolar Frontend

React + Vite storefront for the EchiSolar solar products marketplace with Material UI, adaptive theming, JWT authentication, and session-aware cart management.

## Quick start

1. Copy `.env.example` → `.env` and set your backend + payment keys.
2. Install dependencies:

   ```bash
   cd echisolar
   npm install
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` (default) and use the login page to sign in with the test credentials described in the backend README.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL for the Express backend (e.g., `http://localhost:5000/api`). |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key for rendering checkout forms. |
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public key (used by payments components). |
| `VITE_FLUTTERWAVE_PUBLIC_KEY` | Flutterwave public key for inline checkout fallback. |

## Feature highlights

- Catalog powered by the `/products` endpoint with live data and Cloudinary assets.
- JWT-based auth that stores tokens in `localStorage` and auto-attaches them to axios requests.
- Cart synchronized with the backend (guest fallback via `localStorage` plus server persistence once signed in).
- Responsive checkout flow hooks into Stripe + Paystack clients and guides users to `/checkout`.
- Toast-based feedback, loading-aware buttons, and guided error handling for better UX.
- Payment status page styled like product cards, including dashboard CTA + WhatsApp free-delivery shortcut.
- Fixed WhatsApp floating action button shown across all pages.
- Updated company contact details across Contact/About/Footer and embedded Google Maps location.
- Admin dashboard messages page for viewing contact form submissions, marking read/unread, and sending replies.
- Added `/delivery-info` page and a dedicated 404 page for broken routes.

## Documentation

- Backend API reference & Postman-friendly collection: `docs/postman_collection.md`.
- Deployment & backend setup notes: `echisolar-backend/README.md`.

## Deployment

Use `npm run build` and serve the `dist/` directory through your preferred static host. Ensure `VITE_API_URL` points to the live backend and the payment keys are production-ready.
