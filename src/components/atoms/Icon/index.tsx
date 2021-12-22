import React from 'react';

import DashboardIcon from './DashboardIcon';
import AppsIcon from './AppsIcon';
import MonitorIcon from './MonitorIcon';
import ReportsIcon from './ReportsIcon';
import LogOutIcon from './LogOutIcon';
import MenuIcon from './MenuIcon';

export type IconVariant =
  | 'dashboard'
  | 'apps'
  | 'monitor'
  | 'reports'
  | 'logOut'
  | 'menu';

export type IconProps = {
  isActive?: boolean;
  variant: IconVariant;
};

export const Icon: React.FC<IconProps> = ({ isActive, variant }) => {
  const primaryColor = isActive ? '#005B97' : '#B3B3B3';
  const secondaryColor = isActive ? '#2DAEE5' : '#CDCCCC';

  switch (variant) {
    case 'dashboard':
      return (
        <DashboardIcon
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case 'apps':
      return (
        <AppsIcon primaryColor={primaryColor} secondaryColor={secondaryColor} />
      );
    case 'monitor':
      return (
        <MonitorIcon
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case 'reports':
      return (
        <ReportsIcon
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case 'logOut':
      return (
        <LogOutIcon
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      );
    case 'menu':
      return <MenuIcon />;
    default:
      return null;
  }
};

export default Icon;
