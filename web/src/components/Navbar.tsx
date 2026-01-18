// src/components/Navbar.tsx

'use client';

import CtaButton, { CtaButtonType } from '@/components/CtaButton';
import NavbarAuthSlot from '@/modules/auth/components/NavbarAuthSlot';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { MediaImg } from '@/types/media.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NavBar = () => {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const logoImage: MediaImg = {
    src: 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500',
    alt: 'Your Company',
    className: 'h-8 w-auto',
  };

  const navigationItems: CtaButtonType[] = [
    {
      textContent: 'Dashboard',
      link: '/dashboard',
      isActive: pathname === '/dashboard',
    },
    {
      textContent: 'Profile',
      link: '/profile',
      isActive: pathname === '/profile'
    },
    {
      textContent: 'Projects',
      link: '/projects',
      isActive: pathname === '/projects'
    },
    {
      textContent: 'Teams',
      link: '/teams',
      isActive: pathname === '/teams'
    },{
      textContent: 'notifications',
      link: '/notifications',
      isActive: pathname === '/notifications'
    },
    {
      textContent: 'settings',
      link: '/settings',
      isActive: pathname === '/settings'
    },
  ];

  const toggleNav = () => setIsNavOpen((p) => !p);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Mobile button */}
        {isAuthenticated && (
          <div className="flex md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-1 focus:outline-indigo-500"
              onClick={toggleNav}
              aria-expanded={isNavOpen}
              aria-controls="mobile-menu"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {isNavOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="w-6 h-6"
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="w-6 h-6"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Desktop logo and links  */}
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex shrink-0 items-center">
            <Link href="/">
             <img 
              src={logoImage.src} 
              alt={logoImage.alt}
              className={logoImage.className}
            />
            </Link>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex h-10 space-x-4">
              {isAuthenticated && navigationItems.map((navItem, index) => (
                <CtaButton
                  key={index}
                  textContent={navItem.textContent}
                  isActive={navItem.isActive}
                  link={navItem.link}
                  isBtn={false}
                  color="ternary"
                  hoverClass="hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300"
                />
              ))}
            </div>
          </div>
        </div>

        <NavbarAuthSlot />

        {/* todo lang dropdown */}
        {/* <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>  */}
      </div>

      {/* Mobile menu */}
      {isAuthenticated && isNavOpen && (
        <div id="mobile-menu" className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-white bg-gray-950/50"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
          >
            Team
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
          >
            Projects
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
          >
            Calendar
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
