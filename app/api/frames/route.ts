import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { buttonIndex, trustedData } = body;

    // Get frame data from Farcaster
    const frameData = trustedData?.messageBytes;

    // Generate response frame
    const imageUrl = `${BASE_URL}/api/og?page=discover`;

    return NextResponse.json({
      version: 'vNext',
      image: imageUrl,
      buttons: [
        {
          label: '🇯🇵 Japan',
          action: 'post',
          target: `${BASE_URL}/api/frames/country?country=japan`,
        },
        {
          label: '🇮🇳 India',
          action: 'post',
          target: `${BASE_URL}/api/frames/country?country=india`,
        },
        {
          label: '🇪🇬 Egypt',
          action: 'post',
          target: `${BASE_URL}/api/frames/country?country=egypt`,
        },
        {
          label: 'More →',
          action: 'post',
          target: `${BASE_URL}/api/frames/more`,
        },
      ],
    });
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json(
      { error: 'Failed to process frame' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const imageUrl = `${BASE_URL}/api/og?page=discover`;

  return NextResponse.json({
    version: 'vNext',
    image: imageUrl,
    buttons: [
      {
        label: '🌍 Discover Cultures',
        action: 'post',
        target: `${BASE_URL}/api/frames/discover`,
      },
      {
        label: '🎨 View Animations',
        action: 'post',
        target: `${BASE_URL}/api/frames/animations`,
      },
      {
        label: '📱 Open in App',
        action: 'link',
        target: BASE_URL,
      },
    ],
  });
}
