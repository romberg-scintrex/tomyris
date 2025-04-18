import { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import * as logoutActions from '../modules/logoutActions';
import { RootState } from '@/modules/session/types';

interface LogoutPageProps {
  onLogOut: () => void;
}

class LogoutPage extends Component<LogoutPageProps> {
  componentDidMount() {
    this.props.onLogOut();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => ({
  onLogOut: () => dispatch(logoutActions.logOut()),
});

export default connect(null, mapDispatchToProps)(LogoutPage);
