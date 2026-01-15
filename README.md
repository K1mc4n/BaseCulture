# Base Culture - Base App Miniapp

A global space to discover, preserve, and share cultures — built on Base.

## Base App Integration

This project is configured as a miniapp that runs within the Base App ecosystem. It leverages the OnchainKit library to provide seamless blockchain interactions on the Base network.

## Features

- 🌍 **Cultural Animations**: 15 country-specific cultural animations as backgrounds
- 🎯 **Country Selector**: Interactive dropdown to switch between cultures
- ⛓️ **Blockchain Ready**: Integrated with OnchainKit for web3 interactions
- 📱 **Mobile Optimized**: Fully responsive design for Base App on mobile
- 🚀 **Fast & Lightweight**: Optimized Next.js 15 setup

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your NEXT_PUBLIC_ONCHAINKIT_API_KEY
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your miniapp.

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Your OnchainKit API key (get from https://dashboard.coinbase.com)
- `NEXT_PUBLIC_PROJECT_NAME` - Display name of your miniapp
- `NEXT_PUBLIC_APP_URL` - Public URL of your deployed miniapp
- `NEXT_PUBLIC_BASE_APP_ID` - Your Base App ID for registry

## Project Structure

```
/app
  ├── page.tsx                    # Main page with cultural animations
  ├── layout.tsx                  # Root layout with Base App config
  ├── rootProvider.tsx            # OnchainKit provider setup
  ├── globals.css                 # Global styles
  ├── culturalAnimations.tsx      # Cultural animation component
  ├── culturalAnimations.css      # Animation styles (15 cultures)
  ├── countrySelector.tsx         # Country selector component
  ├── countrySelector.css         # Selector styles
  └── hooks/
      └── useBaseApp.ts           # Hook for Base App context

/public
  ├── manifest.json               # PWA manifest for Base App
  └── icon-*.png                 # App icons (add your own)

base-app.config.ts              # Base App configuration
.env.example                    # Environment variables template
```

## Supported Cultures

1. **Japan** - Cherry blossoms drifting animation
2. **India** - Mandala spinning animation
3. **Egypt** - Pyramid glowing animation
4. **Brazil** - Samba waves animation
5. **Mexico** - Papel picado fluttering animation
6. **China** - Dragons flying animation
7. **Greece** - Geometric spiral animation
8. **Morocco** - Moroccan tiles shifting animation
9. **Korea** - Yin-yang rotating animation
10. **Italy** - Renaissance pattern glowing animation
11. **Ireland** - Celtic knot weaving animation
12. **Peru** - Incan pattern shifting animation
13. **Thailand** - Thai spiral rotating animation
14. **USA** - Stars twinkling animation
15. **France** - Fleur-de-lis shimmering animation

## Deploying to Base App

1. **Build your miniapp**:
   ```bash
   npm run build
   ```

2. **Deploy to a hosting service** (Vercel, Netlify, etc.):
   ```bash
   # For Vercel
   npm i -g vercel
   vercel
   ```

3. **Register with Base App**:
   - Update `base-app.config.ts` with your deployment URL
   - Submit your miniapp to the Base App registry
   - Ensure your `manifest.json` is properly configured

4. **Add icons** (Required for Base App):
   - Add `/public/icon-192.png` (192x192 PNG)
   - Add `/public/icon-512.png` (512x512 PNG)
   - Optionally add `/public/screenshot-1.png` (540x720 PNG)

## Using the useBaseApp Hook

To detect if your app is running in Base App:

```tsx
import { useBaseApp } from '@/app/hooks/useBaseApp';

export function MyComponent() {
  const { isBaseApp, user } = useBaseApp();

  return (
    <div>
      {isBaseApp && <p>Running in Base App!</p>}
      {user && <p>User: {user.address}</p>}
    </div>
  );
}
```

## Tech Stack

- **Framework**: Next.js 15
- **Blockchain**: Base (Coinbase L2)
- **Web3 Integration**: OnchainKit + wagmi + viem
- **Styling**: CSS Modules + Global CSS
- **State Management**: React Hooks
- **Type Safety**: TypeScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues or questions:
- Check the [OnchainKit documentation](https://docs.base.org/onchainkit)
- Review the [Base App SDK docs](https://docs.base.org)
- Open an issue on GitHub

---

Built with ❤️ for the Base community
