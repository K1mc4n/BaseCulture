import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const COUNTRIES = {
  japan: { name: '🇯🇵 Japan', emoji: '🌸', description: 'Cherry blossoms' },
  india: { name: '🇮🇳 India', emoji: '🕉️', description: 'Mandala beauty' },
  egypt: { name: '🇪🇬 Egypt', emoji: '🔺', description: 'Ancient wonder' },
  brazil: { name: '🇧🇷 Brazil', emoji: '🎉', description: 'Samba spirit' },
  mexico: { name: '🇲🇽 Mexico', emoji: '🌮', description: 'Papel picado' },
  china: { name: '🇨🇳 China', emoji: '🐉', description: 'Dragon grace' },
  greece: { name: '🇬🇷 Greece', emoji: '⚡', description: 'Ancient wisdom' },
  morocco: { name: '🇲🇦 Morocco', emoji: '✨', description: 'Desert magic' },
  korea: { name: '🇰🇷 Korea', emoji: '☯️', description: 'Balance' },
  italy: { name: '🇮🇹 Italy', emoji: '🎨', description: 'Renaissance art' },
  ireland: { name: '🇮🇪 Ireland', emoji: '☘️', description: 'Celtic heritage' },
  peru: { name: '🇵🇪 Peru', emoji: '🏔️', description: 'Incan legacy' },
  thailand: { name: '🇹🇭 Thailand', emoji: '🌺', description: 'Thai grace' },
  usa: { name: '🇺🇸 USA', emoji: '⭐', description: 'American spirit' },
  france: { name: '🇫🇷 France', emoji: '🗼', description: 'French elegance' },
};

function generateFrameHTML(title: string, imageUrl: string, buttons: any[]) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${imageUrl}" />
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  ${buttons.map((btn, idx) => `
  <meta property="fc:frame:button:${idx + 1}" content="${btn.label}" />
  <meta property="fc:frame:button:${idx + 1}:action" content="${btn.action}" />
  <meta property="fc:frame:button:${idx + 1}:target" content="${btn.target}" />
  `).join('')}
  <title>${title}</title>
</head>
<body>
  <h1>${title}</h1>
  <img src="${imageUrl}" alt="Frame image" />
</body>
</html>`;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ country: string }> }
) {
  try {
    const { country: countryParam } = await context.params;
    const country = countryParam.toLowerCase();
    const countryData = COUNTRIES[country as keyof typeof COUNTRIES];

    if (!countryData) {
      return new NextResponse('Country not found', { status: 404 });
    }

    const imageUrl = `${BASE_URL}/api/og?country=${country}`;

    const buttons = [
      {
        label: `${countryData.emoji} View Animation`,
        action: 'link',
        target: `${BASE_URL}?country=${country}`,
      },
      {
        label: '← Back',
        action: 'post',
        target: `${BASE_URL}/api/frames`,
      },
    ];

    const html = generateFrameHTML(
      `${countryData.name} Culture`,
      imageUrl,
      buttons
    );

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Country frame error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
