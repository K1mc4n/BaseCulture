import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _buttonIndex, _trustedData } = body;

    // Validate trusted data
    if (!_trustedData) {
      return new NextResponse('No valid account association', { status: 404 });
    }

    // Generate response frame
    const imageUrl = `${BASE_URL}/api/og?page=discover`;

    const buttons = [
      {
        label: '🇯🇵 Japan',
        action: 'post',
        target: `${BASE_URL}/api/frames/country/japan`,
      },
      {
        label: '🇮🇳 India',
        action: 'post',
        target: `${BASE_URL}/api/frames/country/india`,
      },
      {
        label: '🇪🇬 Egypt',
        action: 'post',
        target: `${BASE_URL}/api/frames/country/egypt`,
      },
      {
        label: 'More →',
        action: 'post',
        target: `${BASE_URL}/api/frames/more`,
      },
    ];

    const html = generateFrameHTML('Base Culture - Discover', imageUrl, buttons);

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Frame error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  const imageUrl = `${BASE_URL}/api/og?page=discover`;

  const buttons = [
    {
      label: '🌍 Discover Cultures',
      action: 'post',
      target: `${BASE_URL}/api/frames`,
    },
    {
      label: '📱 Open in App',
      action: 'link',
      target: BASE_URL,
    },
  ];

  const html = generateFrameHTML('Base Culture', imageUrl, buttons);

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
