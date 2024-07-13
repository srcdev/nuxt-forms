import type { IFormData, IFieldsInitialState, ICustomErrorMessage, ICustomErrorMessagesArr } from '@/types/types.forms';

export function useFormControl(fieldsInitialState: IFieldsInitialState | Ref<IFieldsInitialState | null>) {
  let savedInitialState = {};

  const formData = ref<IFormData>({
    data: {} as IFieldsInitialState,
    validityState: {},
    dirtyFields: {},
    focusedField: '',
    isPending: false,
    errorCount: 0,
    customErrorMessages: {},
    hasCustomErrorMessages: false,
    formIsValid: false,
    submitSuccess: false,
    submitDisabled: false,
  });

  const initValidationState = async () => {
    const fields = Object.keys(fieldsInitialState.value || {});
    const state = fields.reduce((acc, field) => {
      acc[field] = false;
      return acc;
    }, {} as Record<string, boolean>);
    formData.value.validityState = state;
  };

  const initFormData = async () => {
    await initValidationState();

    if (fieldsInitialState !== null) {
      savedInitialState = toRaw(fieldsInitialState.value) as IFieldsInitialState;
      formData.value.data = fieldsInitialState as IFieldsInitialState;
    }
    return;
  };

  const getErrorCount = async (updateState: boolean = false) => {
    await nextTick();

    const errorCount = Object.values(formData.value.validityState).filter((value) => !value).length;
    formData.value.errorCount = errorCount;
    formData.value.formIsValid = errorCount === 0;

    if (updateState) {
      formData.value.submitDisabled = true;
    }

    if (formData.value.submitDisabled) {
      formData.value.submitDisabled = !formData.value.formIsValid;
    }

    return formData.value.errorCount;
  };

  // Function to count items with "useCustomError" set to true
  const countItemsWithCustomError = (obj: ICustomErrorMessagesArr) => {
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
   *   const { updateCustomErrors } = useFormControl();
   *
   *   Add/Update entry
   *   const sampleCustomErrorEmail = {
   *     useCustomError: true,
   *     message: "This is a sample custom error for error EMAIL",
   *   };
   *   updateCustomErrors("email", sampleCustomErrorEmail);
   */
  const updateCustomErrors = (name: string, message: null | string = null, valid: boolean = false) => {
    if (message !== null) {
      formData.value.validityState[name] = valid;
      formData.value.customErrorMessages[name] = {
        useCustomError: true,
        message,
      };
    }
    formData.value.hasCustomErrorMessages = countItemsWithCustomError(formData.value.customErrorMessages) > 0;
  };

  const resetForm = () => {
    formData.value.data = toRaw(fieldsInitialState.value) as IFieldsInitialState;
    formData.value.validityState = {};
    formData.value.errorCount = 0;
    formData.value.isPending = false;
    formData.value.customErrorMessages = {};
    formData.value.formIsValid = false;
  };

  const formIsValid = computed(() => {
    return formData.value.errorCount === 0;
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

  onMounted(() => {
    initFormData();
  });

  return {
    formData,
    getErrorCount,
    updateCustomErrors,
    resetForm,
    formIsValid,
    submitDisabled,
  };
}
