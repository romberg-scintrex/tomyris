'use client';

import { connect } from 'react-redux';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../modules/session/sessionSelectors';
import { RootState } from '../../modules/session/types';

interface UserRouteProps {
  component: React.ComponentType<any>;
  isLoggedIn: boolean;
}

function UserRoute({ component: Component, isLoggedIn }: UserRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Component />;
}

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

export default connect(mapStateToProps)(UserRoute);
