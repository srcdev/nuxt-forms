import { z, ZodError } from 'zod';
import type { IFormFieldStateObj, ApiErrorResponse } from '@/types/types.forms';

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
    formFieldStateArr: {} as IFormFieldStateObj,
  });

  const formFieldState = {
    isValid: false,
    isDirty: false,
    previousValue: null,
  };

  type formSchema = z.infer<typeof formSchema>;
  const zodErrorObj = ref<z.ZodFormattedError<formSchema> | null>(null);

  const initZodForm = () => {
    for (const [field] of Object.entries(formSchema.shape)) {
      zodFormControl.formFieldStateArr[field] = formFieldState;
    }
  };

  const getErrorCount = (zodErrorObj: Ref<z.ZodFormattedError<formSchema> | null>) => {
    const zodCountErrors = zodErrorObj.value ?? [];
    delete zodCountErrors._errors;
    const errorCount = Object.keys(zodCountErrors ?? []).length;
    return errorCount;
  };

  const transformErrorMessages = (errors: any) => {
    // console.log('transformErrorMessages');
    // console.log(errors);
    const apiErrors = ref({}) as any;
    for (const [key, value] of Object.entries(errors)) {
      // console.log(key, value);
      const fieldPath = key.split('.').map((key: string) => key.charAt(0).toLowerCase() + key.slice(1));
      apiErrors.value[fieldPath.join('.')] = value;
    }

    return apiErrors.value;
  };

  const pushApiErrorsToFormErrors = async (apiErrorResponse: ApiErrorResponse) => {
    // console.log('apiErrorResponse');
    // console.log(apiErrorResponse);
    // const apiErrors = ref({}) as any;

    // Map API errors to form fields
    const apiErrors = transformErrorMessages(apiErrorResponse.data.errors);

    // apiErrors.forEach((error) => {
    //   const fieldPath = error.key.split('.').map((key: string) => key.charAt(0).toLowerCase() + key.slice(1));
    //   apiErrors.value[fieldPath.join('.')] = error.message;
    // });

    // Create a ZodError object to hold the issues
    const zodError = new ZodError([]);

    // Add issues to the ZodError object
    for (const [path, message] of Object.entries(apiErrors)) {
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
    zodFormControl.submitAttempted = true;
    return zodErrorObj.value;
  };

  // const updateValue = async (key: string, value: string) => {
  //   console.log(`Updating key(${key}) with value(${value}) | previousValue(${zodFormControl.formFieldStateArr[key].previousValue})`);
  //   zodFormControl.formFieldStateArr[key].previousValue = value ?? null;
  // };

  // async function updatePreviousValues(state: Record<string, any>, zodFormControl: any) {
  //   Object.keys(state).forEach((key) => {
  //     if (zodFormControl.formFieldStateArr[key]) {
  //       zodFormControl.formFieldStateArr[key].previousValue = state[key] ?? null;
  //     }
  //   });
  // }

  const updatePreviousValues = async (state: Record<string, any>) => {
    console.log(`useZodValidation | updatePreviousValues`);
    // console.log('##### state');
    // console.log(state);

    // Object.keys(state).forEach((key) => {
    //   console.log(`key(${key}) | state[key](${state[key]})`);
    //   zodFormControl.formFieldStateArr[key].previousValue = state[key] ?? null;
    // });

    // const formFieldStateArr = reactive<IFormFieldStateObj>(zodFormControl.formFieldStateArr);
    const formFieldStateArr = { ...toRaw(zodFormControl.formFieldStateArr) } as IFormFieldStateObj;
    // console.log('#### formFieldStateArr');
    // console.log(formFieldStateArr);

    for (const [key, value] of Object.entries(state)) {
      await useSleep(100);
      console.log(`Updating key(${key}) with value(${value}) | previousValue(${zodFormControl.formFieldStateArr[key].previousValue})`);
      if (formFieldStateArr[key] && state[key]) {
        formFieldStateArr[key].previousValue = value ?? null;
      }
      // updateValue(key, value);
    }
    console.log('#### formFieldStateArr');
    console.log(formFieldStateArr);
    zodFormControl.formFieldStateArr = formFieldStateArr;

    // Object.entries(zodFormControl.formFieldStateArr).forEach(async ([key]) => {
    //   if (state[key]) {
    //     await useSleep(2000);
    //     console.log(`state[${key}]`, state[key]);
    //     zodFormControl.formFieldStateArr[key].previousValue = state[key] ?? null;
    //   }
    //   // updateValue(key, value);
    // });

    // for (const [key] of Object.entries(zodFormControl.formFieldStateArr)) {
    //   await useSleep(2000);
    //   if (state[key]) {
    //     // formFieldStateArr[key].previousValue = value ?? null;
    //     console.log(`state[${key}]`);
    //     console.log(state[key]);
    //     zodFormControl.formFieldStateArr[key].previousValue = state[key] ?? null;
    //   }
    //   // updateValue(key, value);
    // }

    // zodFormControl.formFieldStateArr = formFieldStateArr;

    // Object.keys(state).forEach(async (key) => {
    //   await useSleep(2000);
    //   if (zodFormControl.formFieldStateArr[key]) {
    //     console.log(`Updating key(${key}) with value(${state[key]})`);
    //     zodFormControl.formFieldStateArr[key].previousValue = state[key] ?? null;
    //   }
    // });

    // return;
  };

  const doZodValidate = async (state: Record<string, any>, isSubmitting: boolean = false) => {
    console.log(`doZodValidate(isSubmitting: ${isSubmitting})`);
    if (isSubmitting) {
      // Currently updating all previousValues on submit, commented out for now
      // await updatePreviousValues(state);
    }
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

  return {
    initZodForm,
    zodFormControl,
    zodErrorObj,
    pushApiErrorsToFormErrors,
    doZodValidate,
    fieldMaxLength,
  };
};

export default useZodValidation;
