import HTMLReactParser from 'html-react-parser';
import { APP_CONFIG } from '../../utils/conf';
import type { JSX } from 'react';

import './Footer.scss';

export function Footer(): JSX.Element {
  const footer: string = APP_CONFIG.footer || '© Similarity';

  return (
    <div className="footer">
      <hr />
      <small className="footer__text">
        <div className="float-left">{HTMLReactParser(footer)}</div>
        <div className="float-right">
          Powered by <a href="https://github.com/tailoring-fabroad">RSTomyris</a>
        </div>
        <div className="clearfix" />
      </small>
    </div>
  );
}
