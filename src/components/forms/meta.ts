import { Intent } from '@blueprintjs/core';
import { FieldMetaState } from 'react-final-form';


export function isValid(meta: FieldMetaState<any>): boolean {
  return !meta.touched || meta.valid === true;
}

export function getIntent(meta: FieldMetaState<any>): Intent | undefined {
  return isValid(meta) ? undefined : Intent.DANGER;
}

export function getIntentClassName(meta: FieldMetaState<any>): Record<string, boolean> {
  return {
    'pt-intent-danger': !isValid(meta),
  };
}
