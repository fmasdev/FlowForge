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

export const NavbarAuthSlot = (): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation('auth')

  const notAtuthCtas: CtaButtonType[] = [
    {
      textContent: t('navbar.login'),
      link: '/auth/login',
      isActive: pathname === '/login',
    },
    {
      textContent: t('navbar.signup'),
      link: '/auth/signup',
      isActive: pathname === '/auth/signup',
    },
  ];

  const userCtas: CtaButtonType[] = [
    {
      textContent: t('navbar.profile'),
      link: '/profile',
      isActive: pathname === '/profile',
    },
    {
      textContent: t('navbar.logout'),
      onClick: () => {
        logout()
        router.replace('/')
      }
    },
  ];

  const ctas: CtaButtonType[] = isAuthenticated ? userCtas : notAtuthCtas;

  return (
    <>
      {!!ctas && ctas.map((cta: CtaButtonType, index: number) => (
        <CtaButton
          key={index}
          textContent={cta.textContent}
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
};
