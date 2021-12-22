import { IconVariant } from 'components/atoms/Icon';

export type MenuItem = {
  to: string;
  title: string;
  icon: IconVariant;
};

export const menuItems: MenuItem[] = [
  { to: '/', title: 'Dashboard', icon: 'dashboard' },
  { to: '/apps', title: 'Apps', icon: 'apps' },
  { to: '/monitor', title: 'Monitor', icon: 'monitor' },
  { to: '/reports', title: 'Reports', icon: 'reports' },
  { to: '/sign-out', title: 'Sign Out', icon: 'logOut' },
];
