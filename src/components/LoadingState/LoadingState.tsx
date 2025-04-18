import { ProgressBar } from '@blueprintjs/core';
import React, { PureComponent } from 'react';
import { SingleColumnLayout } from '@/components/SingleColumnLayout/SingleColumnLayout';

import './LoadingState.scss';

interface LoadingStateProps {
  large?: boolean;
}

interface LoadingStateState {
  showProgressBar: boolean;
}

export class LoadingState extends PureComponent<LoadingStateProps, LoadingStateState> {
  private timer: ReturnType<typeof setTimeout> | null = null;

  state: LoadingStateState = {
    showProgressBar: false,
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ showProgressBar: true });
      this.timer = null;
    }, 500);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    if (this.props.large) {
      return <SingleColumnLayout>{this.renderProgressBar()}</SingleColumnLayout>;
    }
    return this.renderProgressBar();
  }

  renderProgressBar = () => {
    if (!this.state.showProgressBar) {
      return null;
    }
    return <ProgressBar className="loading-state" />;
  };
}
