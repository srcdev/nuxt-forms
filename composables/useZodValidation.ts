import { ref, reactive, toRaw, type Ref } from 'vue';
import { z, ZodError } from 'zod';
import type { ApiErrorResponse } from '../types/types.forms';

const useZodValidation = (formSchema: any, formRef: Ref<HTMLFormElement | null>) => {
  const zodFormControl = reactive({
    errorCount: 0,
    displayLoader: false,
    submitDisabled: false,
    submitAttempted: false,
    submitSuccessful: false,
    formIsValid: false,
    isPending: false,
    isDisabled: false,
    previousState: {} as Record<string, any>,
  });

  type formSchema = z.infer<typeof formSchema>;
  const zodErrorObj = ref<z.ZodFormattedError<formSchema> | null>(null);

  const resetPreviousValues = () => {
    for (const [field] of Object.entries(formSchema.shape)) {
      const previousValue = {
        value: null,
        message: '',
      };

      zodFormControl.previousState[field] = previousValue;
    }
  };

  const initZodForm = () => {
    resetPreviousValues();
  };

  const getErrorCount = (zodErrorObj: Ref<z.ZodFormattedError<formSchema> | null>) => {
    const zodCountErrors = zodErrorObj.value ?? [];
    // @ts-ignore
    delete zodCountErrors._errors;
    const errorCount = Object.keys(zodCountErrors ?? []).length;
    return errorCount;
  };

  const transformErrorMessages = (errors: any) => {
    const apiErrors = ref({}) as any;
    for (const [key, value] of Object.entries(errors)) {
      const fieldPath = key.split('.').map((key: string) => key.charAt(0).toLowerCase() + key.slice(1));
      apiErrors.value[fieldPath.join('.')] = value;
    }

    return apiErrors.value;
  };

  const updatePreviousValue = async (field: string, message: string, state: Record<string, any>) => {
    const previousValue = {
      value: state[field],
      message: message,
    };
    zodFormControl.previousState[field] = previousValue;
  };

  const pushCustomErrors = async (apiErrorResponse: ApiErrorResponse, state: Record<string, any>) => {
    const apiErrors = transformErrorMessages(apiErrorResponse.data.errors);

    // 1: Create a ZodError object to hold the issues
    const zodError = new ZodError([]);

    // 2: Reset previous state values
    resetPreviousValues();

    // 3: Add issues to the ZodError object
    for (const [path, message] of Object.entries(apiErrors)) {
      zodError.addIssue({
        path: path.split('.'),
        message: message as string,
        code: z.ZodIssueCode.custom,
      });
      await updatePreviousValue(path, message as string, state);
    }

    zodErrorObj.value = zodError.format();
    zodFormControl.errorCount = getErrorCount(zodErrorObj);
    zodFormControl.formIsValid = zodFormControl.errorCount === 0;
    zodFormControl.displayLoader = false;
    zodFormControl.submitAttempted = true;
    scrollToFirstError();
    return zodErrorObj.value;
  };

  const doZodValidate = async (state: Record<string, any>) => {
    const valid = formSchema.safeParse(toRaw(state));
    if (!valid.success) {
      zodErrorObj.value = valid.error.format();
    } else {
      zodErrorObj.value = null;
    }

    zodFormControl.errorCount = getErrorCount(zodErrorObj);
    zodFormControl.formIsValid = valid.success;

    return valid.success;
  };

  const fieldMaxLength = (name: string) => {
    const fieldSchema = formSchema.shape[name];
    if (fieldSchema instanceof z.ZodString) {
      return fieldSchema._def.checks.find((check) => check.kind === 'max')?.value || null;
    }
    return null;
  };

  const scrollToFirstError = async () => {
    await nextTick();
    if (formRef.value) {
      const firstErrorElement = formRef.value.querySelector('[aria-invalid=true]');
      window.scrollTo({
        top: firstErrorElement?.getBoundingClientRect().y,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const scrollToFormHead = () => {
    if (formRef.value) {
      const formHead = formRef.value.getBoundingClientRect().top;
      window.scrollTo({
        top: formHead,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return {
    initZodForm,
    zodFormControl,
    zodErrorObj,
    pushCustomErrors,
    doZodValidate,
    fieldMaxLength,
    formRef,
    scrollToFirstError,
    scrollToFormHead,
  };
};

export default useZodValidation;
