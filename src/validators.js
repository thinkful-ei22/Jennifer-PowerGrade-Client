//input required
export const required = value => (value ? undefined : 'Required');
//input cannot be empty
export const nonEmpty = value =>
  value.trim() !== '' ? undefined : 'Cannot be empty';
//input has no leading or trailing whitespace
export const isTrimmed = value =>
  value.trim() === value ? undefined : 'Cannot start or end with whitespace';
//input is the correct length
export const length = length => value => {
  if (length.min && value.length < length.min) {
    return `Must be at least ${length.min} characters long`;
  }
  if (length.max && value.length > length.max) {
    return `Must be at most ${length.max} characters long`;
  }
};
//input matches
export const matches = field => (value, allValues) =>
  field in allValues && value.trim() === allValues[field].trim()
    ? undefined
    : 'Does not match';
