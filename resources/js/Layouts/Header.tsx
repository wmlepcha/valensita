import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, MenuItem, PageProps } from '@/types';
import CartDrawer from '@/Components/CartDrawer';

export default function Header() {
  const { menus } = usePage<PageProps<{ menus: Menu[] }>>().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0); // 0 for header-logo, 1 for valensita-l
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Refs for timeout management - dynamic based on menus
  const menuTimeoutRefs = useRef<Record<number, NodeJS.Timeout | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set mounted state to prevent flash
  useEffect(() => {
    setMounted(true);
  }, []);

  // Logo animation effect
  useEffect(() => {
    if (!mounted) return;
    
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // Switch every 4 seconds to allow smooth transition

    return () => clearInterval(logoInterval);
  }, [mounted]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(menuTimeoutRefs.current).forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // Helper functions for delayed menu close
  const openMenu = (menuId: number) => {
    if (menuTimeoutRefs.current[menuId]) {
      clearTimeout(menuTimeoutRefs.current[menuId]!);
      menuTimeoutRefs.current[menuId] = null;
    }
    setOpenMenuId(menuId);
    // Close other menus
    Object.keys(menuTimeoutRefs.current).forEach((id) => {
      if (Number(id) !== menuId && menuTimeoutRefs.current[Number(id)]) {
        clearTimeout(menuTimeoutRefs.current[Number(id)]!);
        menuTimeoutRefs.current[Number(id)] = null;
      }
    });
  };

  const closeMenu = (menuId: number) => {
    menuTimeoutRefs.current[menuId] = setTimeout(() => {
      setOpenMenuId(null);
      menuTimeoutRefs.current[menuId] = null;
    }, 150); // 150ms delay before closing
  };

  const headerClasses = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled
      ? 'bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
      : 'bg-transparent border-transparent'
  ].join(' ');

  // Filter menus that have items (for mega menu display)
  const menusWithItems = menus?.filter(menu => menu.items && menu.items.length > 0) || [];

  return (
    <>
      <header className={headerClasses}>
        <div className="container-wide">
          <div className="relative flex items-center justify-between h-16">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {menus?.map((menu) => {
                const hasItems = menu.items && menu.items.length > 0;
                const isOpen = openMenuId === menu.id;

                return (
                  <div 
                    key={menu.id}
                    className="relative"
                    onMouseEnter={() => hasItems && openMenu(menu.id)}
                    onMouseLeave={() => hasItems && closeMenu(menu.id)}
                  >
                    <Link
                      href={menu.url || `/${menu.slug}`}
                      className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                        isOpen 
                          ? 'text-neutral-600' 
                          : 'text-neutral-900 hover:text-neutral-600'
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Logo - Absolutely Centered with Animation */}
            <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 h-6">
              <Link href="/" className="relative inline-flex items-center justify-center h-6">
                {/* Hidden image to set container width - use the wider logo */}
                <img 
                  src="/storage/images/valensita-header-logo.png?v=2"
                  alt="" 
                  className="h-6 w-auto opacity-0 pointer-events-none"
                  aria-hidden="true"
                />
                {/* Animated logos - both absolutely centered using flexbox centering */}
                <img 
                  src="/storage/images/valensita-header-logo.png?v=2"
                  alt="VALENSITA" 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-auto ${
                    mounted 
                      ? currentLogo === 0 
                        ? 'transition-opacity duration-[1500ms] ease-in-out' 
                        : 'transition-opacity duration-[500ms] ease-out'
                      : ''
                  } ${
                    currentLogo === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
                <img 
                  src="/storage/images/valensita-logo.png?v=2"
                  alt="VALENSITA" 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-auto ${
                    mounted 
                      ? currentLogo === 1 
                        ? 'transition-opacity duration-[1500ms] ease-in-out' 
                        : 'transition-opacity duration-[500ms] ease-out'
                      : ''
                  } ${
                    currentLogo === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
              </Link>
            </div>

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
              <button
                onClick={() => setCartOpen(true)}
                className="hover:opacity-60 transition-opacity relative"
                aria-label="Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {/* Cart Badge - Uncomment when cart items are implemented */}
                {/* {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )} */}
              </button>

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
                {menus?.map((menu) => (
                  <div key={menu.id}>
                    <Link
                      href={menu.url || `/${menu.slug}`}
                      className="text-xs font-bold tracking-widest uppercase text-neutral-900 hover:text-neutral-600 py-2 block"
                    >
                      {menu.name}
                    </Link>
                    {menu.items && menu.items.length > 0 && (
                      <div className="ml-4 mt-2 space-y-2">
                        {menu.items.map((item) => (
                          <div key={item.id}>
                            <Link 
                              href={item.url} 
                              className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 block"
                            >
                              {item.label}
                            </Link>
                            {/* Submenu items in mobile */}
                            {item.children && item.children.length > 0 && (
                              <div className="ml-4 mt-1 space-y-1">
                                {item.children.map((child) => (
                                  <Link 
                                    key={child.id}
                                    href={child.url} 
                                    className="text-xs tracking-wide uppercase text-neutral-500 hover:text-neutral-700 block"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

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

      {/* Dynamic Mega Menus */}
      {menusWithItems.map((menu) => {
        const isOpen = openMenuId === menu.id;
        const itemsWithImages = menu.items.filter(item => item.image_url);
        const itemsWithoutImages = menu.items.filter(item => !item.image_url);
        const hasImages = itemsWithImages.length > 0;

        return (
          <div
            key={menu.id}
            className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200 transition-all duration-300 ease-out ${
              isOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            onMouseEnter={() => openMenu(menu.id)}
            onMouseLeave={() => closeMenu(menu.id)}
            style={{
              boxShadow: isOpen ? '0 8px 30px rgba(0, 0, 0, 0.08)' : 'none',
            }}
          >
            {/* Bridge area to prevent gap issues */}
            <div className="absolute -top-4 left-0 right-0 h-4" />
            
            <div className="container-wide py-12">
              <div className={`grid ${hasImages ? 'grid-cols-4' : 'grid-cols-1'} gap-12`}>
                {/* Left Column - Categories with Submenus */}
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 mb-4">
                    {menu.title || menu.name}
                  </h3>
                  <ul className="space-y-3">
                    {menu.items.map((item) => (
                      <li key={item.id} className="group/item">
                        <Link 
                          href={item.url} 
                          className="text-xs tracking-wide uppercase text-neutral-600 hover:text-neutral-900 transition-colors duration-200 block"
                        >
                          {item.label}
                        </Link>
                        {/* Submenu items */}
                        {item.children && item.children.length > 0 && (
                          <ul className="ml-4 mt-2 space-y-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                            {item.children.map((child) => (
                              <li key={child.id}>
                                <Link 
                                  href={child.url} 
                                  className="text-xs tracking-wide uppercase text-neutral-500 hover:text-neutral-700 transition-colors duration-200 block"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Columns - Only show if there are items with images */}
                {hasImages && (
                  <div className="col-span-3 grid grid-cols-3 gap-6">
                    {itemsWithImages.slice(0, 3).map((item) => (
                      <Link key={item.id} href={item.url} className="group">
                        <div className="overflow-hidden mb-3">
                          <img 
                            src={item.image_url} 
                            alt={item.image_alt || item.label}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                          />
                        </div>
                        <p className="text-xs tracking-wide uppercase text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200">
                          {item.label}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
