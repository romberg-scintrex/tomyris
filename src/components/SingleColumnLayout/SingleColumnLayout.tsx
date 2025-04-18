'use client';

import React from 'react';
import './SingleColumnLayout.scss';

export function SingleColumnLayout({ children }: { children: React.ReactNode }) {
  return <div className="layout-single-col">{children}</div>;
}
