# Wedding invitation

A one-page digital wedding invitation, opened from a link on the phone.

---

## What's inside

- Animated envelope intro (Framer Motion): tap it, the card rises out and
  grows into the invitation
- Language switch: **Albanian** (default) and **Turkish**
- Decorations drawn in code: curtains, chandelier, falling petals, venue
  illustration
- Live countdown to the wedding (days, hours, minutes, seconds)
- Venue with a "show on map" button that opens Google Maps

Everything is in one component, `src/components/WeddingInvitation.jsx`.
There is no backend.

---

## Tech stack

| Area | Tool |
|---|---|
| Build | Vite 5 |
| UI | React 18 |
| Animation | Framer Motion |
| Styling | Tailwind CSS + CSS inside the component |
| Icons | lucide-react |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the build locally |

---

## Editing

All in `src/components/WeddingInvitation.jsx`:

- **Date and time:** `weddingDate` inside the component (drives the
  countdown)
- **Text in both languages:** the `TEXT` object (`al` and `tr`)
- **Venue:** the Google Maps link in the map button

---

## Deployment

`npm run build` writes a static site to `dist/`. Any static host works
(Vercel, Netlify, or plain file hosting).
