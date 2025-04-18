// import { getGradingLanguageFilenameExtensions } from '../../modules/api/gabriel/language.js';

type ValidatorFn = (value: any, allValues?: Record<string, any>) => string | undefined;
type FileLike = { name: string; size?: number };

export const Required: ValidatorFn = value => (value ? undefined : 'Required');

export const Username: ValidatorFn = value =>
  /^[a-zA-Z0-9._]{3,20}$/.test(value)
    ? undefined
    : 'Must contain between 3 and 20 alphanumeric characters, dots, or underscores';

export const NonnegativeNumber: ValidatorFn = value =>
  +value >= 0 ? undefined : 'Must be a non-negative number';

export const Slug: ValidatorFn = value =>
  /^[a-zA-Z0-9-]{3,75}$/.test(value)
    ? undefined
    : 'Must contain between 3 and 75 alphanumeric characters or dashes';

export const Alias: ValidatorFn = value =>
  /^[a-zA-Z0-9-]{1,20}$/.test(value)
    ? undefined
    : 'Must contain between 1 and 20 alphanumeric characters or dashes';

export const EmailAddress: ValidatorFn = value =>
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(value)
    ? undefined
    : 'Invalid email address';

export const ConfirmPassword: ValidatorFn = (value, allValues = {}) =>
  value === allValues.password ? undefined : 'Confirmed password does not match';

export const MaxCodeLength50KB: ValidatorFn = value =>
  value && value.length <= 50 * 1024 ? undefined : 'Code length must be at most 50 KB';

export const MaxFileSize100KB: ValidatorFn = (value: FileLike) =>
  value && value.size !== undefined && value.size <= 100 * 1024
    ? undefined
    : 'File size must be at most 100 KB';

export const MaxFileSize300KB: ValidatorFn = (value: FileLike) =>
  value && value.size !== undefined && value.size <= 300 * 1024
    ? undefined
    : 'File size must be at most 300 KB';

export const MaxFileSize10MB: ValidatorFn = (value: FileLike) =>
  value && value.size !== undefined && value.size <= 10 * 1024 * 1024
    ? undefined
    : 'File size must be at most 10 MB';

export const MaxFileSize20MB: ValidatorFn = (value: FileLike) =>
  value && value.size !== undefined && value.size <= 20 * 1024 * 1024
    ? undefined
    : 'File size must be at most 20 MB';

export const Max100Lines: ValidatorFn = value => {
  if (!value) return undefined;
  const lines = value
    .split('\n')
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0);
  return lines.length <= 100 ? undefined : 'Max 100 lines';
};

export const Max1000Lines: ValidatorFn = value => {
  if (!value) return undefined;
  const lines = value
    .split('\n')
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0);
  return lines.length <= 1000 ? undefined : 'Max 1000 lines';
};

export function HasImageExtension(value: FileLike): string | undefined {
  const extensions = ['png', 'jpg', 'jpeg'];
  const re = new RegExp('\\.(' + extensions.join('|') + ')$', 'i');
  return value.name.toLowerCase().match(re)
    ? undefined
    : 'Allowed extensions: ' + extensions.join(', ') + '.';
}

// export function CompatibleFilenameExtensionForGradingLanguage(
//   value: FileLike,
//   allValues: { gradingLanguage?: string }
// ): string | undefined {
//   if (!allValues.gradingLanguage || !value) return undefined;
//   const extensions = getGradingLanguageFilenameExtensions(allValues.gradingLanguage);
//   const re = new RegExp('\\.(' + extensions.join('|') + ')$', 'i');
//   return value.name.match(re)
//     ? undefined
//     : 'Allowed extensions: ' + extensions.join(', ') + '.';
// }

export function composeValidators(...validators: ValidatorFn[]): ValidatorFn {
  return (value, allValues) =>
    validators.reduce<string | undefined>((error, validator) => error || validator(value, allValues), undefined);
}
