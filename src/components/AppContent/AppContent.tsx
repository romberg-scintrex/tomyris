import classNames from 'classnames';
import { ReactNode } from 'react';
import type { JSX } from 'react';

import './AppContent.scss';

interface AppContentProps {
  children: ReactNode;
}

export function AppContent({ children }: AppContentProps): JSX.Element {
  return (
    <div
      className={classNames('app-content', {
        'is-course-chapter-problem': isInCourseChapterProblemPath(),
      })}
    >
      {children}
    </div>
  );
}

function isInCourseChapterProblemPath(): boolean {
  return /\/courses\/[^/]+\/chapters\/[^/]+\/problems\//.test(window.location.pathname);
}
