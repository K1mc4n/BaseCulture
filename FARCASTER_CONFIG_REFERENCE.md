# Farcaster Configuration Reference

Quick reference guide for Farcaster configuration according to official publishing standards.

## Configuration Structure

### farcaster.json (Root Level Configuration)

This is the official Farcaster application configuration file.

#### Required Fields
```json
{
  "name": "string",                    // Your app name
  "description": "string",             // Brief description
  "icon": "https://url.to/icon.png",  // Icon URL (192x192 PNG)
  "homepage": "https://url.to/app",   // Main app URL
  "version": "1"                       // Config version
}
```

#### Optional But Recommended Fields
```json
{
  "iconUrl": "https://...",           // Alternative icon URL
  "splashImageUrl": "https://...",    // Splash screen image
  "splashBackgroundColor": "#0052ff", // Splash background hex color
  "webhookUrl": "https://...",        // Webhook for events
  "imageAspectRatio": "1.91:1",       // Image ratio (default)
  "creator": {
    "fid": 0,                         // Farcaster ID
    "username": "handle"              // Farcaster handle
  }
}
```

#### Frame Configuration
```json
{
  "frame": {
    "version": "vNext",               // Frame version (use vNext)
    "imageUrl": "https://...",        // Frame image URL
    "imageAspectRatio": "1.91:1",     // Image aspect ratio
    "buttons": [
      {
        "label": "Button Text",       // Button label
        "action": "post|link",        // post or link
        "target": "https://..."       // URL or endpoint
      }
    ]
  }
}
```

#### Metadata Object
```json
{
  "metadata": {
    "displayName": "string",          // Display name
    "shortDescription": "string",     // Short description
    "longDescription": "string",      // Detailed description
    "author": "string",               // Author name
    "version": "0.1.0",              // App version
    "website": "https://...",         // Website URL
    "github": "https://...",          // GitHub repo URL
    "twitter": "@handle"              // Twitter handle
  }
}
```

#### Categories
```json
{
  "categories": [
    "social",
    "culture",
    "education",
    "web3",
    // Other valid categories:
    "games",
    "finance",
    "utilities",
    "productivity"
  ]
}
```

#### Permissions
```json
{
  "permissions": [
    "read:user",      // Read user profile
    "read:likes",     // Read user likes
    "read:recasts",   // Read user recasts
    "write:likes",    // Create likes
    "write:recasts",  // Create recasts
    "write:casts"     // Create new casts
  ]
}
```

#### Networks
```json
{
  "networks": [
    "base-mainnet",   // Base Mainnet (chainId: 8453)
    "base-sepolia",   // Base Sepolia Testnet (chainId: 84532)
    "ethereum-mainnet" // Ethereum Mainnet (chainId: 1)
  ]
}
```

## Configuration Updates for Production

### Step 1: Update farcaster.json URLs

Find and replace all example URLs with your production domain:

```bash
# Before
"icon": "https://baseculture.example.com/icon-192.png"

# After
"icon": "https://your-actual-domain.com/icon-192.png"
```

Key fields to update:
- `icon`
- `iconUrl`
- `homepage`
- `splashImageUrl`
- `webhookUrl`
- `frame.imageUrl`
- `frame.buttons[].target`
- `metadata.website`
- `metadata.github`

### Step 2: Verify Button Endpoints

Ensure all button targets point to valid endpoints:

```json
{
  "buttons": [
    {
      "label": "Discover",
      "action": "post",
      "target": "https://your-domain.com/api/frames"  // Must exist
    },
    {
      "label": "Open App",
      "action": "link",
      "target": "https://your-domain.com"              // Must be accessible
    }
  ]
}
```

### Step 3: Test Configuration

Before deploying, validate your configuration:

```bash
# Validate JSON syntax
python3 -m json.tool farcaster.json

# Check with Node.js
node -e "console.log(JSON.stringify(require('./farcaster.json'), null, 2))"
```

## Frame Button Guidelines

### Action Types

**link**: Opens a URL in the browser
```json
{
  "label": "Open App",
  "action": "link",
  "target": "https://baseculture.example.com"
}
```

**post**: Sends data to your endpoint
```json
{
  "label": "Next",
  "action": "post",
  "target": "https://baseculture.example.com/api/frames"
}
```

### Best Practices

1. **Maximum 4 buttons per frame** - Don't exceed this limit
2. **Clear labels** - Make button actions obvious
3. **Consistent styling** - Use emoji or consistent formatting
4. **Responsive design** - Test on mobile Warpcast
5. **Image size** - Keep images under 100KB

## Image Requirements

- **Icon**: 192x192 PNG minimum
- **Splash**: 1080x1920 PNG or SVG
- **Frame Image**: 1200x630 minimum (1.91:1 ratio)
- **Format**: PNG, JPG, or SVG
- **Max Size**: 100KB per image

## Testing & Validation

### Using Frame Inspector
```
Visit: https://framesinspector.xyz
Paste your app URL to validate frame structure
```

### Using Warpcast Debugger
```
1. Go to Warpcast
2. Compose a new cast
3. Share your app URL
4. Test interactive elements
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Frame not appearing | Verify `fc:frame` meta tag and `farcaster.json` is at root |
| Buttons not working | Check `frame.buttons[].target` URLs are accessible |
| Image not loading | Ensure image URL is public and accessible |
| Invalid JSON | Run `python3 -m json.tool farcaster.json` to validate |

## API Routes Required

Your Next.js app must implement these endpoints:

1. **GET /api/frames** - Initial frame entry
2. **POST /api/frames** - Handle frame button interactions
3. **GET /api/og** - Generate OG/preview images
4. **POST /api/frames/country** - Country-specific frame handling

See [FARCASTER_INTEGRATION.md](FARCASTER_INTEGRATION.md) for implementation details.

## Resources

- [Farcaster Official Docs](https://miniapps.farcaster.xyz/docs)
- [Publishing Guide](https://miniapps.farcaster.xyz/docs/guides/publishing)
- [Frame Specification](https://miniapps.farcaster.xyz/docs/reference/frame-specification)
- [Frames Inspector Tool](https://framesinspector.xyz)

## Checklist Before Deployment

- [ ] All URLs updated to production domain
- [ ] `farcaster.json` is valid JSON
- [ ] All image URLs are accessible and public
- [ ] Frame aspect ratios verified (1.91:1)
- [ ] API endpoints tested and working
- [ ] Frame tested with Frame Inspector
- [ ] Frame tested in Warpcast
- [ ] Metadata is accurate and complete
- [ ] Icon image is 192x192 PNG
- [ ] Permissions list is accurate
