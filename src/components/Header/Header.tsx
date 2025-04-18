import { Alignment, Navbar } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import type { JSX } from 'react';

import logo from '../../assets/images/logo.png';
import { APP_CONFIG } from '../../utils/conf';
import Menubar from '../Menubar/Menubar';
import UserWidget from '../UserWidget/UserWidget';

import './Header.scss';

interface RouteItem {
  id: string;
  title: string;
  label?: string;
  icon?: string;
  route: {
    path: string;
    exact?: boolean;
    component: React.ComponentType<any>;
  };
  [key: string]: any;
}

interface HeaderProps {
  items: RouteItem[];
  homeRoute: RouteItem;
}

export default function Header({ items, homeRoute }: HeaderProps): JSX.Element {
  return (
    <Navbar className="header">
      <div className="header__wrapper">
        <Navbar.Group align={Alignment.LEFT}>
          <div>
            <Link to="/">
              <img src={logo} alt="header" className="header__logo" />
            </Link>
          </div>
          <Navbar.Heading className="header__title">{APP_CONFIG.name}</Navbar.Heading>
          <Navbar.Divider className="header__subtitle-wrapper" />
          <div className="header__subtitle header__subtitle-wrapper">{APP_CONFIG.slogan}</div>
          <Navbar.Divider />
          <Menubar items={items} homeRoute={homeRoute} />
        </Navbar.Group>

        {/* <UserWidget
          items={items}
          homeRoute={homeRoute}
          user={user}
          profile={profile}
          isWebConfigLoaded={isWebConfigLoaded}
          onRenderAvatar={onRenderAvatar}
        /> */}

        {/* <DarkModeWidget /> */}
      </div>
    </Navbar>
  );
}
