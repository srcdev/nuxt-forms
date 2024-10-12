import { z, ZodError } from 'zod';
import { type IFormFieldStateObj } from '@/types/types.forms';

const useZodValidation = (formSchema: any) => {
  const zodFormControl = reactive({
    errorCount: 0,
    displayLoader: false,
    submitDisabled: false,
    submitAttempted: false,
    submitSuccessful: false,
    formIsValid: false,
    isPending: false,
    isDisabled: false,
    // formFieldStateArr: {} as IFormFieldStateObj,
  });

  // const formFieldState = {
  //   isValid: false,
  //   isDirty: false,
  // };

  type formSchema = z.infer<typeof formSchema>;
  const zodErrorObj = ref<z.ZodFormattedError<formSchema> | null>(null);

  // const initZodForm = () => {
  //   for (const [field] of Object.entries(formSchema.shape)) {
  //     zodFormControl.formFieldStateArr[field] = formFieldState;
  //   }
  // };

  const getErrorCount = (zodErrorObj: Ref<z.ZodFormattedError<formSchema> | null>) => {
    const zodCountErrors = zodErrorObj.value ?? [];
    delete zodCountErrors._errors;
    const errorCount = Object.keys(zodCountErrors ?? []).length;
    return errorCount;
  };

  const pushApiErrorsToFormErrors = async (apiError: any[]) => {
    const apiErrors = ref({}) as any;

    // Map API errors to form fields
    apiError.forEach((error) => {
      const fieldPath = error.key.split('.').map((key: string) => key.charAt(0).toLowerCase() + key.slice(1));
      apiErrors.value[fieldPath.join('.')] = error.message;
    });

    // Create a ZodError object to hold the issues
    const zodError = new ZodError([]);

    // Add issues to the ZodError object
    for (const [path, message] of Object.entries(apiErrors.value)) {
      zodError.addIssue({
        path: path.split('.'),
        message: message as string,
        code: z.ZodIssueCode.custom,
      });
    }

    zodErrorObj.value = zodError.format();
    zodFormControl.errorCount = getErrorCount(zodErrorObj);
    zodFormControl.formIsValid = zodFormControl.errorCount === 0;
    zodFormControl.displayLoader = false;
    zodFormControl.submitAttempted = false;
    return zodErrorObj.value;
  };

  const doZodValidate = async (state: any) => {
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

  return {
    // initZodForm,
    zodFormControl,
    zodErrorObj,
    pushApiErrorsToFormErrors,
    doZodValidate,
  };
};

export default useZodValidation;
