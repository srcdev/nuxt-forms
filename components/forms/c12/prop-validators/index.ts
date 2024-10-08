export const propValidators = {
  size: ['x-small', 'small', 'normal', 'medium', 'large'],
  weight: ['wght-100', 'wght-200', 'wght-300', 'wght-400', 'wght-500', 'wght-600', 'wght-700', 'wght-800', 'wght-900'],
  theme: ['primary', 'secondary', 'tertiary', 'ghost', 'error', 'success', 'warning'],
  checkboxAppearance: [null, 'with-decorator'],
  checkboxStyle: ['check', 'cross'],
  radioAppearance: [null, 'with-decorator'],
  optionsLayout: ['block', 'inline', 'equal-widths'],
  inputTypesButton: ['button', 'cancel', 'reset', 'submit'],
  inputTypesText: ['text', 'email', 'password', 'number', 'tel', 'url'],
};

export default propValidators;
