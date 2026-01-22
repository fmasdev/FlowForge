// src/modules/auth/components/NavbarAuthSlot.tsx

'use client';

import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { CtaType } from '@/components/cta/Cta.types';
import { MenuItem } from '@/components/dropdown/menu/DropdownMenu.types';
import { Cta } from '@/components/cta/Cta';
import { DropdownMenu } from '@/components/dropdown/menu/DropdownMenu';

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
