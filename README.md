# Explore Cambodia

A React + Vite site for exploring Cambodia's provinces — what to visit, where
to eat, and where to sleep in each one — with Firebase email/password login.

## Pages

- **Home** (`/`) — hero, featured provinces, sample stays, testimonials
- **Provinces** (`/provinces`) — searchable, filterable list of all provinces
- **Province details** (`/provinces/:id`) — visit / eat / sleep info per province
- **Favorites** (`/favorites`) — saved provinces (stored in `localStorage`)
- **Login / Register** (`/login`, `/register`) — Firebase email+password auth
- **Profile** (`/profile`) — signed-in user info + their saved provinces (protected route)
- **Contact** (`/contact`) — contact form (UI only — see note below)
- **Admin** (`/admin`) — placeholder dashboard (protected route)

## Getting started

```bash
npm install
```

### Set up Firebase

1. Create a project at https://console.firebase.google.com
2. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
3. In **Project settings → General → Your apps**, add a Web app and copy the config.
4. Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

5. Restart the dev server after creating/editing `.env` — Vite only reads env
   vars on startup.

### Run it

```bash
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Content

Province content (visit / eat / sleep entries, images, descriptions) lives in
`src/data/provinces.js` — edit that file to add provinces or update info.
Images there currently hotlink to Wikimedia Commons as placeholders; swap in
your own photos when you have them.

## Notes / next steps

- **Favorites** currently persist in the browser's `localStorage`, so they
  work without a database and even before logging in. To sync favorites
  across devices per-user, move them into a Firestore collection keyed by
  `currentUser.uid` — `src/context/FavoritesContext.jsx` is the only file
  that would need to change.
- **Contact form** currently just shows a success message on submit. Wire it
  to an email service (Formspree, EmailJS) or a Firestore `messages`
  collection when you're ready.
- **Admin page** is a placeholder — hook it up to Firestore if you want to
  edit province content from the UI instead of editing `provinces.js`
  directly.
