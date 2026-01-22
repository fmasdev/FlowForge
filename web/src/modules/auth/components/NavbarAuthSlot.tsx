// src/modules/auth/components/NavbarAuthSlot.tsx

'use client';

import { Cta } from '@/components/Cta/Cta';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { DropdownMenu, MenuItem } from '@/components/dropdown/DropdownMenu';
import type { CtaType } from '@/components/Cta/Cta.type';

export const NavbarAuthSlot = (): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation('auth');

  const notAtuthCtas: CtaType[] = [
    {
      label: t('navbar.login'),
      link: '/auth/login',
      isActive: pathname === '/login',
    },
    {
      label: t('navbar.signup'),
      link: '/auth/signup',
      isActive: pathname === '/auth/signup',
    },
  ];

  const userMenu: MenuItem[] = [
    {
      label: t('navbar.profile'),
      link: '/profile',
      isActive: pathname === '/profile',
    },
    {
      label: t('navbar.logout'),
      isActive: false,
      onClick: () => {
        logout();
        router.replace('/');
      },
    },
  ];

  if (!isAuthenticated) {
    return (
      <>
        {notAtuthCtas.map((cta: CtaType, index: number) => (
          <Cta
            key={index}
            label={cta.label}
            isActive={cta?.isActive}
            link={cta?.link}
            variant='navbar'
            onClick={cta?.onClick}
          />
        ))}
      </>
    );
  }

  return (
    <DropdownMenu
      iconName="user"
      variant='navbar'
      menuItems={userMenu}
    />
  );
};
