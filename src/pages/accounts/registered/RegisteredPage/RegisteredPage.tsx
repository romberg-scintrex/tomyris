import { useEffect } from 'react';
import { Card } from '../../../../components/Card/Card';
import { SingleColumnLayout } from '../../../../components/SingleColumnLayout/SingleColumnLayout';
import type { JSX } from 'react';

export default function RegisteredPage(): JSX.Element {
    useEffect(() => {
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <SingleColumnLayout>
        <Card title="Registration successful">
          <p>Your account is now active.</p>
          <p>
            You will be redirected to the <a href="/">home page</a> in a moment.
          </p>
        </Card>
      </SingleColumnLayout>
    );
  }
