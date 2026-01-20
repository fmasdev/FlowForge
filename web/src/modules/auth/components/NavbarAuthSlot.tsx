// src/modules/auth/components/NavbarAuthSlot.tsx

'use client';

import { 
  CtaButton, 
  type CtaButtonType 
} from '@/components/CtaButton';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { DropdownMenu, MenuItem } from '@/components/dropdown/DropdownMenu';

export const NavbarAuthSlot = (): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation('auth')

  const notAtuthCtas: CtaButtonType[] = [
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
        logout()
        router.replace('/')
      }
    },
  ];

  if (!isAuthenticated) {
    return (
      <>
        {!!notAtuthCtas && notAtuthCtas.map((cta: CtaButtonType, index: number) => (
          <CtaButton
            key={index}
            label={cta.label}
            isActive={cta?.isActive}
            link={cta?.link}
            isBtn={false}
            color="ternary"
            hoverClass="hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300"
            onClick={cta?.onClick}
          />
        ))}
      </>
    );
  }

  return (
    <DropdownMenu
      iconName="user"
      menuItems={userMenu}
    />
  )
};
