import { useState } from 'react';

interface PromoBarProps {
  message: string;
  link?: string;
  dismissible?: boolean;
}

export default function PromoBar({ message, link, dismissible = true }: PromoBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const content = (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm font-medium">{message}</span>
      {link && (
        <span className="text-sm font-bold underline">Shop Now</span>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-900">
      <div className="container-wide">
        <div className="relative flex items-center justify-center h-10">
          {link ? (
            <a href={link} className="hover:opacity-80 transition-opacity">
              {content}
            </a>
          ) : (
            content
          )}
          {dismissible && (
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-0 p-2 hover:opacity-70 transition-opacity"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

