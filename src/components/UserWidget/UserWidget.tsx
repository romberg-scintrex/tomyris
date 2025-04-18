import {
  Alignment,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  Popover,
  Position
} from '@blueprintjs/core';
import { ChevronDown, Menu as IconMenu } from '@blueprintjs/icons';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MenuItemLink from '../MenuItemLink/MenuItemLink';
import './UserWidget.scss';

interface UserWidgetProps {
  user: { jid: string } | null;
  profile: { username: string } | null;
  isWebConfigLoaded: boolean;
  onRenderAvatar: (jid: string) => Promise<string>;
  items: { id: string; title: string; route: { path: string } }[];
  homeRoute: { title: string };
}

export default function UserWidget({
  user,
  profile,
  isWebConfigLoaded,
  onRenderAvatar,
  items,
  homeRoute
}: UserWidgetProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    if (user) {
      onRenderAvatar(user.jid).then(setAvatarUrl);
    }
  }, [user, onRenderAvatar]);

  if (!isWebConfigLoaded) return null;

  const navItems = (
    <>
      <MenuItemLink text="My profile" to={`/profiles/${profile?.username}`} />
      <MenuItemLink text="Log out" to="/logout" />
    </>
  );

  const renderMenuPopover = () => (
    <Popover
      className="widget-user__burger"
      content={
        <Menu className="widget-user__menu">
          <Link to="/">
            <MenuItem text={homeRoute.title} />
          </Link>
          {items.map(item => (
            <MenuItemLink key={item.id} text={item.title} to={item.route.path} />
          ))}
          {profile && <><MenuDivider />{navItems}</>}
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <IconMenu />
    </Popover>
  );

  return (
    <Navbar.Group align={Alignment.RIGHT}>
      {profile ? (
        <>
          {avatarUrl && (
            <div className="widget-user__avatar-wrapper">
              <img src={avatarUrl} alt="avatar" className="widget-user__avatar" />
            </div>
          )}
          <Popover
            content={<Menu className="widget-user__menu">{navItems}</Menu>}
            position={Position.BOTTOM_RIGHT}
          >
            <div className="widget-user__profile">
              <span className="widget-user__user__username" data-key="username">
                {profile.username}
              </span>
              <ChevronDown color="#252627" />
            </div>
          </Popover>
        </>
      ) : (
        <div className="widget-user__link">
          <Link data-key="login" to="/login">Log in</Link>
        </div>
      )}
      {renderMenuPopover()}
    </Navbar.Group>
  );
}
