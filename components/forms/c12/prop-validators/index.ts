export const propValidators = {
  size: ['x-small', 'small', 'normal', 'medium', 'large'],
  weight: [
    'wght-100',
    'wght-200',
    'wght-300',
    'wght-400',
    'wght-500',
    'wght-600',
    'wght-700',
    'wght-800',
    'wght-900',
    'light',
    'normal',
    'bold',
    'fvs-wght-100',
    'fvs-wght-200',
    'fvs-wght-300',
    'fvs-wght-400',
    'fvs-wght-500',
    'fvs-wght-600',
    'fvs-wght-700',
    'fvs-wght-800',
    'fvs-wght-900',
  ],
  theme: ['primary', 'secondary', 'tertiary', 'ghost', 'error', 'success', 'warning', 'input-action', 'input-action-underlined'],
  checkboxAppearance: [null, 'with-decorator'],
  checkboxStyle: ['check', 'cross'],
  radioAppearance: [null, 'with-decorator'],
  optionsLayout: ['block', 'inline', 'equal-widths'],
  labelWeight: ['normal', 'semi-bold', 'bold'],
  inputVariant: ['normal', 'outlined', 'underlined'],
  inputTypesButton: ['button', 'cancel', 'reset', 'submit'],
  inputTypesText: ['text', 'email', 'password', 'number', 'tel', 'url'],
  inputMode: ['text', 'email', 'tel', 'url', 'search', 'numeric', 'none', 'decimal'],
};

export default propValidators;
