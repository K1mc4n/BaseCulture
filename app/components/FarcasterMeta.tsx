'use client';

export function FarcasterMeta() {
  return (
    <>
      {/* Farcaster Frame Metadata */}
      <meta property="fc:frame" content="vNext" />
      <meta
        property="fc:frame:image"
        content={`${process.env.NEXT_PUBLIC_APP_URL}/api/og?page=home`}
      />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />

      {/* Frame Buttons */}
      <meta property="fc:frame:button:1" content="🌍 Discover" />
      <meta
        property="fc:frame:button:1:action"
        content="post"
      />
      <meta
        property="fc:frame:button:1:target"
        content={`${process.env.NEXT_PUBLIC_APP_URL}/api/frames/discover`}
      />

      <meta property="fc:frame:button:2" content="🎨 Animations" />
      <meta
        property="fc:frame:button:2:action"
        content="post"
      />
      <meta
        property="fc:frame:button:2:target"
        content={`${process.env.NEXT_PUBLIC_APP_URL}/api/frames/animations`}
      />

      <meta property="fc:frame:button:3" content="📱 Open App" />
      <meta
        property="fc:frame:button:3:action"
        content="link"
      />
      <meta
        property="fc:frame:button:3:target"
        content={process.env.NEXT_PUBLIC_APP_URL}
      />

      {/* Post URL for form submissions */}
      <meta
        property="fc:frame:post_url"
        content={`${process.env.NEXT_PUBLIC_APP_URL}/api/frames`}
      />
    </>
  );
}
