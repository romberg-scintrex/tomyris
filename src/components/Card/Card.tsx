import type { JSX } from 'react';
import { ReactNode } from 'react';
import { Card as BlueprintCard } from '@blueprintjs/core';
import './Card.scss';

interface CardProps {
  className?: string;
  title: ReactNode;
  action?: ReactNode;
  actionRightJustified?: boolean;
  children: ReactNode;
}

export function Card({
  className = '',
  title,
  action,
  actionRightJustified = false,
  children,
}: CardProps): JSX.Element {
  return (
    <div className={`card ${className}`}>
      <BlueprintCard className="card__title">
        <h3 className="float-left">{title}</h3>
        <div className={'card__title__action' + (actionRightJustified ? '_right' : '')}>
          {action}
        </div>
      </BlueprintCard>
      <BlueprintCard className="card__content">{children}</BlueprintCard>
    </div>
  );
}
