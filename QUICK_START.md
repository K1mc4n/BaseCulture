# Quick Start: Farcaster Integration

Your BaseCulture app is now fully configured according to [Farcaster Publishing Guidelines](https://miniapps.farcaster.xyz/docs/guides/publishing).

## ⚡ Quick Checklist (5 minutes)

```bash
# 1. Update production domain in both config files
sed -i 's/baseculture.example.com/YOUR_DOMAIN.com/g' farcaster.json
sed -i 's/baseculture.example.com/YOUR_DOMAIN.com/g' base-app.config.json

# 2. Verify JSON syntax
python3 -m json.tool farcaster.json
python3 -m json.tool base-app.config.json

# 3. Deploy your app
npm run build
vercel deploy  # or your hosting platform
```

## 📋 Before Going Live

- [ ] All URLs updated to production domain
- [ ] All image URLs are publicly accessible
  - `icon-192.png`
  - `splash.png`
  - `og-image.png`
- [ ] API endpoints tested:
  - `GET/POST /api/frames`
  - `POST /api/frames/country`
  - `GET /api/og`
- [ ] Frame tested with [Frame Inspector](https://framesinspector.xyz)
- [ ] Frame tested in [Warpcast](https://warpcast.com)

## 🎯 Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| [farcaster.json](farcaster.json) | Official Farcaster config | ✅ Ready |
| [base-app.config.json](base-app.config.json) | Base app integration | ✅ Ready |
| [FARCASTER_INTEGRATION.md](FARCASTER_INTEGRATION.md) | Full guide | ✅ Enhanced |
| [FARCASTER_CONFIG_REFERENCE.md](FARCASTER_CONFIG_REFERENCE.md) | Field reference | ✅ NEW |

## 🚀 Deployment Steps

### 1. Update Configuration
```json
// In farcaster.json, update:
"icon": "https://YOUR_DOMAIN.com/icon-192.png",
"homepage": "https://YOUR_DOMAIN.com",
"splashImageUrl": "https://YOUR_DOMAIN.com/splash.png",
"webhookUrl": "https://YOUR_DOMAIN.com/api/farcaster/webhook",
"frame": {
  "imageUrl": "https://YOUR_DOMAIN.com/og-image.png",
  "buttons": [{
    "target": "https://YOUR_DOMAIN.com/api/frames"
  }]
}
```

### 2. Deploy to Production
```bash
npm run build
vercel deploy  # or your hosting provider
```

### 3. Test with Farcaster Tools
- Frame Inspector: https://framesinspector.xyz
- Warpcast: https://warpcast.com (share your frame URL)

### 4. Register with Farcaster
- Visit: https://miniapps.farcaster.xyz
- Submit your app with updated `farcaster.json`

## 📚 Full Documentation

For detailed information, see:
- [INTEGRATION_UPDATE_SUMMARY.md](INTEGRATION_UPDATE_SUMMARY.md) - All changes made
- [FARCASTER_CONFIG_REFERENCE.md](FARCASTER_CONFIG_REFERENCE.md) - Field reference and best practices
- [FARCASTER_INTEGRATION.md](FARCASTER_INTEGRATION.md) - Complete integration guide

## 🔗 Useful Links

- **Farcaster Docs**: https://miniapps.farcaster.xyz/docs
- **Publishing Guide**: https://miniapps.farcaster.xyz/docs/guides/publishing
- **Frame Inspector**: https://framesinspector.xyz
- **Warpcast**: https://warpcast.com

## ✨ Your App is Ready!

All files are:
- ✅ Valid JSON syntax
- ✅ Compliant with Farcaster spec
- ✅ Following best practices
- ✅ Documented for maintenance

**Next step**: Update your production domain and deploy! 🚀
