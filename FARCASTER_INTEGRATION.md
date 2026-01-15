# Farcaster Integration Guide

This document explains how Base Culture is integrated with Farcaster as a miniapp and frame.

## What is farcaster.json?

The `farcaster.json` file is a configuration file that defines how your app appears and functions within the Farcaster ecosystem. It contains metadata, frame definitions, and permissions needed for Farcaster integration.

## File Structure

### Main Properties

- **name**: Display name of the miniapp
- **description**: Brief description of the app
- **icon**: URL to the app icon (192x192 PNG recommended)
- **homepage**: Main website URL
- **version**: Farcaster configuration version
- **creator**: Information about the app creator

### Frame Configuration

The frame object defines how the app behaves as a Farcaster frame:

```json
{
  "frame": {
    "version": "vNext",
    "imageUrl": "URL to frame image",
    "buttons": [
      {
        "label": "Button Text",
        "action": "post|link",
        "target": "URL or action"
      }
    ]
  }
}
```

### Buttons and Actions

- **link**: Opens a URL when clicked
- **post**: Submits form data to the target endpoint

## API Routes

### `/api/frames` (Main Frame Entry Point)
- **Method**: GET, POST
- **Response**: Frame JSON with buttons and image
- **Purpose**: Initial frame when shared on Farcaster

### `/api/frames/country` (Country-Specific Frame)
- **Method**: POST
- **Parameters**: `country` (query parameter)
- **Response**: Frame showing country-specific culture
- **Purpose**: Handle country selection from Farcaster

### `/api/og` (Open Graph Image)
- **Method**: GET
- **Parameters**: `page`, `country` (query parameters)
- **Response**: SVG image for rich previews
- **Purpose**: Generate custom preview images for Farcaster shares

## Metadata Tags

The app includes Farcaster-specific meta tags in the HTML head:

```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="..." />
<meta property="fc:frame:button:1" content="..." />
<meta property="fc:frame:post_url" content="..." />
```

These tags are added by the `FarcasterMeta` component in `app/components/FarcasterMeta.tsx`.

## Features Configuration

The farcaster.json includes feature flags:

### Cultural Animations
- 15 country-specific animations
- Interactive country selector
- Smooth transitions

### Blockchain Integration
- Chain ID: 8453 (Base mainnet)
- Wallet support: MetaMask, Coinbase, Rainbow
- OnchainKit integration

### Open Actions
Custom Farcaster open actions:
- Share Culture
- Explore Country
- Join Movement

## Permissions

The app requests these Farcaster permissions:

- `read:user` - Read user profile
- `read:likes` - Read user's likes
- `read:recasts` - Read user's recasts
- `write:likes` - Create likes
- `write:recasts` - Create recasts
- `write:casts` - Create new casts

## Networks Supported

- Base Mainnet (8453)
- Base Sepolia (84532)
- Ethereum Mainnet (1)

## Deployment Steps

### 1. Update Configuration

Before deploying, update the URLs in `farcaster.json`:

```json
{
  "homepage": "https://your-deployed-url.com",
  "webhookUrl": "https://your-deployed-url.com/api/farcaster/webhook",
  "metadata": {
    "website": "https://your-deployed-url.com",
    "github": "https://your-github-repo"
  }
}
```

### 2. Update Environment Variables

Add to your `.env.local` or hosting platform:

```bash
NEXT_PUBLIC_APP_URL=https://your-deployed-url.com
```

### 3. Deploy to Hosting

Deploy your Next.js app to Vercel, Netlify, or similar:

```bash
npm run build
vercel deploy
# or
netlify deploy
```

### 4. Register with Farcaster

1. Share your app URL on Farcaster
2. Share a frame link: `https://your-url.com`
3. Include metadata in the URL or embed in your page

### 5. Test Your Frame

Use Farcaster frame testers:
- [Farcaster Frame Inspector](https://framesinspector.xyz)
- [Warpcast Frame Debugger](https://warpcast.com)
- Share in a cast and test the frame

## Example Usage

### Sharing a Culture Frame

```
Check out this amazing culture! 🌍

https://baseculture.example.com?country=japan
```

### Creating a Cast with Frame

When a user posts with your frame, it automatically includes:
- Preview image from `/api/og`
- Interactive buttons from `farcaster.json`
- User engagement tracking

## Custom Frame Logic

To create custom frame interactions, edit:

- `/app/api/frames/route.ts` - Main frame logic
- `/app/api/frames/country/route.ts` - Country-specific logic
- `/app/api/og/route.ts` - Image generation

## Webhook Handling

To process interactions, implement webhook handling at `/api/farcaster/webhook`:

```typescript
export async function POST(req: NextRequest) {
  const { user, cast, engagement } = await req.json();
  
  // Process user interaction
  // Log analytics
  // Update app state
  
  return NextResponse.json({ success: true });
}
```

## Analytics & Metrics

Track frame performance using Farcaster analytics:
- Button clicks
- Frame views
- Engagement rate
- Share rate
- Conversion metrics

## Best Practices

1. **Image Optimization**: Keep OG images under 100KB
2. **Button Limit**: Use maximum 4 buttons per frame
3. **User Experience**: Make frame actions clear and intuitive
4. **Responsive Design**: Test on mobile Warpcast clients
5. **Error Handling**: Implement graceful error states
6. **Rate Limiting**: Protect your API from abuse

## Troubleshooting

### Frame Not Appearing

- Verify `fc:frame` meta tag is present
- Check `fc:frame:post_url` is correct and accessible
- Ensure image URL is publicly accessible

### Button Actions Not Working

- Verify button `target` URL is correct
- Check POST endpoint is properly implemented
- Test with Farcaster Frame Inspector

### Image Not Loading

- Verify image URL is public and accessible
- Check image format (SVG, PNG, JPG)
- Ensure image aspect ratio matches `imageAspectRatio`

## Resources

- [Farcaster Documentation](https://docs.farcaster.xyz)
- [Frames Specification](https://docs.farcaster.xyz/reference/frames/specification)
- [OnchainKit Docs](https://docs.base.org/onchainkit)
- [Base Network Docs](https://docs.base.org)

## Support

For issues or questions:
- Check [Farcaster Docs](https://docs.farcaster.xyz)
- Review [Frame Spec](https://docs.farcaster.xyz/reference/frames/specification)
- Test with [Frame Inspector](https://framesinspector.xyz)
