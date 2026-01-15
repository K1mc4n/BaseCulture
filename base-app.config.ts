import { defineConfig } from 'base-app-sdk';

export default defineConfig({
  name: 'Base Culture',
  description: 'A global space to discover, preserve, and share cultures — built on Base',
  icon: '/icon.png',
  metadata: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    shortDescription: 'Discover and share global cultures',
    category: 'social',
    author: 'K1mc4n',
    version: '0.1.0',
  },
  permissions: ['wallet', 'analytics'],
  networks: ['base-mainnet', 'base-sepolia'],
});
