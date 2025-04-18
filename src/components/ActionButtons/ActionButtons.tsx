import classNames from 'classnames';
import './ActionButtons.scss';

type ActionButtonsProps = {
  leftAlign?: boolean;
  children?: React.ReactNode;
};

export function ActionButtons({ leftAlign, children }: ActionButtonsProps) {
  return (
    <div className={classNames('action-buttons', { 'right-action-buttons': !leftAlign })}>
      {children}
    </div>
  );
}
