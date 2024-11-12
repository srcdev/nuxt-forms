<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1 class="header-1">Example form</h1>
          <p class="body-normal">Use 'test@test.com' to trigger server errors</p>
        </div>
        <ContentGrid>
          <template #slot1>
            <FormWrapper width="medium">
              <template #default>
                <ClientOnly>
                  <form class="form-wrapper" @submit.stop.prevent="submitForm()">
                    <div aria-live="assertive" id="aria-live-message"></div>
                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputTextWithLabel
                          v-model="state.emailAddress"
                          type="email"
                          :maxlength="fieldMaxLength('email')"
                          id="emailAddress"
                          name="emailAddress"
                          placeholder="eg. name@domain.com"
                          label="Email address"
                          :errorMessage="formErrors?.emailAddress?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.emailAddress)"
                          :required="true"
                          :styleClassPassthrough="['style-1', 'style-2']"
                          theme="primary"
                        >
                          <template #left>
                            <Icon name="radix-icons:envelope-closed" class="icon" />
                          </template>
                        </InputTextWithLabel>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputTextWithLabel
                          v-model="state.username"
                          type="text"
                          :maxlength="fieldMaxLength('username')"
                          id="username"
                          name="username"
                          placeholder="eg. name@domain.com"
                          label="Username"
                          :errorMessage="formErrors?.username?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.username)"
                          :required="true"
                          :styleClassPassthrough="['style-1', 'style-2']"
                          theme="primary"
                        >
                          <template #left>
                            <Icon name="radix-icons:person" class="icon" />
                          </template>
                        </InputTextWithLabel>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputPasswordWithLabel
                          v-model="state.password"
                          :maxlength="fieldMaxLength('password')"
                          id="password"
                          name="password"
                          placeholder="eg. a mixure of numbers and letters"
                          label="Password"
                          :errorMessage="formErrors?.password?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.password)"
                          :required="true"
                          :styleClassPassthrough="['style-1', 'style-2']"
                          theme="primary"
                        >
                          <template #right>
                            <Icon name="radix-icons:eye-open" class="icon" />
                          </template>
                        </InputPasswordWithLabel>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputTextareaWithLabel
                          v-model="state.message"
                          :maxlength="fieldMaxLength('message')"
                          id="message"
                          name="message"
                          placeholder="Type your message here"
                          label="Your mesage"
                          :errorMessage="formErrors?.message?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.message)"
                          :required="true"
                          :styleClassPassthrough="['style-1', 'style-2']"
                        >
                        </InputTextareaWithLabel>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputTextAsNumberWithLabel
                          v-model.number="state.count2"
                          :maxlength="fieldMaxLength('count2')"
                          :min="25"
                          :max="75"
                          :step="5"
                          id="count2"
                          name="count2"
                          placeholder="eg. 10"
                          label="How many things? Between 25 & 75"
                          :errorMessage="formErrors?.count2?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.count2)"
                          :required="true"
                          :styleClassPassthrough="['style-1', 'style-2']"
                          theme="primary"
                        >
                          <template #description>
                            <p class="label-description">Input type="text" inputmode="numeric"</p>
                          </template>
                          <template #left>
                            <Icon name="gridicons:minus-small" class="icon" />
                          </template>
                          <template #right>
                            <Icon name="gridicons:plus-small" class="icon" />
                          </template>
                        </InputTextAsNumberWithLabel>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputNumberDefault
                          id="count"
                          name="count"
                          label="How many things? Between 25 & 75 , step 5"
                          :min="25"
                          :max="75"
                          :step="5"
                          placeholder="eg. What\'s your count?"
                          :errorMessage="formErrors?.count?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.count)"
                          :required="true"
                          :styleClassPassthrough="['count-1', 'count-2']"
                          v-model.number="state.count"
                          theme="primary"
                        >
                          <template #description>
                            <p class="label-description">Input type="number" inputmode="numeric"</p>
                          </template>
                          <template #left>
                            <Icon name="gridicons:minus-small" class="icon" />
                          </template>
                          <template #right>
                            <Icon name="gridicons:plus-small" class="icon" />
                          </template>
                        </InputNumberDefault>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputRangeDefault
                          id="score"
                          name="score"
                          label="Score between 0 & 100"
                          :min="0"
                          :max="100"
                          :step="10"
                          placeholder="eg. What\'s your score?"
                          :errorMessage="formErrors?.score?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.score)"
                          :required="true"
                          :styleClassPassthrough="['style-1', 'style-2']"
                          v-model.number="state.score"
                          theme="primary"
                        >
                          <template #description>
                            <p class="label-description">This is a description of what the user is required to do</p>
                          </template>
                          <template #datalist>
                            <datalist class="input-range-datalist" id="score-datalist">
                              <option value="0" label="Rubbish!"></option>
                              <option value="25" label="Below par"></option>
                              <option value="50" label="Average"></option>
                              <option value="75" label="Quite good"></option>
                              <option value="100" label="Excellent"></option>
                            </datalist>
                          </template>
                          <template #left>
                            <Icon name="gridicons:minus-small" class="icon" />
                          </template>
                          <template #right>
                            <Icon name="gridicons:plus-small" class="icon" />
                          </template>
                        </InputRangeDefault>
                      </template>
                    </FormField>

                    <FormField v-if="titleData !== null" width="wide" :has-gutter="false">
                      <template #default>
                        <MultipleRadiobuttons
                          id="title"
                          name="title"
                          legend="What is your title"
                          :required="true"
                          label="Check one"
                          placeholder="eg. Type something here"
                          :errorMessage="formErrors?.title?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.title)"
                          v-model="state.title"
                          v-model:fieldData="titleData"
                          size="normal"
                          checkbox-style="cross"
                          checkbox-appearance="with-decorator"
                          optionsLayout="equal-widths"
                          theme="primary"
                        >
                          <template #description>
                            <p class="label-description">This is description: optionsLayout = 'equal-widths/inline'</p>
                          </template>
                        </MultipleRadiobuttons>
                      </template>
                    </FormField>

                    <FormField v-if="citiesData !== null" width="wide" :has-gutter="false">
                      <template #default>
                        <MultipleCheckboxes
                          id="cities"
                          name="cities"
                          legend="Choose a location"
                          :required="true"
                          label="Check all Cities you like"
                          placeholder="eg. Type something here"
                          :errorMessage="formErrors?.cities?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.cities)"
                          v-model="state.cities"
                          v-model:fieldData="citiesData"
                          size="normal"
                          checkbox-style="cross"
                          checkbox-appearance="with-decorator"
                          optionsLayout="inline"
                          theme="primary"
                        >
                          <template #description>
                            <p class="label-description">This is description: optionsLayout = 'equal-widths'</p>
                          </template>
                        </MultipleCheckboxes>
                      </template>
                    </FormField>

                    <FormField v-if="countriesData !== null" width="wide" :has-gutter="false">
                      <template #default>
                        <MultipleCheckboxes
                          id="countries"
                          name="countries"
                          legend="Choose a country"
                          :required="true"
                          label="Check all Countries you like"
                          placeholder="eg. Type something here"
                          :errorMessage="formErrors?.countries?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.countries)"
                          v-model="state.countries"
                          v-model:fieldData="countriesData"
                          size="normal"
                          checkbox-style="check"
                          checkbox-appearance="with-decorator"
                          optionsLayout="equal-widths"
                          theme="primary"
                        >
                          <template #description>
                            <p class="label-description">This is description: optionsLayout = 'inline'</p>
                          </template>
                        </MultipleCheckboxes>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <SingleCheckbox
                          id="agreed"
                          name="agreed"
                          legend="I agree (label with description)"
                          label="Click to agree to something"
                          :required="true"
                          :errorMessage="formErrors?.agreed?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.agreed)"
                          v-model="state.agreed"
                          size="normal"
                          checkbox-style="check"
                          checkbox-appearance="with-decorator"
                          theme="primary"
                        >
                          <template #description>
                            <p class="label-description">You must <strong>agree</strong> to continue</p>
                          </template>
                        </SingleCheckbox>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <SingleCheckbox
                          id="agree"
                          name="agree"
                          legend="I agree (label no description)"
                          label="Click to agree to something"
                          :required="true"
                          :errorMessage="formErrors?.agree?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.agree)"
                          v-model="state.agree"
                          size="normal"
                          checkbox-style="check"
                          checkbox-appearance="with-decorator"
                          theme="primary"
                        >
                        </SingleCheckbox>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <SingleCheckbox
                          id="terms"
                          name="terms"
                          legend="Terms and conditions"
                          :required="true"
                          :errorMessage="formErrors?.terms?._errors[0] ?? ''"
                          :fieldHasError="Boolean(zodFormControl.submitAttempted && formErrors?.terms)"
                          v-model="state.terms"
                          size="normal"
                          checkbox-style="check"
                          checkbox-appearance="with-decorator"
                          theme="primary"
                        >
                          <template #labelContent>
                            <span class="body-normal">You must agree to our <NuxtLink to="/typography" class="link-normal">terms and conditions</NuxtLink> to continue</span>
                          </template>
                        </SingleCheckbox>
                      </template>
                    </FormField>

                    <FormField width="wide" :has-gutter="false">
                      <template #default>
                        <InputButtonSubmit
                          type="button"
                          @click.stop.prevent="submitForm()"
                          :is-pending="false"
                          :readonly="zodFormControl.submitDisabled"
                          button-text="Submit"
                          theme="primary"
                          size="medium"
                        />
                      </template>
                    </FormField>
                  </form>
                </ClientOnly>
              </template>
            </FormWrapper>
          </template>
          <template #slot2>
            <ClientOnly>
              <p>Client only state</p>
              <pre>
                {{ state }}
              </pre>
              <p>Client only zodFormControl</p>
              <pre>
                {{ zodFormControl }}
              </pre>
              <p>Client only formErrors</p>

              <pre>
                {{ formErrors }}
              </pre>
            </ClientOnly>
          </template>
        </ContentGrid>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { IFormMultipleOptions } from '../../../../types/types.forms';

definePageMeta({
  layout: false,
});

useHead({
  title: 'Text Field Example',
  meta: [{ name: 'description', content: 'Homepage' }],
  bodyAttrs: {
    class: '',
  },
});

/*
 * Fetch some sample data
 **/
const { data: citiesData } = await useFetch<IFormMultipleOptions>('/api/places/list?category=cities');
const { data: countriesData } = await useFetch<IFormMultipleOptions>('/api/places/list?category=countries');
const { data: titleData } = await useFetch<IFormMultipleOptions>('/api/utils?category=title');

/*
 * Setup forms
 */
const formSchema = reactive(
  z
    .object({
      emailAddress: z
        .string({
          required_error: 'Email address is required',
        })
        .email({ message: 'Invalid email address' })
        .refine((email) => email !== zodFormControl.previousState.emailAddress.value, {
          message: 'This email address has already been used',
        }),
      username: z
        .string({
          required_error: 'Username is required',
        })
        .trim()
        .min(2, 'Username is too short')
        .max(25, 'Username is too long')
        .refine((email) => email !== zodFormControl.previousState.username.value, {
          message: 'This username has already been used',
        }),
      password: z
        .string()
        .trim()
        .min(8, 'Password is too short')
        .max(25, 'Password is too long')
        .refine((email) => email !== zodFormControl.previousState.password.value, {
          message: "You've already used this password",
        }),
      message: z.string().trim().min(2, 'Message is too short').max(255, 'Message is too long'),
      count: z
        .number({
          required_error: 'Count is required',
          invalid_type_error: 'Count must be a number',
        })
        .int({ message: 'Count must be a whole number' })
        .gte(25, 'Count must be between 25 and 75')
        .lte(75, 'Count must be between 25 and 75')
        .multipleOf(5, 'Count must be a multiple of 5'),
      count2: z
        .number({
          required_error: 'Count is required',
          invalid_type_error: 'Count must be a number',
        })
        .int({ message: 'Count must be a whole number' })
        .gte(25, 'Count must be between 25 and 75')
        .lte(75, 'Count must be between 25 and 75'),
      score: z
        .number({
          required_error: 'Score is required',
          invalid_type_error: 'Score must be a number',
        })
        .gte(0)
        .lte(100),
      cities: z.array(z.string()).min(1, 'Please select at least one city'),
      countries: z.array(z.string()).min(2, 'Please select at least 2 countries').max(5, 'Please select no more than 5 countries'),
      title: z.string().min(1, { message: 'Title is required' }),
      agreed: z.boolean().refine((val) => val === true, { message: 'You must tick this box' }),
      agree: z.boolean().refine((val) => val === true, { message: 'You must tick this box' }),
      terms: z.boolean().refine((val) => val === true, { message: 'You must accept our terms' }),
    })
    .required({
      emailAddress: true,
      username: true,
      password: true,
      message: true,
      count: true,
      count2: true,
      score: true,
      cities: true,
      countries: true,
      title: true,
      agreed: true,
      agree: true,
      terms: true,
    })
);

type formSchema = z.infer<typeof formSchema>;
const formErrors = computed<z.ZodFormattedError<formSchema> | null>(() => zodErrorObj.value);

const state = reactive({
  emailAddress: '',
  username: '',
  password: '',
  message: '',
  count: 25,
  count2: 25,
  score: 50,
  cities: [],
  countries: [],
  title: '',
  agreed: false,
  agree: false,
  terms: false,
});

const {
  initZodForm,
  zodFormControl,
  zodErrorObj,
  // formErrors,
  pushCustomErrors,
  doZodValidate,
  fieldMaxLength,
} = useZodValidation(formSchema);

initZodForm();

const submitForm = async () => {
  zodFormControl.submitAttempted = true;
  if (!(await doZodValidate(state))) return;
  zodFormControl.displayLoader = true;
  try {
    console.log('Form valid - post it');
    const data = await $fetch('/api/textFields', {
      method: 'post',
      body: state,
      async onResponse({ response }) {
        if (response.status === 400) {
          console.log('onResponse', response);
          console.log(response.status);

          // useApiErrors(response._data.data.errors);
          // for (const [key, message] of Object.entries(response._data.data.errors)) {
          //   console.log(`${key}: ${message}`);
          //   updateErrorMessages(key, message);
          // }

          // if (error instanceof Error) {
          await pushCustomErrors(response._data, state);
          // zodFormControl.formIsValid = false;
          // }
          // zodFormControl.submitAttempted = false;
        }
        if (response.status === 200) {
          zodFormControl.submitSuccessful = true;
        }
      },
    });
    console.log('3: Finished data', data);
    // return data;
  } catch (error) {
    console.warn('2: An error occured posting form data', error);
  } finally {
    zodFormControl.displayLoader = false;
  }
};

watch(
  () => state,
  () => {
    // console.log('Watching state');
    doZodValidate(state);
  },
  { deep: true }
);
</script>

<style lang="css">
.flex-group {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}

ul.flex-group {
  list-style-type: none;
  padding: 0;
}

.header-1 {
  font-family: var(--font-family);
  color: var(--brand-success-text-text);
}
</style>
