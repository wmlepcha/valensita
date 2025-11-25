import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-50">
      {/* Main Footer Content */}
      <div className="container-wide section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img 
              src="/storage/images/valensita-footer-logo.png" 
              alt="VALENSITA" 
              className="h-10 w-auto mb-6"
            />
            <p className="text-neutral-400 mb-6 max-w-md">
              Modern luxury streetwear for the bold and refined. Curated collections that express your unique style.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/new-arrivals" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} VALENSITA. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

