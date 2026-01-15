import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || 'default';
  const country = searchParams.get('country') || null;

  // Simple SVG-based OG image generation
  const title = country
    ? `Discover ${country.charAt(0).toUpperCase() + country.slice(1)} Culture`
    : 'Base Culture - Discover Global Cultures';

  const description = country
    ? `Explore the rich cultural heritage of ${country}`
    : 'A global space to discover, preserve, and share cultures — built on Base';

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0052ff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00d9ff;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)"/>
      <text x="600" y="200" font-size="72" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">
        ${title}
      </text>
      <text x="600" y="300" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">
        ${description}
      </text>
      <text x="600" y="550" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif">
        🌍 Built on Base • Powered by Farcaster
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
