import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

// Social media icon component
function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  const iconClass = className || "w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7";
  
  switch (platform.toLowerCase()) {
    case 'instagram':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const { footer, pageLinks } = usePage<PageProps>().props;
  
  // Fallback values if no footer data
  const brandName = footer?.brandName || 'VALENSITA';
  const description = footer?.description || 'Modern luxury streetwear for the bold and refined. Curated collections that express your unique style.';
  const logoUrl = footer?.logoUrl || '/storage/images/valensita-footer-logo.png';
  const socialLinks = footer?.socialLinks || [
    { platform: 'instagram', url: 'https://instagram.com' },
    { platform: 'youtube', url: 'https://youtube.com' },
    { platform: 'facebook', url: 'https://facebook.com' },
  ];

  // Get dynamic page links with fallbacks
  const supportLinks = pageLinks?.support || [
    { slug: 'contact', title: 'Contact Us' },
    { slug: 'shipping', title: 'Shipping Info' },
    { slug: 'returns', title: 'Returns' },
    { slug: 'faq', title: 'FAQ' },
    { slug: 'size-guide', title: 'Size Guide' },
  ];

  const companyLinks = pageLinks?.company || [
    { slug: 'about', title: 'About Us' },
    { slug: 'careers', title: 'Careers' },
    { slug: 'sustainability', title: 'Sustainability' },
    { slug: 'press', title: 'Press' },
    { slug: 'blog', title: 'Blog' },
  ];

  const policyLinks = pageLinks?.policy || [
    { slug: 'privacy', title: 'Privacy Policy' },
    { slug: 'terms', title: 'Terms of Service' },
    { slug: 'cookies', title: 'Cookie Policy' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-50">
      {/* Main Footer Content */}
      <div className="container-wide section-spacing xl:py-20 2xl:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 xl:gap-16 2xl:gap-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img 
              src={logoUrl} 
              alt={brandName} 
              className="h-10 xl:h-12 2xl:h-14 w-auto mb-6 xl:mb-8 2xl:mb-10"
            />
            <p className="text-neutral-400 mb-6 xl:mb-8 2xl:mb-10 max-w-md xl:max-w-lg 2xl:max-w-xl text-sm xl:text-base 2xl:text-lg leading-relaxed">
              {description}
            </p>
            <div className="flex gap-4 xl:gap-5 2xl:gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-display font-bold text-lg xl:text-xl 2xl:text-2xl mb-6 xl:mb-8 2xl:mb-10">Shop</h4>
            <ul className="space-y-3 xl:space-y-4 2xl:space-y-5">
              <li>
                <Link href="/new-arrivals" className="text-neutral-400 hover:text-neutral-50 transition-colors text-sm xl:text-base 2xl:text-lg">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-neutral-400 hover:text-neutral-50 transition-colors text-sm xl:text-base 2xl:text-lg">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="text-neutral-400 hover:text-neutral-50 transition-colors text-sm xl:text-base 2xl:text-lg">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-neutral-400 hover:text-neutral-50 transition-colors text-sm xl:text-base 2xl:text-lg">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-neutral-400 hover:text-neutral-50 transition-colors text-sm xl:text-base 2xl:text-lg">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-display font-bold text-lg xl:text-xl 2xl:text-2xl mb-6 xl:mb-8 2xl:mb-10">Support</h4>
            <ul className="space-y-3 xl:space-y-4 2xl:space-y-5">
              {supportLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={`/${link.slug}`} className="text-neutral-400 hover:text-neutral-50 transition-colors text-sm xl:text-base 2xl:text-lg">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-bold text-lg xl:text-xl 2xl:text-2xl mb-6 xl:mb-8 2xl:mb-10">Company</h4>
            <ul className="space-y-3 xl:space-y-4 2xl:space-y-5">
              {companyLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={`/${link.slug}`} className="text-neutral-400 hover:text-neutral-50 transition-colors text-sm xl:text-base 2xl:text-lg">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-wide py-6 xl:py-8 2xl:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 xl:gap-6 2xl:gap-8">
            <p className="text-neutral-400 text-sm xl:text-base 2xl:text-lg">
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            <div className="flex gap-6 xl:gap-8 2xl:gap-10 text-sm xl:text-base 2xl:text-lg">
              {policyLinks.map((link) => (
                <Link key={link.slug} href={`/${link.slug}`} className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

