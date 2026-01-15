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

export async function POST(
  req: NextRequest,
  { params }: { params: { country: string } }
) {
  try {
    const country = params.country.toLowerCase();
    const countryData = COUNTRIES[country as keyof typeof COUNTRIES];

    if (!countryData) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    const imageUrl = `${BASE_URL}/api/og?country=${country}`;

    return NextResponse.json({
      version: 'vNext',
      image: imageUrl,
      buttons: [
        {
          label: `${countryData.emoji} View Animation`,
          action: 'link',
          target: `${BASE_URL}?country=${country}`,
        },
        {
          label: '← Back',
          action: 'post',
          target: `${BASE_URL}/api/frames/discover`,
        },
      ],
    });
  } catch (error) {
    console.error('Country frame error:', error);
    return NextResponse.json(
      { error: 'Failed to process frame' },
      { status: 500 }
    );
  }
}
