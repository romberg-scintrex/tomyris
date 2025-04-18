import type { JSX } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FieldRenderProps } from 'react-final-form';

export function createRecaptchaField(siteKey: string) {
  return function FormRecaptcha({ input }: FieldRenderProps<string>): JSX.Element {
    return <ReCAPTCHA sitekey={siteKey} onChange={input.onChange} />;
  };
}
