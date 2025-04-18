'use client';

import { connect } from 'react-redux';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../modules/session/sessionSelectors';
import { RootState } from '../../modules/session/types';

interface GuestRouteProps {
  component: React.ComponentType<any>;
  isLoggedIn: boolean;
}

function GuestRoute({ component: Component, isLoggedIn }: GuestRouteProps) {
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Component />;
}

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

export default connect(mapStateToProps)(GuestRoute);
