export interface IValidationPatterns {
  pattern: string;
  minlength: string;
  maxlength: string;
  hint: string;
}

export interface IOptionsConfig {
  id: string;
  name: string;
  value: string;
  label: string;
}

export interface IFormMultipleOptions {
  data: IOptionsConfig[];
  total: number;
  skip: number;
  limit: number;
}

export interface IOptionsValueArr {
  [key: string]: string | boolean | number | URL | object;
}

export interface IFieldsInitialState {
  [key: string]: null | string | boolean | number | URL | object | IOptionsValueArr[];
}

export interface IValidityState {
  badInput: boolean;
  customError: boolean;
  patternMismatch: boolean;
  rangeOverflow: boolean;
  rangeUnderflow: boolean;
  stepMismatch: boolean;
  tooLong: boolean;
  tooShort: boolean;
  typeMismatch: boolean;
  valid: boolean;
  valueMissing: boolean;
}

export interface IValidityStateArr {
  [key: string]: {
    badInput: boolean;
    customError: boolean;
    patternMismatch: boolean;
    rangeOverflow: boolean;
    rangeUnderflow: boolean;
    stepMismatch: boolean;
    tooLong: boolean;
    tooShort: boolean;
    typeMismatch: boolean;
    valid: boolean;
    valueMissing: boolean;
  };
}

export interface IFormFieldsState {
  [key: string]: boolean;
}

export interface ICustomErrorMessage {
  useCustomError: boolean;
  message: string;
}

export interface InpuTextC12 {
  label: string;
  placeholder: string;
  errorMessage: string;
}

export interface IErrorMessagesArr {
  [x: string]: ICustomErrorMessage;
}

export interface IFormFieldC12 {
  label: string;
  placeholder: string;
  errorMessage: string;
  useCustomError: boolean;
  customErrors: null | string | string[];
  isValid: boolean;
  isDirty: boolean;
  type: string;
  previousValue: null | string | boolean | number | URL | object;
}

export interface IFormFieldsC12 {
  [x: string]: IFormFieldC12;
}

export interface IFormData {
  [x: string]: string | boolean | number | URL | object;
  data: IFieldsInitialState;
  validityState: IFormFieldsState;
  dirtyFields: IFormFieldsState;
  focusedField: string;
  isPending: boolean;
  errorCount: number;
  errorMessages: IErrorMessagesArr;
  formFieldsC12: IFormFieldsC12;
  formIsValid: boolean;
  submitAttempted: boolean;
  submitDisabled: boolean;
  submitSuccess: boolean;
  displayErrorMessages: boolean;
}

export interface IApiErrorMessages {
  [x: string]: string;
}

// New types

export interface C12nInputText {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  errorMessage: string;
  fieldHasError: boolean;
  required: boolean;
  styleClassPassthrough: string[];
}
