import type { IFormData, IFieldsInitialState, IFormFieldC12, ICustomErrorMessage, IErrorMessagesArr } from '@/types/types.forms';
import { formFieldC12 } from '@/components/forms/c12/utils';

export function useFormControl() {
  let savedInitialState = {};

  const formData = ref<IFormData>({
    data: {} as IFieldsInitialState,
    validityState: {},
    dirtyFields: {},
    focusedField: '',
    isPending: false,
    errorCount: 0,
    errorMessages: {},
    formFieldsC12: {},
    hasCustomErrorMessages: false,
    formIsValid: false,
    submitAttempted: false,
    submitDisabled: false,
    submitSuccess: false,
    displayErrorMessages: false,
  });

  const initValidationState = async (fieldsInitialState: IFieldsInitialState | Ref<IFieldsInitialState | null>) => {
    const fields = Object.keys(fieldsInitialState.value || {});
    const state = fields.reduce((accumulatedFields, field) => {
      accumulatedFields[field] = false;
      return accumulatedFields;
    }, {} as Record<string, boolean>);
    formData.value.validityState = state;
  };

  const initFormData = async (fieldsInitialState: IFieldsInitialState | Ref<IFieldsInitialState | null>) => {
    initValidationState(fieldsInitialState);

    if (fieldsInitialState !== null) {
      savedInitialState = toRaw(fieldsInitialState.value) as IFieldsInitialState;
      formData.value.data = fieldsInitialState as IFieldsInitialState;
    }
    return;
  };

  const initFormFieldsC12 = (name: string, formFieldC12: IFormFieldC12) => {
    formData.value.formFieldsC12[name] = formFieldC12;
    return;
  };

  const getErrorCount = async (updateState: boolean = false) => {
    await nextTick();

    const errorCount = Object.values(formData.value.validityState).filter((value) => !value).length;
    formData.value.errorCount = errorCount;
    formData.value.formIsValid = errorCount === 0;

    if (updateState) {
      formData.value.submitDisabled = true;
      formData.value.displayErrorMessages = formData.value.errorCount > 0;
      formData.value.submitAttempted = true;
    }

    if (formData.value.submitDisabled) {
      formData.value.submitDisabled = !formData.value.formIsValid;
    }

    return formData.value.errorCount;
  };

  // Function to count items with "useCustomError" set to true
  const countItemsWithCustomError = (obj: IErrorMessagesArr) => {
    let count = 0;

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key].useCustomError === true) {
        count++;
      }
    }

    return count;
  };

  /*
   *   Useage:
   *
   *   const { updateErrorMessages } = useFormControl();
   *
   *   Add/Update entry
   *   const sampleCustomErrorEmail = {
   *     useCustomError: true,
   *     message: "This is a sample custom error for error EMAIL",
   *   };
   *   updateErrorMessages("email", sampleCustomErrorEmail);
   */
  const updateErrorMessages = async (name: string, message: string = '', valid: boolean = false) => {
    if (!valid) {
      // formData.value.validityState[name] = valid;
      // formData.value.errorMessages[name] = {
      //   useCustomError: true,
      //   message,
      // };

      formData.value.formFieldsC12[name].useCustomError = true;
      formData.value.formFieldsC12[name].customErrors = [message];
      formData.value.formFieldsC12[name].isValid = valid;

      // formData.value.errorMessages[name].useCustomError = true;
      // formData.value.errorMessages[name].message = message;
    }
    formData.value.hasCustomErrorMessages = countItemsWithCustomError(formData.value.errorMessages) > 0;
  };

  const useApiErrors = async (errors: any) => {
    Object.keys(errors).forEach((key: any) => {
      updateErrorMessages(key, errors[key]);
    });

    for (const [key, message] of Object.entries(errors)) {
      console.log(`${key}: ${message}`);
      updateErrorMessages(key, message);
    }
  };

  // const resetForm = () => {
  //   console.log('resetForm()');
  //   formData.value.data = toRaw(fieldsInitialState.value) as IFieldsInitialState;
  //   formData.value.validityState = {};
  //   formData.value.errorCount = 0;
  //   formData.value.isPending = false;
  //   formData.value.errorMessages = {};
  //   formData.value.formIsValid = false;
  // };

  const fieldIsDirty = (name: string) => {
    if (typeof formData.value.formFieldsC12[name] !== 'undefined') {
      return formData.value.formFieldsC12[name].isDirty;
    } else {
      return false;
    }
  };

  const fieldHasError = (name: string) => {
    const currentValidityState = formData.value.validityState[name];

    if (formData.value.submitAttempted) {
      return currentValidityState;
    }
    return false;
  };

  const formIsValid = computed(() => {
    return formData.value.formIsValid;
  });

  const submitDisabled = computed(() => {
    return formData.value.submitDisabled;
  });

  // Keep an eye on this for performance issue

  watch(
    () => formData.value.validityState,
    () => {
      getErrorCount();
    },
    { deep: true }
  );

  watch(
    () => formData.value.formFieldsC12,
    () => {
      formData.value.formFieldsC12;
    },
    { deep: true }
  );

  // watch(
  //   () => formData.value.errorMessages,
  //   () => {
  //     console.log(formData.value.errorMessages);
  //   },
  //   { deep: true }
  // );

  // onMounted(async () => {
  //   await initFormData(fieldsInitialState);
  // });

  return {
    formData,
    initFormData,
    initFormFieldsC12,
    getErrorCount,
    updateErrorMessages,
    // resetForm,
    formIsValid,
    submitDisabled,
    useApiErrors,
    fieldHasError,
    fieldIsDirty,
  };
}
