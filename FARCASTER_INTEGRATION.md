# Farcaster Integration Guide

This document explains how Base Culture is integrated with Farcaster as a miniapp and frame according to [Farcaster Publishing Guidelines](https://miniapps.farcaster.xyz/docs/guides/publishing).

## Configuration Files

### 1. farcaster.json (Official Farcaster Configuration)

The `farcaster.json` file defines how your app appears and functions within the Farcaster ecosystem. It follows the official Farcaster publishing standards.

#### Required Fields

- **name**: Display name of the miniapp
- **description**: Brief description of the app
- **icon**: URL to the app icon (192x192 PNG recommended)
- **homepage**: Main website URL
- **version**: Configuration version number (string)

#### Optional Fields

- **iconUrl**: Alternative icon URL
- **splashImageUrl**: URL to splash screen image
- **splashBackgroundColor**: Hex color for splash background
- **webhookUrl**: Webhook endpoint for events
- **creator**: Object with `fid` and `username`
- **imageAspectRatio**: Image aspect ratio (default: "1.91:1")
- **buttons**: Array of button definitions for frame actions
- **categories**: App categories (e.g., "social", "culture", "education")
- **permissions**: User permissions requested
- **metadata**: Extended metadata object
- **networks**: Supported blockchain networks

#### Frame Configuration

The frame object defines how the app behaves as a Farcaster frame:

```json
{
  "frame": {
    "version": "vNext",
    "imageUrl": "https://example.com/og-image.png",
    "imageAspectRatio": "1.91:1",
    "buttons": [
      {
        "label": "Button Text",
        "action": "post|link",
        "target": "https://example.com/api/frames"
      }
    ]
  }
}
```

#### Button Actions

- **link**: Opens a URL when clicked
- **post**: Submits form data to the target endpoint

### 2. base-app.config.json (Base Application Configuration)

Extended configuration for Base app ecosystem integration:

```json
{
  "name": "Base Culture",
  "description": "Description",
  "icon": "/icon.png",
  "metadata": {
    "url": "https://baseculture.example.com",
    "shortDescription": "Short description",
    "category": "social",
    "author": "K1mc4n"
  },
  "permissions": ["wallet", "analytics"],
  "networks": ["base-mainnet", "base-sepolia"],
  "splash": {
    "imageUrl": "https://example.com/splash.png",
    "backgroundColor": "#0052ff"
  }
}
```

## API Routes

### `/api/frames` (Main Frame Entry Point)
- **Method**: GET, POST
- **Response**: Frame JSON with buttons and image
- **Purpose**: Initial frame when shared on Farcaster
- **Location**: [app/api/frames/route.ts](app/api/frames/route.ts)

### `/api/frames/country` (Country-Specific Frame)
- **Method**: POST
- **Parameters**: `country` (query parameter)
- **Response**: Frame showing country-specific culture
- **Purpose**: Handle country selection from Farcaster
- **Location**: [app/api/frames/country/route.ts](app/api/frames/country/route.ts)

### `/api/og` (Open Graph Image)
- **Method**: GET
- **Parameters**: `page`, `country` (query parameters)
- **Response**: SVG image for rich previews
- **Purpose**: Generate custom preview images for Farcaster shares
- **Location**: [app/api/og/route.ts](app/api/og/route.ts)

## Metadata Tags

The app includes Farcaster-specific meta tags in the HTML head:

```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="..." />
<meta property="fc:frame:button:1" content="..." />
<meta property="fc:frame:post_url" content="..." />
```

These tags are added by the `FarcasterMeta` component in [app/components/FarcasterMeta.tsx](app/components/FarcasterMeta.tsx).

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

## Deployment Steps

### 1. Pre-Deployment Checklist

- [ ] Update all URLs in `farcaster.json` with your production domain
- [ ] Update all URLs in `base-app.config.json`
- [ ] Ensure all image assets are hosted and publicly accessible
- [ ] Set proper environment variables for your hosting platform
- [ ] Test frame locally with frame inspector tools
- [ ] Verify frame aspect ratios (1.91:1 is standard)

### 2. Update Configuration Files

Before deploying, update the URLs in `farcaster.json`:

```json
{
  "icon": "https://your-deployed-url.com/icon-192.png",
  "homepage": "https://your-deployed-url.com",
  "splashImageUrl": "https://your-deployed-url.com/splash.png",
  "webhookUrl": "https://your-deployed-url.com/api/farcaster/webhook",
  "frame": {
    "imageUrl": "https://your-deployed-url.com/og-image.png",
    "buttons": [
      {
        "target": "https://your-deployed-url.com/api/frames"
      }
    ]
  },
  "metadata": {
    "website": "https://your-deployed-url.com",
    "github": "https://github.com/YOUR_USERNAME/BaseCulture"
  }
}
```

### 3. Environment Variables

Add to your `.env.local` or hosting platform:

```bash
NEXT_PUBLIC_APP_URL=https://your-deployed-url.com
NEXT_PUBLIC_FARCASTER_WEBHOOK_KEY=your-webhook-secret
```

### 4. Deploy to Hosting

Deploy your Next.js app to Vercel, Netlify, or similar:

```bash
# Build the app
npm run build

# Deploy to Vercel
vercel deploy

# Or deploy to Netlify
netlify deploy
```

### 5. Register with Farcaster

1. Visit [Farcaster Miniapps](https://miniapps.farcaster.xyz)
2. Submit your app with the `farcaster.json` configuration
3. Provide your app URL: `https://your-deployed-url.com`
4. Include direct link to your `farcaster.json` or submit the config directly

### 6. Test Your Frame

Use Farcaster frame testing tools:

- [Farcaster Frames Inspector](https://framesinspector.xyz) - Validate frame structure
- [Warpcast Frame Debugger](https://warpcast.com) - Test in Warpcast client
- Share in a cast on Warpcast and verify interactive elements work

### 7. Monitor & Iterate

- Track analytics from Farcaster dashboard
- Monitor webhook events and logs
- Collect user feedback
- Update configuration as needed

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
