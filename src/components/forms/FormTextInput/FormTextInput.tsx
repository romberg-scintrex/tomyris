import { Classes, FormGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

import { FormInputValidation } from '../FormInputValidation/FormInputValidation';
import { getIntent, getIntentClassName } from '../meta';

interface FormTextInputProps {
  input: FieldInputProps<string, HTMLElement>;
  label: string;
  meta: FieldMetaState<string>;
  autoFocus?: boolean;
  inputType?: string;
}

export function FormTextInput({
  input,
  label,
  meta,
  autoFocus,
  inputType = 'text',
}: FormTextInputProps): JSX.Element {
  return (
    <FormGroup labelFor={input.name} label={label} intent={getIntent(meta)}>
      <input
        {...input}
        type={inputType}
        autoFocus={autoFocus}
        className={classNames(Classes.INPUT, getIntentClassName(meta))}
      />
      <FormInputValidation meta={meta} />
    </FormGroup>
  );
}
