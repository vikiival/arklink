# Ark Link

A decentralized, encrypted take on Linktree. Every profile bundles social and Web3 actions into a single shareable page while the underlying data lives on Arkiv Network with AES-256-GCM encryption. A matching key is stored off-chain on NFC badges, so creators can gate ownership or updates to whoever physically holds the credential.

## 🚀 Features

- **Decentralized storage.** Social link payloads and profile metadata live on Arkiv Network so creators own the data end to end.
- **Encryption-first design.** Payloads are secured with AES-256-GCM and keys live on NFC badges so only badge holders can publish or update.
- **Ephemeral by default.** Arkiv entities are configured to expire after the conference window, protecting privacy and ensuring no stale data lingers on-chain.
- **Responsive Linktree UI.** Hero section, tabbed link stack (Socials/Web3), POAP claim page, and polished DaisyUI layout tuned for mobile and desktop.
- **Dynamic profiles.** Visiting `/?u=<handle>` resolves profile and header data live from the encrypted payload, letting attendees host their own “decentralized Linktree”.

## 🔗 Tech Stack

- **Next.js 16 / React 19** for the app shell and dynamic routing.
- **Tailwind CSS + DaisyUI + Iconify** for theming, responsive layout, and iconography.
- **Arkiv Network** for ephemeral decentralized storage with attribute queries.
- **Dedot** to underpin any future onchain interactions (Polkadot-focused SDK already scaffolded).
- **AES-256-GCM cipher utilities** in `lib/ciphers.ts` handle payload encryption/decryption.

### Relevant Files
- `app/page.tsx` – Server component that fetches profile data (header + socials) and renders the hero/link tree.
- `app/components/account-tree.tsx` – Tabbed link list (Socials/Web3) with DaisyUI cards.
- `app/components/profile-hero.tsx` – Reusable profile hero with avatar, badge, name, and bio copy.
- `app/memo/page.tsx` – POAP claim experience for “Mint Meet Memo”.
- `app/data/profile.ts` – Default profile header/socials used when no data is available.
- `lib/ciphers.ts` – AES-256-GCM helpers for encrypting data saved to Arkiv.

## 🛠️ Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Run production preview
pnpm start
```

Create a `.env.local` with any required secrets (e.g., `NEXT_PUBLIC_SITE_URL`, Arkiv credentials) before running commands above.

## 📁 Project Structure

```
app/
├── components/     # UI building blocks (header, account tree, etc.)
├── data/           # Default profile metadata
├── hooks/          # Wallet/connect utilities
├── utils/          # SDK helpers and formatters
├── layout.tsx      # Root layout
└── page.tsx        # Profile landing page
lib/
├── ciphers.ts      # AES-256-GCM encrypt/decrypt helpers
└── types.ts        # Shared DTO + profile types
app/api/            # Route handlers (memo, arkiv/u endpoints, etc.)
```

## 🧠 How It Works

1. A creator registers a profile and social payload.
2. Payload is encrypted with AES-256-GCM; the key is written to an NFC badge.
3. Encrypted payload + attributes are stored via Arkiv Network.
4. Visiting `/?u=<handle>` queries `/api/u/:handle`, decrypts payload (server-side), and streams socials/header data to the UI until the Arkiv TTL expires.
5. Frontend renders the hero, social tab, Web3 tab, and memo experience with DaisyUI components.

## ✅ Milestone 1 Outcomes

- Delivered decentralized Linktree UI with social/Web3 tabs and dynamic profile resolution.
- Integrated Arkiv storage read APIs (encrypted payload fetches).
- Built “Mint Meet Memo” POAP claim flow with custom badge artwork.
- Documented cipher utilities so encrypted payloads can be created/updated.

## 📚 Learn More

- [Arkiv Network](https://arkiv.network/)
- [Dedot Docs](https://docs.dedot.dev/)
- [Next.js Docs](https://nextjs.org/docs)
