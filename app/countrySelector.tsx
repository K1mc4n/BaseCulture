'use client';

import { useState } from 'react';
import './countrySelector.css';

const COUNTRIES = [
  { code: 'jp', name: 'Japan', animation: 'cherry-blossoms' },
  { code: 'in', name: 'India', animation: 'mandala-rotate' },
  { code: 'eg', name: 'Egypt', animation: 'pyramid-glow' },
  { code: 'br', name: 'Brazil', animation: 'samba-waves' },
  { code: 'mx', name: 'Mexico', animation: 'papel-picado' },
  { code: 'cn', name: 'China', animation: 'dragons-fly' },
  { code: 'gr', name: 'Greece', animation: 'geometric-spiral' },
  { code: 'ma', name: 'Morocco', animation: 'moroccan-tiles' },
  { code: 'kr', name: 'Korea', animation: 'yin-yang-rotate' },
  { code: 'it', name: 'Italy', animation: 'renaissance-pattern' },
  { code: 'ie', name: 'Ireland', animation: 'celtic-knot' },
  { code: 'pe', name: 'Peru', animation: 'incan-weave' },
  { code: 'th', name: 'Thailand', animation: 'thai-spiral' },
  { code: 'us', name: 'USA', animation: 'stars-twinkle' },
  { code: 'fr', name: 'France', animation: 'fleur-de-lis' },
];

interface CountrySelectorProps {
  onCountryChange: (country: string) => void;
  currentCountry: string;
}

export function CountrySelector({
  onCountryChange,
  currentCountry,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentCountryName =
    COUNTRIES.find((c) => c.name.toLowerCase() === currentCountry.toLowerCase())
      ?.name || 'Global';

  return (
    <div className="country-selector">
      <button
        className="selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select country"
      >
        <span className="selector-label">🌍 {currentCountryName}</span>
        <span className={`selector-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="selector-dropdown">
          <div
            className="selector-item"
            onClick={() => {
              onCountryChange('global');
              setIsOpen(false);
            }}
          >
            🌍 Global
          </div>
          {COUNTRIES.map((country) => (
            <div
              key={country.code}
              className={`selector-item ${
                currentCountry.toLowerCase() === country.name.toLowerCase()
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                onCountryChange(country.name);
                setIsOpen(false);
              }}
            >
              {country.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
