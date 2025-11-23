import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoodiesMenuOpen, setHoodiesMenuOpen] = useState(false);
  const [tshirtsMenuOpen, setTshirtsMenuOpen] = useState(false);
  const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Refs for timeout management
  const hoodiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tshirtsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const collectionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoodiesTimeoutRef.current) clearTimeout(hoodiesTimeoutRef.current);
      if (tshirtsTimeoutRef.current) clearTimeout(tshirtsTimeoutRef.current);
      if (collectionsTimeoutRef.current) clearTimeout(collectionsTimeoutRef.current);
    };
  }, []);

  // Helper functions for delayed menu close
  const openHoodiesMenu = () => {
    if (hoodiesTimeoutRef.current) {
      clearTimeout(hoodiesTimeoutRef.current);
      hoodiesTimeoutRef.current = null;
    }
    setHoodiesMenuOpen(true);
    setTshirtsMenuOpen(false); // Close other menus
    setCollectionsMenuOpen(false);
  };

  const closeHoodiesMenu = () => {
    hoodiesTimeoutRef.current = setTimeout(() => {
      setHoodiesMenuOpen(false);
    }, 150); // 150ms delay before closing
  };

  const openTshirtsMenu = () => {
    if (tshirtsTimeoutRef.current) {
      clearTimeout(tshirtsTimeoutRef.current);
      tshirtsTimeoutRef.current = null;
    }
    setTshirtsMenuOpen(true);
    setHoodiesMenuOpen(false); // Close other menus
    setCollectionsMenuOpen(false);
  };

  const closeTshirtsMenu = () => {
    tshirtsTimeoutRef.current = setTimeout(() => {
      setTshirtsMenuOpen(false);
    }, 150); // 150ms delay before closing
  };

  const openCollectionsMenu = () => {
    if (collectionsTimeoutRef.current) {
      clearTimeout(collectionsTimeoutRef.current);
      collectionsTimeoutRef.current = null;
    }
    setCollectionsMenuOpen(true);
    setHoodiesMenuOpen(false); // Close other menus
    setTshirtsMenuOpen(false);
  };

  const closeCollectionsMenu = () => {
    collectionsTimeoutRef.current = setTimeout(() => {
      setCollectionsMenuOpen(false);
    }, 150); // 150ms delay before closing
  };

  const headerClasses = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled
      ? 'bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
      : 'bg-transparent border-transparent'
  ].join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className="container-wide">
          <div className="relative flex items-center justify-between h-16">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {/* Hoodies with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={openHoodiesMenu}
                onMouseLeave={closeHoodiesMenu}
              >
                <Link
                  href="/hoodies"
                  className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                    hoodiesMenuOpen 
                      ? 'text-neutral-600' 
                      : 'text-neutral-900 hover:text-neutral-600'
                  }`}
                >
                  Hoodies
                </Link>
              </div>

              {/* T-Shirts with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={openTshirtsMenu}
                onMouseLeave={closeTshirtsMenu}
              >
                <Link
                  href="/tshirts"
                  className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                    tshirtsMenuOpen 
                      ? 'text-neutral-600' 
                      : 'text-neutral-900 hover:text-neutral-600'
                  }`}
                >
                  T-Shirts
                </Link>
              </div>

              {/* Collections with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={openCollectionsMenu}
                onMouseLeave={closeCollectionsMenu}
              >
                <Link
                  href="/collections"
                  className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                    collectionsMenuOpen 
                      ? 'text-neutral-600' 
                      : 'text-neutral-900 hover:text-neutral-600'
                  }`}
                >
                  Collections
                </Link>
              </div>
            </nav>

            {/* Logo - Absolutely Centered */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0">
              <img 
                src="/storage/images/valensita-header-logo.png" 
                alt="VALENSITA" 
                className="h-6 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-6 flex-1 justify-end">
              {/* Search Icon */}
              <button className="hidden lg:block hover:opacity-60 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="hidden lg:block text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                Account
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="hover:opacity-60 transition-opacity"
                aria-label="Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden hover:opacity-60 transition-opacity"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-6 border-t border-neutral-200">
              <div className="flex flex-col gap-4">
                {/* Hoodies Section */}
                <div>
                  <Link
                    href="/hoodies"
                    className="text-xs font-bold tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2 block"
                  >
                    Hoodies
                  </Link>
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/hoodies/pullover" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Pullover
                    </Link>
                    <Link href="/hoodies/zip-up" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Zip-Up
                    </Link>
                    <Link href="/hoodies/oversized" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Oversized
                    </Link>
                  </div>
                </div>

                {/* T-Shirts Section */}
                <div>
                  <Link
                    href="/tshirts"
                    className="text-xs font-bold tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2 block"
                  >
                    T-Shirts
                  </Link>
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/tshirts/graphic" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Graphic Tees
                    </Link>
                    <Link href="/tshirts/plain" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Plain Tees
                    </Link>
                    <Link href="/tshirts/oversized" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Oversized
                    </Link>
                  </div>
                </div>

                {/* Collections Section */}
                <div>
                  <Link
                    href="/collections"
                    className="text-xs font-bold tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2 block"
                  >
                    Collections
                  </Link>
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/collections/new-arrivals" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      New Arrivals
                    </Link>
                    <Link href="/collections/bestsellers" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Bestsellers
                    </Link>
                    <Link href="/collections/limited-edition" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Limited Edition
                    </Link>
                    <Link href="/collections/sale" className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block">
                      Sale
                    </Link>
                  </div>
                </div>

                <Link
                  href="/account"
                  className="text-xs font-medium tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2"
                >
                  Account
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Full-Width Mega Menu for Hoodies */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200 transition-all duration-300 ease-out ${
          hoodiesMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={openHoodiesMenu}
        onMouseLeave={closeHoodiesMenu}
        style={{
          boxShadow: hoodiesMenuOpen ? '0 8px 30px rgba(0, 0, 0, 0.08)' : 'none',
        }}
      >
        {/* Bridge area to prevent gap issues */}
        <div className="absolute -top-4 left-0 right-0 h-4" />
        
        <div className="container-wide py-12">
          <div className="grid grid-cols-4 gap-12">
            {/* Left Column - Categories */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 mb-4">
                Hoodies
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/hoodies/pullover" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Pullover
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/hoodies/zip-up" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Zip-Up
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/hoodies/oversized" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Oversized
                  </Link>
                </li>
              </ul>
            </div>

            {/* Image Columns */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              <Link href="/hoodies/pullover" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop" 
                    alt="Pullover Hoodies"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Pullover
                </p>
              </Link>
              <Link href="/hoodies/zip-up" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop" 
                    alt="Zip-Up Hoodies"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Zip-Up
                </p>
              </Link>
              <Link href="/hoodies/oversized" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop" 
                    alt="Oversized Hoodies"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Oversized
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Mega Menu for T-Shirts */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200 transition-all duration-300 ease-out ${
          tshirtsMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={openTshirtsMenu}
        onMouseLeave={closeTshirtsMenu}
        style={{
          boxShadow: tshirtsMenuOpen ? '0 8px 30px rgba(0, 0, 0, 0.08)' : 'none',
        }}
      >
        {/* Bridge area to prevent gap issues */}
        <div className="absolute -top-4 left-0 right-0 h-4" />
        
        <div className="container-wide py-12">
          <div className="grid grid-cols-4 gap-12">
            {/* Left Column - Categories */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 mb-4">
                T-Shirts
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/tshirts/graphic" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Graphic Tees
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/tshirts/plain" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Plain Tees
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/tshirts/oversized" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Oversized
                  </Link>
                </li>
              </ul>
            </div>

            {/* Image Columns */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              <Link href="/tshirts/graphic" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop" 
                    alt="Graphic Tees"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Graphic Tees
                </p>
              </Link>
              <Link href="/tshirts/plain" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop" 
                    alt="Plain Tees"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Plain Tees
                </p>
              </Link>
              <Link href="/tshirts/oversized" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop" 
                    alt="Oversized Tees"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Oversized
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Mega Menu for Collections */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200 transition-all duration-300 ease-out ${
          collectionsMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={openCollectionsMenu}
        onMouseLeave={closeCollectionsMenu}
        style={{
          boxShadow: collectionsMenuOpen ? '0 8px 30px rgba(0, 0, 0, 0.08)' : 'none',
        }}
      >
        {/* Bridge area to prevent gap issues */}
        <div className="absolute -top-4 left-0 right-0 h-4" />
        
        <div className="container-wide py-12">
          <div className="grid grid-cols-4 gap-12">
            {/* Left Column - Categories */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 mb-4">
                Collections
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/collections/new-arrivals" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/collections/bestsellers" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/collections/limited-edition" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Limited Edition
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/collections/sale" 
                    className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Image Columns */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              <Link href="/collections/new-arrivals" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop" 
                    alt="New Arrivals"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  New Arrivals
                </p>
              </Link>
              <Link href="/collections/bestsellers" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop" 
                    alt="Bestsellers"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Bestsellers
                </p>
              </Link>
              <Link href="/collections/limited-edition" className="group">
                <div className="overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop" 
                    alt="Limited Edition"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                  Limited Edition
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

