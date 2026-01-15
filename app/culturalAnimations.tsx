'use client';

import { ReactNode } from 'react';
import './culturalAnimations.css';

interface CulturalAnimationProps {
  country?: string;
  children?: ReactNode;
}

const COUNTRY_ANIMATIONS: Record<string, string> = {
  japan: 'cherry-blossoms',
  india: 'mandala-rotate',
  egypt: 'pyramid-glow',
  brazil: 'samba-waves',
  mexico: 'papel-picado',
  china: 'dragons-fly',
  greece: 'geometric-spiral',
  morocco: 'moroccan-tiles',
  korea: 'yin-yang-rotate',
  italy: 'renaissance-pattern',
  ireland: 'celtic-knot',
  peru: 'incan-weave',
  thailand: 'thai-spiral',
  usa: 'stars-twinkle',
  france: 'fleur-de-lis',
};

export function CulturalAnimation({
  country = 'global',
  children,
}: CulturalAnimationProps) {
  const animationClass =
    COUNTRY_ANIMATIONS[country.toLowerCase()] || 'global-pulse';

  return (
    <div className={`cultural-background ${animationClass}`}>
      <div className="animation-layer" />
      {children && <div className="content-wrapper">{children}</div>}
    </div>
  );
}
